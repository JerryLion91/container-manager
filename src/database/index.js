import Sequelize from 'sequelize';

import Container from '../app/models/Container';
import Operation from '../app/models/Operation';

import databaseConfig from '../config/database';

const models = [Container, Operation];

class Database {
  constructor() {
    this.init();
    this.checkConnection();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }

  async checkConnection() {
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default new Database();
