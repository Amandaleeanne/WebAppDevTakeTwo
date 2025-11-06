// server/server.js
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const db = require('./models'); // ensures Sequelize connects

const booksRoutes = require('./routes/books');

const authorsRoutes = require('./routes/authors');

const publishersRoutes = require('./routes/publishers');

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// connect to database before starting
async function StartServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // optional: sync models (not needed if you use migrations)
    // await db.sequelize.sync();

    app.use(cors());

    app.use(express.json());

    app.use('/api/books', booksRoutes);

    app.use('/api/authors', authorsRoutes);

    app.use('/api/publishers', publishersRoutes);

    app.get('/api/health', function (req, res) {
      return res.json({ status: 'ok', now: new Date().toISOString() });
    });

    app.listen(PORT, function () {
      console.log('Server running on http://localhost:' + String(PORT));
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

StartServer();
