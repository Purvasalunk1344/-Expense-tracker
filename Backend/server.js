
require("dotenv").config();

const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require("./routes/authRoutes");
app.use('/api/expenses', expenseRoutes);
app.use("/api/auth", authRoutes);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
