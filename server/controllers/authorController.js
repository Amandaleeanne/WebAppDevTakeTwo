/* server/controllers/authorsController.js
 *
 * Uses Sequelize models to list, show, and create authors.
 *
 * Methods: List, Show, Create
 */

const db = require('../models');

const Author = db.Author;

/* List: GET /api/authors */
async function List(req, res) {
  try {
    const authors = await Author.findAll();
    return res.json(authors);
  } catch (err) {
    console.error('List authors failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/* Show: GET /api/authors/:id */
async function Show(req, res) {
  try {
    const idParam = req.params.id || '0';
    const numericId = Number(idParam);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    const found = await Author.findByPk(numericId);

    if (!found) {
      return res.status(404).json({ error: 'Author not found' });
    }

    return res.json(found);
  } catch (err) {
    console.error('Show author failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/* Create: POST /api/authors */
async function Create(req, res) {
  try {
    const payload = req.body || {};

    if (!payload.name || typeof payload.name !== 'string' || payload.name.trim() === '') {
      return res.status(400).json({ errors: { name: 'Name is required' } });
    }

    const created = await Author.create({ name: payload.name.trim() });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Create author failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  List: List,
  Show: Show,
  Create: Create
};
