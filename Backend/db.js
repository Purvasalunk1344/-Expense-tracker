const mysql = require("mysql2");

// Print debug info to help diagnose connection issues on Render/Railway
console.log("DB_HOST from env:", process.env.DB_HOST);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("MySQL Connected");
});

module.exports = db;
