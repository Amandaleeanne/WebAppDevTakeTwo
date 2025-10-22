
/* 
 * Express Server Application
 * Provides REST API endpoints for item management and basic web pages
 */

const express = require('express');
const itemModel = require('./models/item');

// Initialize Express application
const app = express();

/**
 * Request logging middleware
 * Logs method and URL for each incoming request
 */
app.use((req, res, next) => {
    try {
        console.log(`${req.method} ${req.url}`);
        next();
    } catch (error) {
        console.error('Logging middleware error:', error);
        next(error);
    }
});

/**
 * CORS middleware configuration
 * Enables cross-origin requests from the React development server
 */
app.use((req, res, next) => {
    try {
        // Set CORS headers
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }

        next();
    } catch (error) {
        console.error('CORS middleware error:', error);
        next(error);
    }
});

// Enable JSON body parsing for POST/PUT requests
app.use(express.json());

/**
 * Home page route
 */
app.get('/', (req, res) => {
    try {
        res.send('Welcome to the LW Tech!');
    } catch (error) {
        console.error('Home page error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * About page route
 */
app.get('/about', (req, res) => {
    try {
        res.send('This is the About Page.');
    } catch (error) {
        console.error('About page error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Contact page route
 */
app.get('/contact', (req, res) => {
    try {
        res.send('Contact us at contact@example.com');
    } catch (error) {
        console.error('Contact page error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Contact form submission handler
 */
app.post('/contact', (req, res) => {
    try {
        const { name = '', message = '' } = req.body;
        
        if (!name || !message) {
            return res.status(400).json({ 
                error: 'Name and message are required' 
            });
        }

        res.send(
            `Thank you, ${name}. Your message: "${message}" has been received.`
        );
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * List all items
 * GET /items
 */
app.get('/items', (req, res) => {
    try {
        const items = itemModel.List();
        res.json(items);
    } catch (error) {
        console.error('List items error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Get single item by ID
 * GET /items/:id
 */
app.get('/items/:id', (req, res) => {
    try {
        const itemId = req.params.id;
        const item = itemModel.Get(itemId);

        if (!item) {
            return res.status(404).json({ 
                error: 'Item not found' 
            });
        }

        res.json(item);
    } catch (error) {
        console.error('Get item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Create new item
 * POST /items
 */
app.post('/items', (req, res) => {
    try {
        const validation = itemModel.Validate(req.body);

        if (!validation.valid) {
            return res.status(400).json({ 
                error: validation.error 
            });
        }

        const createdItem = itemModel.Create(req.body);
        res.status(201).json(createdItem);
    } catch (error) {
        console.error('Create item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Update existing item
 * PUT /items/:id
 */
app.put('/items/:id', (req, res) => {
    try {
        const itemId = req.params.id;
        const existingItem = itemModel.Get(itemId);

        if (!existingItem) {
            return res.status(404).json({ 
                error: 'Item not found' 
            });
        }

        const updateData = {
            name: req.body.name ?? existingItem.name,
            description: req.body.description ?? existingItem.description
        };

        const validation = itemModel.Validate(updateData);

        if (!validation.valid) {
            return res.status(400).json({ 
                error: validation.error 
            });
        }

        const updatedItem = itemModel.Update(itemId, req.body);
        res.json(updatedItem);
    } catch (error) {
        console.error('Update item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Delete item by ID
 * DELETE /items/:id
 */
app.delete('/items/:id', (req, res) => {
    try {
        const itemId = req.params.id;
        const existingItem = itemModel.Get(itemId);

        if (!existingItem) {
            return res.status(404).json({ 
                error: 'Item not found' 
            });
        }

        itemModel.Delete(itemId);
        res.status(204).end();
    } catch (error) {
        console.error('Delete item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Server configuration
const PORT = 3000;

// Start server if this file is run directly
if (require.main === module) {
    try {
        app.listen(PORT, () => {
            console.log(
                `Express server running at http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

// Export app for testing purposes
module.exports = app;
