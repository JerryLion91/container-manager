import Sequelize, { Model } from 'sequelize';
import {
  container_types,
  container_status,
  container_categories,
} from '../../database/validations';

class Container extends Model {
  static init(sequelize) {
    super.init(
      {
        container_id: Sequelize.STRING(11),
        client: Sequelize.STRING,
        type: Sequelize.ENUM(container_types),
        status: Sequelize.ENUM(container_status),
        category: Sequelize.ENUM(container_categories),
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Container;
