/* 
 * In-memory Item Model
 * Manages CRUD operations for items with the following structure:
 * { 
 *   id: string,          // Unique identifier
 *   name: string,        // Item name
 *   description: string  // Item description
 * }
 */

const { randomUUID } = require('crypto');

class ItemModel {
    constructor() {
        // Initialize private items collection
        this._items = new Map();
    }

    /**
     * Validates an item's structure and data types
     * @param {Object} item - The item to validate
     * @returns {Object} Validation result {valid: boolean, error?: string}
     */
    Validate(item) {
        try {
            if (!item) {
                return { valid: false, error: 'Item is required' };
            }

            if (!item.name || 
                typeof item.name !== 'string' || 
                item.name.trim() === '') {
                return { 
                    valid: false, 
                    error: 'Name is required and must be a non-empty string' 
                };
            }

            if (!item.description || 
                typeof item.description !== 'string') {
                return { 
                    valid: false, 
                    error: 'Description is required and must be a string' 
                };
            }

            return { valid: true };
        } catch (error) {
            return { 
                valid: false, 
                error: `Validation error: ${error.message}` 
            };
        }
    }

    /**
     * Creates a new item
     * @param {Object} param0 - Item properties
     * @returns {Object} Created item
     */
    Create({ name, description }) {
        const itemId = randomUUID();
        const newItem = { 
            id: itemId, 
            name: name, 
            description: description 
        };

        this._items.set(itemId, newItem);
        return newItem;
    }

    /**
     * Lists all items in the collection
     * @returns {Array} Array of all items
     */
    List() {
        return Array.from(this._items.values());
    }

    /**
     * Retrieves a single item by ID
     * @param {string} id - Item ID to retrieve
     * @returns {Object|null} Item if found, null otherwise
     */
    Get(id) {
        return this._items.get(id) || null;
    }

    /**
     * Updates an existing item
     * @param {string} id - Item ID to update
     * @param {Object} param1 - Updated properties
     * @returns {Object|null} Updated item if found, null otherwise
     */
    Update(id, { name, description }) {
        const existingItem = this._items.get(id);
        
        if (!existingItem) {
            return null;
        }

        const updatedItem = { ...existingItem };
        
        if (name !== undefined) {
            updatedItem.name = name;
        }
        
        if (description !== undefined) {
            updatedItem.description = description;
        }

        this._items.set(id, updatedItem);
        return updatedItem;
    }

    /**
     * Deletes an item by ID
     * @param {string} id - Item ID to delete
     * @returns {boolean} True if item was deleted
     */
    Delete(id) {
        return this._items.delete(id);
    }
}

module.exports = new ItemModel()
