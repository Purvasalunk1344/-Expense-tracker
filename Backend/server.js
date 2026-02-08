require("dotenv").config();

const express = require('express');
const cors = require('cors');

// Require DB early so connection is attempted on startup
require('./db');

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
