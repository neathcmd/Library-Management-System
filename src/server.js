const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    description: 'A classic novel',
    author_id: 1,
    category_id: 1,
    quantity: 5,
    created_by: 1
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    description: 'Another classic',
    author_id: 2,
    category_id: 1,
    quantity: 7,
    created_by: 1
  }
  // Add more books as needed
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});