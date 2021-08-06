import Sequelize from 'sequelize';

import Container from '../app/models/Container';
import Operation from '../app/models/Operation';

import databaseConfig from '../config/database';

const models = [Container, Operation];

class Database {
  constructor() {
    this.init();
    this.logInfo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  logInfo() {
    console.log('Connected with database');
  }
}

export default new Database();
