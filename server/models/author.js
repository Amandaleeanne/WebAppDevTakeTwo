// server/models/author.js
'use strict';

/* Author model for Sequelize.
 *
 * Fields:
 *  - id        : primary key integer
 *  - name      : string not null
 *
 * Exports the model function expected by models/index.js
 */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /* Associate can be used later to define relations */
    static associate(models) {
      // Author has many Books
      Author.hasMany(models.Book, {
        foreignKey: 'authorId',
        as: 'books'
      });
    }
  }

  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Author',
      tableName: 'Authors',
      underscored: true
    }
  );

  return Author;
};
