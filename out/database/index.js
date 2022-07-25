"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _Container = require('../app/models/Container'); var _Container2 = _interopRequireDefault(_Container);
var _Operation = require('../app/models/Operation'); var _Operation2 = _interopRequireDefault(_Operation);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_Container2.default, _Operation2.default];

class Database {
  constructor() {
    this.init();
    this.logInfo();
  }
  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);
    models.map((model) => model.init(this.connection));
  }

  logInfo() {
    console.log('Connected with database');
  }
}

exports. default = new Database();
