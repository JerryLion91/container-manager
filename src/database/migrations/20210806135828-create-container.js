'use strict';

const {
  container_types,
  container_status,
  container_categories,
} = require('../enum_arrays');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('containers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      container_id: {
        type: Sequelize.STRING(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      client: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(container_types),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(container_status),
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM(container_categories),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('containers');
  },
};
