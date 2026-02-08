module.exports = function ensureTables(db) {
  const usersSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const expensesSql = `
    CREATE TABLE IF NOT EXISTS expenses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      date DATETIME NOT NULL,
      user_id INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(usersSql, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Ensured users table exists');

      // create expenses after users to ensure FK target exists
      db.query(expensesSql, (err2) => {
        if (err2) console.error('Error creating expenses table:', err2);
        else console.log('Ensured expenses table exists');
      });
    }
  });
};
