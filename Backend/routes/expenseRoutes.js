const express = require('express');
const auth = require("../middleware/auth");

const router = express.Router();
const db = require('../db');


router.post('/',auth, (req, res) => {
  console.log("User ID from token:", req.userId);
  const { title, amount, category, date } = req.body;

  const sql = 'INSERT INTO expenses (title, amount, category, date,user_id) VALUES (?, ?, ?, ?,?)';
  db.query(sql, [title, amount, category, date , req.userId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json(err);
    }
    res.json({ message: 'Expense added successfully', id: result.insertId });
  });
});

router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM expenses WHERE user_id = ?",
    [req.userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});


// DELETE expense
router.delete('/:id', auth, (req, res) => {
  const expenseId = req.params.id;

  const sql = 'DELETE FROM expenses WHERE id = ?';

  db.query(sql, [expenseId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: 'Expense deleted successfully' });
  });
});

// UPDATE expense
router.put('/:id', auth, (req, res) => {
  const expenseId = req.params.id;
  const { title, amount, category, date } = req.body;

  const sql = `
    UPDATE expenses 
    SET title = ?, amount = ?, category = ?, date = ?
    WHERE id = ?
  `;

  db.query(sql, [title, amount, category, date, expenseId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Expense updated successfully' });
  });
});

module.exports = router;
