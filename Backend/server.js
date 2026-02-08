require("dotenv").config();

const express = require('express');
const cors = require('cors');

// Require DB early so connection is attempted on startup
const db = require('./db');
const ensureTables = require('./migrations/createTables');

const app = express();

app.use(cors({
  origin: "https://expense-tracker-phi-sandy.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

// ensure required tables exist (no-op if already present)
ensureTables(db);

// simple health endpoint to verify DB connectivity
app.get('/health', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) return res.status(500).json({ ok: false, error: 'DB unreachable' });
    res.json({ ok: true });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
