/* 
 * In-memory User Model
 * Manages users with simple name and role fields
 */

const { randomUUID } = require('crypto');

class UserModel {
    constructor() {
        // Initialize private users collection
        this._users = new Map();
    }

    /**
     * Validates a user's structure and data types
     * @param {Object} user - The user to validate
     * @returns {Object} Validation result {valid: boolean, error?: string}
     */
    Validate(user) {
        try {
            if (!user) {
                return { valid: false, error: 'User is required' };
            }

            if (!user.name || 
                typeof user.name !== 'string' || 
                user.name.trim() === '') {
                return { 
                    valid: false, 
                    error: 'Name is required and must be a non-empty string' 
                };
            }

            if (!user.role || 
                typeof user.role !== 'string' || 
                user.role.trim() === '') {
                return { 
                    valid: false, 
                    error: 'Role is required and must be a non-empty string' 
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
     * Creates a new user
     * @param {Object} param0 - User properties
     * @returns {Object} Created user
     */
    Create({ name, role }) {
        const userId = randomUUID();
        const newUser = { 
            id: userId, 
            name: name, 
            role: role 
        };

        this._users.set(userId, newUser);
        return newUser;
    }

    /**
     * Lists all users in the collection
     * @returns {Array} Array of all users
     */
    List() {
        return Array.from(this._users.values());
    }

    /**
     * Retrieves a single user by ID
     * @param {string} id - User ID to retrieve
     * @returns {Object|null} User if found, null otherwise
     */
    Get(id) {
        return this._users.get(id) || null;
    }
}

module.exports = new UserModel();