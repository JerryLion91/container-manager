'use strict';

const { operation_types, operation_procedures } = require('../validations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('operations', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.ENUM(operation_types),
        allowNull: false,
      },
      procedure: {
        type: Sequelize.ENUM(operation_procedures),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      container_id: {
        type: Sequelize.STRING(11),
        references: { model: 'containers', key: 'container_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('operations');
  },
};
