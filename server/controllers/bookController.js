const Book = require('../models/book');

// in-memory storage
const books = [
  new Book({ id: 1, title: 'Example Book 1', authorId: 1, publisherId: 1 }),
  new Book({ id: 2, title: 'Another Book', authorId: 2, publisherId: 1 })
];

// helper to generate new id
const nextId = () => (books.length ? Math.max(...books.map(b => b.id)) + 1 : 1);

module.exports = {
  list(req, res) {
    // Return full list
    res.json(books);
  },

  show(req, res) {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  },

  create(req, res) {
    const { title, authorId, publisherId } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const book = new Book({
      id: nextId(),
      title,
      authorId: authorId ? Number(authorId) : null,
      publisherId: publisherId ? Number(publisherId) : null
    });
    books.push(book);
    res.status(201).json(book);
  }
};
