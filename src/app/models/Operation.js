import Sequelize, { Model } from 'sequelize';
import Container from './Container';
import {
  operation_types,
  operation_procedures,
} from '../../database/enum_arrays';

class Operation extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.ENUM(operation_types),
        procedure: Sequelize.ENUM(operation_procedures),
        container_id: Sequelize.STRING(11),
        client: Sequelize.STRING,

        date: Sequelize.DATE,
      },
      {
        sequelize, // We need to pass the connection instance
      }
    );
    Operation.beforeCreate(async (operation) => {
      const { client } = await Container.findOne({
        where: {
          container_id: operation.container_id,
        },
      });
      operation.client = client;
    });
    return this;
  }
}

export default Operation;
