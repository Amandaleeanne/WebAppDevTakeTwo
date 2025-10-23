const express = require('express');
const cors = require('cors');

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const publishersRouter = require('./routes/publishers');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());            // allow requests from frontend dev server
app.use(express.json());    // parse JSON request bodies

// Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/publishers', publishersRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', now: new Date() }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
