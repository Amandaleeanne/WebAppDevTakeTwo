
class Author {
  constructor(initObject) {
    if (!initObject || typeof initObject !== 'object') {
      throw new Error('Author constructor requires an object argument');
    }

    this.Id = Number(initObject.id || initObject.Id || 0);

    this.Name = String(initObject.name || initObject.Name || '')
      .trim();
  }
}

module.exports = Author;
