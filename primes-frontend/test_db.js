const mariadb = require('mariadb');
async function test() {
  const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '9@wUA%8PQnrpb-',
    database: 'rail_db'
  });
  try {
    const conn = await pool.getConnection();
    console.log("Connected successfully!");
    conn.release();
    pool.end();
  } catch (err) {
    console.error("Connection failed:", err);
  }
}
test();
