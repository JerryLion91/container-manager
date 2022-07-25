"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _Container = require('./Container'); var _Container2 = _interopRequireDefault(_Container);



var _enum_arrays = require('../../database/enum_arrays');

class Operation extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        type: _sequelize2.default.ENUM(_enum_arrays.operation_types),
        procedure: _sequelize2.default.ENUM(_enum_arrays.operation_procedures),
        container_id: _sequelize2.default.STRING(11),
        client: _sequelize2.default.STRING,
        category: _sequelize2.default.STRING,

        date: _sequelize2.default.DATE,
      },
      {
        sequelize, // We need to pass the connection instance
      }
    );
    Operation.beforeCreate(async (operation) => {
      const { client, category } = await _Container2.default.findOne({
        where: {
          container_id: operation.container_id,
        },
      });
      operation.client = client;
      operation.category = category;
    });
    return this;
  }
}

exports. default = Operation;
