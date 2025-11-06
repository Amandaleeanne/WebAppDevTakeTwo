'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      author_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Authors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      publisher_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Publishers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface/* , Sequelize */) => {
    await queryInterface.dropTable('Books');
  }
};
