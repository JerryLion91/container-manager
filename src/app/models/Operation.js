import Sequelize, { Model } from 'sequelize';
import {
  operation_types,
  operation_procedures,
} from '../../database/validations';

class Operation extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.ENUM(operation_types),
        procedure: Sequelize.ENUM(operation_procedures),
        date: Sequelize.DATE,
        container_id: Sequelize.STRING(11),
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Container, {
      foreignKey: 'container_id',
      as: 'container',
    });
  }
}

export default Operation;
