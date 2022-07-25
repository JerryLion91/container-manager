"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Container = require('../models/Container'); var _Container2 = _interopRequireDefault(_Container);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);




var _enum_arrays = require('../../database/enum_arrays');

class ContainerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      container_id: Yup.string()
        .matches(/^[A-Z]{4}\d{7}$/)
        .required(),
      client: Yup.string().required(),
      type: Yup.string().oneOf(_enum_arrays.container_types).required(),
      status: Yup.string().oneOf(_enum_arrays.container_status).required(),
      category: Yup.string().oneOf(_enum_arrays.container_categories).required(),
    });
    const newContainer = {
      container_id: req.body.container_id.toUpperCase(),
      client: req.body.client,
      type: req.body.type,
      status: req.body.status,
      category: req.body.category,
    };
    if (!(await schema.isValid(newContainer))) {
      return res.status(400).json({
        message: 'Container not valid',
      });
    }
    const containerExists = await _Container2.default.findOne({
      where: {
        container_id: newContainer.container_id,
      },
    });
    if (containerExists) {
      return res.status(400).json({ error: 'Container already created' });
    }
    const { container_id, client, type, status, category } =
      await _Container2.default.create(newContainer);
    return res
      .status(201)
      .json({ container_id, client, type, status, category });
  }
  async get(req, res) {
    const { container_id } = req.params;
    if (!container_id.match(/^[A-Z]{4}\d{7}$/)) {
      return res.status(400).json({ error: 'Container number not valid' });
    }
    const containerRef = await _Container2.default.findOne({
      where: {
        container_id,
      },
    });
    if (!containerRef) {
      return res.status(400).json({ error: 'Container not found' });
    }
    const { client, type, status, category } = containerRef;
    return res.json({ container_id, client, type, status, category });
  }
  async index(req, res) {
    const schema = Yup.object().shape({
      client: Yup.string(),
      type: Yup.string().oneOf(_enum_arrays.container_types),
      status: Yup.string().oneOf(_enum_arrays.container_status),
      category: Yup.string().oneOf(_enum_arrays.container_categories),
    });
    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({
        message: 'Query not valid',
      });
    }
    const containerList = await _Container2.default.findAll({
      where: req.query,
    });
    return res.status(200).json({ itemsList: containerList });
  }
  async update(req, res) {
    const { container_id } = req.params;
    if (!container_id.match(/^[A-Z]{4}\d{7}$/)) {
      return res.status(400).json({ error: 'Container number not valid' });
    }
    const containerRef = await _Container2.default.findOne({
      where: {
        container_id,
      },
    });
    if (!containerRef) {
      return res.status(400).json({ error: 'Container not found' });
    }
    const schema = Yup.object().shape({
      client: Yup.string(),
      type: Yup.string().oneOf(_enum_arrays.container_types),
      status: Yup.string().oneOf(_enum_arrays.container_status),
      category: Yup.string().oneOf(_enum_arrays.container_categories),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Falha na validação',
      });
    }
    const { client, type, status, category } = await containerRef.update(
      req.body
    );
    return res.json({ container_id, client, type, status, category });
  }
  async delete(req, res) {
    const { container_id } = req.params;
    if (!container_id.match(/^[A-Z]{4}\d{7}$/)) {
      return res.status(400).json({ error: 'Container number not valid' });
    }
    const containerRef = await _Container2.default.findOne({
      where: {
        container_id,
      },
    });
    if (!containerRef) {
      return res.status(400).json({ error: 'Container not found' });
    }
    await containerRef.destroy();
    res.status(204).end();
  }
}

exports. default = new ContainerController();
