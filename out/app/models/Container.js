"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);




var _enum_arrays = require('../../database/enum_arrays');

class Container extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        container_id: _sequelize2.default.STRING(11),
        client: _sequelize2.default.STRING,
        type: _sequelize2.default.ENUM(_enum_arrays.container_types),
        status: _sequelize2.default.ENUM(_enum_arrays.container_status),
        category: _sequelize2.default.ENUM(_enum_arrays.container_categories),
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

exports. default = Container;
