/* server/models/Book.js
 *
 * A minimal Book model implemented as a JavaScript class.
 * Public properties use PascalCase (Id, Title, AuthorId, PublisherId).
 * Private properties (none required here) would start with an underscore.
 */

class Book {
  // Public constructor and properties use PascalCase
  constructor(initObject) {
    // Validate the parameter
    if (!initObject || typeof initObject !== 'object') {
      throw new Error('Book constructor requires an object argument');
    }

    // Initialize public properties (PascalCase)
    this.Id = Number(initObject.id || initObject.Id || 0);

    this.Title = String(initObject.title || initObject.Title || '')
      .trim();

    this.AuthorId = initObject.authorId !== undefined
      ? Number(initObject.authorId)
      : null;

    this.PublisherId = initObject.publisherId !== undefined
      ? Number(initObject.publisherId)
      : null;
  }
}

module.exports = Book;
