const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'punedac'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON body
app.use(express.json());

// GET - Display all books by author
app.get('/books', (req, res) => {
  const { author } = req.query;
  const query = `SELECT * FROM Book_Tb WHERE author = ?`;
  connection.query(query, [author], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Add a new book
app.post('/books', (req, res) => {
  const { b_name, author, book_type, price, publishedDate, language } = req.body;
  const query = `INSERT INTO Book_Tb (b_name, author, book_type, price, publishedDate, language) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(query, [b_name, author, book_type, price, publishedDate, language], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Book added successfully' });
  });
});

// PUT - Update price and language of a book
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { price, language } = req.body;
  const query = `UPDATE Book_Tb SET price = ?, language = ? WHERE id = ?`;
  connection.query(query, [price, language, id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Book updated successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
