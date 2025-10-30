/* server/controllers/booksController.js
 *
 * Uses Sequelize Book, Author and Publisher models.
 */

const db = require('../models');

const Book = db.Book;

const Author = db.Author;

const Publisher = db.Publisher;

/* List books: GET /api/books
 * Include author and publisher details in response
 */
async function List(req, res) {
  try {
    const books = await Book.findAll({
      include: [
        { model: Author, as: 'author' },
        { model: Publisher, as: 'publisher' }
      ]
    });

    return res.json(books);
  } catch (err) {
    console.error('List books failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/* Show a single book */
async function Show(req, res) {
  try {
    const idParam = req.params.id || '0';

    const numericId = Number(idParam);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    const found = await Book.findByPk(numericId, {
      include: [
        { model: Author, as: 'author' },
        { model: Publisher, as: 'publisher' }
      ]
    });

    if (!found) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.json(found);
  } catch (err) {
    console.error('Show book failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/* Create book */
async function Create(req, res) {
  try {
    const payload = req.body || {};

    // Validate title
    if (!payload.title || typeof payload.title !== 'string' || payload.title.trim() === '') {
      return res.status(400).json({ errors: { title: 'Title is required' } });
    }

    // Author reference (if provided) must exist
    let authorId = null;

    if (payload.authorId !== undefined && payload.authorId !== null && payload.authorId !== '') {
      authorId = Number(payload.authorId);

      if (!Number.isInteger(authorId) || authorId <= 0) {
        return res.status(400).json({ errors: { authorId: 'Author ID must be a positive integer' } });
      }

      const foundAuthor = await Author.findByPk(authorId);

      if (!foundAuthor) {
        return res.status(400).json({ errors: { authorId: 'No author with id ' + authorId } });
      }
    }

    // Publisher reference (if provided) must exist
    let publisherId = null;

    if (payload.publisherId !== undefined && payload.publisherId !== null && payload.publisherId !== '') {
      publisherId = Number(payload.publisherId);

      if (!Number.isInteger(publisherId) || publisherId <= 0) {
        return res.status(400).json({ errors: { publisherId: 'Publisher ID must be a positive integer' } });
      }

      const foundPublisher = await Publisher.findByPk(publisherId);

      if (!foundPublisher) {
        return res.status(400).json({ errors: { publisherId: 'No publisher with id ' + publisherId } });
      }
    }

    const created = await Book.create({
      title: payload.title.trim(),
      authorId: authorId,
      publisherId: publisherId
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Create book failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  List: List,
  Show: Show,
  Create: Create
};
