// server/models/book.js
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Author, {
        foreignKey: 'authorId',
        as: 'author'
      });

      Book.belongsTo(models.Publisher, {
        foreignKey: 'publisherId',
        as: 'publisher'
      });
    }
  }

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },

      authorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Authors',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      publisherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Publishers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'Books',
      underscored: true
    }
  );

  return Book;
};
