/* 
 * In-memory Category Model
 * Manages categories with name and color fields
 */

const { randomUUID } = require('crypto');

class CategoryModel {
    constructor() {
        // Initialize private categories collection
        this._categories = new Map();
    }

    /**
     * Validates a category's structure and data types
     * @param {Object} category - The category to validate
     * @returns {Object} Validation result {valid: boolean, error?: string}
     */
    Validate(category) {
        try {
            if (!category) {
                return { valid: false, error: 'Category is required' };
            }

            if (!category.name || 
                typeof category.name !== 'string' || 
                category.name.trim() === '') {
                return { 
                    valid: false, 
                    error: 'Name is required and must be a non-empty string' 
                };
            }

            if (!category.color || 
                typeof category.color !== 'string' || 
                !category.color.match(/^#[0-9A-Fa-f]{6}$/)) {
                return { 
                    valid: false, 
                    error: 'Color is required and must be a valid hex color code (e.g., #FF0000)' 
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
     * Creates a new category
     * @param {Object} param0 - Category properties
     * @returns {Object} Created category
     */
    Create({ name, color }) {
        const categoryId = randomUUID();
        const newCategory = { 
            id: categoryId, 
            name: name, 
            color: color 
        };

        this._categories.set(categoryId, newCategory);
        return newCategory;
    }

    /**
     * Lists all categories in the collection
     * @returns {Array} Array of all categories
     */
    List() {
        return Array.from(this._categories.values());
    }

    /**
     * Retrieves a single category by ID
     * @param {string} id - Category ID to retrieve
     * @returns {Object|null} Category if found, null otherwise
     */
    Get(id) {
        return this._categories.get(id) || null;
    }
}

module.exports = new CategoryModel();