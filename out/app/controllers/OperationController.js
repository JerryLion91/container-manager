"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Operation = require('../models/Operation'); var _Operation2 = _interopRequireDefault(_Operation);



var _enum_arrays = require('../../database/enum_arrays');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

class OperationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().oneOf(_enum_arrays.operation_types).required(),
      procedure: Yup.string().oneOf(_enum_arrays.operation_procedures).required(),
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
        await _Operation2.default.create(req.body);
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
    const operationRef = await _Operation2.default.findOne({
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

    const operationsList = await _Operation2.default.findAll({ where });
    return res.status(200).send(operationsList);
  }
  async update(req, res) {
    const { operation_id } = req.params;
    const operationRef = await _Operation2.default.findOne({
      where: {
        id: operation_id,
      },
    });
    if (!operationRef) {
      return res.status(400).json({ error: 'Operation not found' });
    }
    const schema = Yup.object().shape({
      type: Yup.string().oneOf(_enum_arrays.operation_types),
      procedure: Yup.string().oneOf(_enum_arrays.operation_procedures),
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
    const operationRef = await _Operation2.default.destroy({
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

exports. default = new OperationController();
