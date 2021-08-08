import Operation from '../models/Operation';
import {
  operation_types,
  operation_procedures,
} from '../../database/enum_arrays';
import * as Yup from 'yup';

class OperationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().oneOf(operation_types).required(),
      procedure: Yup.string().oneOf(operation_procedures).required(),
      container_id: Yup.string()
        .matches(/^[A-Z]{4}\d{7}$/)
        .required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Operation not valid',
      });
    }
    const { type, procedure, container_id, client, date } =
      await Operation.create(req.body);
    return res
      .status(201)
      .send({ type, procedure, container_id, client, date });
  }
  async get(req, res) {
    const { operation_id } = req.params;
  }
  async index(req, res) {
    const { type, client } = req.query;
    const operationsList = await Operation.findAll({ where: { type, client } });
    return res.status(200).send(operationsList);
  }
  async update(req, res) {
    const { operation_id } = req.params;
    req.body;
  }
  async delete(req, res) {
    const { operation_id } = req.params;
  }
}

export default new OperationController();
