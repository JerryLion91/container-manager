('use strict');

const { operation_types, operation_procedures } = require('../enum_arrays');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('operations', {
      // id: {
      //   allowNull: false,
      //   primaryKey: true,
      //   type: Sequelize.UUID,
      // },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
      client: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('operations');
  },
};
