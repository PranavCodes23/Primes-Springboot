const { PrismaClient } = require('@prisma/client')
const { PrismaMariaDb } = require('@prisma/adapter-mariadb')
const mariadb = require('mariadb')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '9@wUA%8PQnrpb-',
  database: 'rail_db',
  connectionLimit: 20
})
const adapter = new PrismaMariaDb(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  const mockDataPath = 'C:\\\\Users\\\\hp\\\\.gemini\\\\antigravity\\\\scratch\\\\files\\\\prs_booking_daily_2025_flat.json'
  console.log(`Reading mock data from ${mockDataPath}...`)
  
  const fileContent = fs.readFileSync(mockDataPath, 'utf8')
  const rawData = JSON.parse(fileContent)

  console.log(`Loaded ${rawData.length} records. Processing...`)

  const batchData = rawData.map(row => [
    new Date(row.booking_date),
    row.zone_code === 'ALL_INDIA' ? 'ALL' : row.zone_code,
    row.tickets_booked || 0,
    row.tickets_cancelled || 0,
    row.passengers_booked || 0,
    row.passengers_cancelled || 0,
    row.earning || 0,
    row.refund || 0,
    row.net_earning || 0,
    new Date()
  ])

  let conn;
  try {
    conn = await pool.getConnection()
    console.log('Got database connection, starting batch insert...');
    
    // Insert in chunks
    const chunkSize = 1000;
    for (let i = 0; i < batchData.length; i += chunkSize) {
      const chunk = batchData.slice(i, i + chunkSize);
      await conn.batch(
        'INSERT IGNORE INTO ZoneData (date, booking_loc, tktbkd, tktcan, psgnbkg, psgncanc, earning, refund, net, loadingtime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        chunk
      );
      console.log(`Inserted chunk ${i / chunkSize + 1} of ${Math.ceil(batchData.length / chunkSize)}`);
    }
  } catch (err) {
    console.error('Error during batch insert', err);
  } finally {
    if (conn) conn.release();
  }

  console.log('Seeding finished.')
}

main()
  .then(() => {
    pool.end()
  })
  .catch((e) => {
    console.error(e)
    pool.end()
    process.exit(1)
  })
