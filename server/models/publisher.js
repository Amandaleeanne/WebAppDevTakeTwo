'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    static associate(models) {
      Publisher.hasMany(models.Book, {
        foreignKey: 'publisherId',
        as: 'books'
      });
    }
  }

  Publisher.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Publisher',
      tableName: 'Publishers',
      underscored: true
    }
  );

  return Publisher;
};
