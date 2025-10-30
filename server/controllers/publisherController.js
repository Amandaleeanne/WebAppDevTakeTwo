/* server/controllers/publishersController.js
 *
 * Uses Sequelize Publisher model.
 */

const db = require('../models');

const Publisher = db.Publisher;

/* List */
async function List(req, res) {
  try {
    const publishers = await Publisher.findAll();
    return res.json(publishers);
  } catch (err) {
    console.error('List publishers failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/* Show */
async function Show(req, res) {
  try {
    const idParam = req.params.id || '0';
    const numericId = Number(idParam);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    const found = await Publisher.findByPk(numericId);

    if (!found) {
      return res.status(404).json({ error: 'Publisher not found' });
    }

    return res.json(found);
  } catch (err) {
    console.error('Show publisher failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/* Create */
async function Create(req, res) {
  try {
    const payload = req.body || {};

    if (!payload.name || typeof payload.name !== 'string' || payload.name.trim() === '') {
      return res.status(400).json({ errors: { name: 'Name is required' } });
    }

    const created = await Publisher.create({ name: payload.name.trim() });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Create publisher failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  List: List,
  Show: Show,
  Create: Create
};
