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
    try {
      const { type, procedure, container_id, client, date } =
        await Operation.create(req.body);
      return res
        .status(201)
        .send({ type, procedure, container_id, client, date });
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  }
  async get(req, res) {
    const { operation_id } = req.params;
    const operationRef = await Operation.findOne({
      where: {
        id: operation_id,
      },
    });
    if (!operationRef) {
      return res.status(400).json({ error: 'Operation not found' });
    }
    const { type, procedure, container_id, category, client, date } =
      operationRef;
    return res
      .status(200)
      .json({ type, procedure, container_id, category, client, date });
  }
  async index(req, res) {
    let where = {};
    const { type, client } = req.query;
    if (type) where = { ...where, type };
    if (client) where = { ...where, client };

    const operationsList = await Operation.findAll({ where });
    return res.status(200).send(operationsList);
  }
  async update(req, res) {
    const { operation_id } = req.params;
    const operationRef = await Operation.findOne({
      where: {
        id: operation_id,
      },
    });
    if (!operationRef) {
      return res.status(400).json({ error: 'Operation not found' });
    }
    const schema = Yup.object().shape({
      type: Yup.string().oneOf(operation_types),
      procedure: Yup.string().oneOf(operation_procedures),
      container_id: Yup.string().matches(/^[A-Z]{4}\d{7}$/),
      date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Operation not valid',
      });
    }
    try {
      const { type, procedure, container_id, category, client, date } =
        await operationRef.update(req.body);
      return res.send({
        type,
        procedure,
        container_id,
        category,
        client,
        date,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  }
  async delete(req, res) {
    const { operation_id } = req.params;
    const operationRef = await Operation.destroy({
      where: {
        id: operation_id,
      },
    });
    if (!operationRef) {
      return res.status(400).json({ error: 'Operation not found' });
    }
    return res.status(204).end();
  }
}

export default new OperationController();
