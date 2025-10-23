const Author = require('../models/author');

const authors = [
  new Author({ id: 1, name: 'Alice Example' }),
  new Author({ id: 2, name: 'Bob Sample' })
];

const nextId = () => (authors.length ? Math.max(...authors.map(a => a.id)) + 1 : 1);

module.exports = {
  list(req, res) {
    res.json(authors);
  },

  show(req, res) {
    const id = Number(req.params.id);
    const item = authors.find(a => a.id === id);
    if (!item) return res.status(404).json({ error: 'Author not found' });
    res.json(item);
  },

  create(req, res) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const author = new Author({ id: nextId(), name });
    authors.push(author);
    res.status(201).json(author);
  }
};
