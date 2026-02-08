const mysql = require("mysql2");

// If Railway provides a single connection URL, parse it into DB_* env vars
if (!process.env.DB_HOST && (process.env.MYSQL_URL_RAW || process.env.MYSQL_URL)) {
  const raw = process.env.MYSQL_URL_RAW || process.env.MYSQL_URL;
  try {
    const u = new URL(raw);
    process.env.DB_HOST = u.hostname;
    process.env.DB_PORT = u.port;
    process.env.DB_USER = decodeURIComponent(u.username);
    process.env.DB_PASSWORD = decodeURIComponent(u.password);
    process.env.DB_NAME = u.pathname.replace(/^\//, '');
    console.log('Parsed MYSQL URL into DB_* env vars from MYSQL_URL_RAW');
  } catch (e) {
    console.error('Failed parsing MYSQL URL:', e);
  }
}

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