const Publisher = require('../models/publisher');

const publishers = [
  new Publisher({ id: 1, name: 'Acme Publishing' })
];

const nextId = () => (publishers.length ? Math.max(...publishers.map(p => p.id)) + 1 : 1);

module.exports = {
  list(req, res) {
    res.json(publishers);
  },

  show(req, res) {
    const id = Number(req.params.id);
    const p = publishers.find(x => x.id === id);
    if (!p) return res.status(404).json({ error: 'Publisher not found' });
    res.json(p);
  },

  create(req, res) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const publisher = new Publisher({ id: nextId(), name });
    publishers.push(publisher);
    res.status(201).json(publisher);
  }
};
