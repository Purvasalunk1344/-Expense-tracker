const mysql = require("mysql2");

console.log("DB_HOST from env:", process.env.DB_HOST);
console.log("DB_PORT from env:", process.env.DB_PORT || "(not set)");

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

if (process.env.DB_PORT) {
  const p = Number(process.env.DB_PORT);
  if (!Number.isNaN(p)) connectionConfig.port = p;
}

const db = mysql.createConnection(connectionConfig);

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("MySQL Connected");
});

module.exports = db;