import Container from '../models/Container';
import * as Yup from 'yup';
import {
  container_types,
  container_status,
  container_categories,
} from '../../database/enum_arrays';

class ContainerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      container_id: Yup.string()
        .matches(/^[A-Z]{4}\d{7}$/)
        .required(),
      client: Yup.string().required(),
      type: Yup.string().oneOf(container_types).required(),
      status: Yup.string().oneOf(container_status).required(),
      category: Yup.string().oneOf(container_categories).required(),
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
    const containerExists = await Container.findOne({
      where: {
        container_id: newContainer.container_id,
      },
    });
    if (containerExists) {
      return res.status(400).json({ error: 'Container already created' });
    }
    const { container_id, client, type, status, category } =
      await Container.create(newContainer);
    return res
      .status(201)
      .json({ container_id, client, type, status, category });
  }
  async get(req, res) {
    const { container_id } = req.params;
    if (!container_id.match(/^[A-Z]{4}\d{7}$/)) {
      return res.status(400).json({ error: 'Container number not valid' });
    }
    const containerRef = await Container.findOne({
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
      type: Yup.string().oneOf(container_types),
      status: Yup.string().oneOf(container_status),
      category: Yup.string().oneOf(container_categories),
    });
    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({
        message: 'Query not valid',
      });
    }
    const containerList = await Container.findAll({
      where: req.query,
    });
    return res.status(200).json({ itemsList: containerList });
  }
  async update(req, res) {
    const { container_id } = req.params;
    if (!container_id.match(/^[A-Z]{4}\d{7}$/)) {
      return res.status(400).json({ error: 'Container number not valid' });
    }
    const containerRef = await Container.findOne({
      where: {
        container_id,
      },
    });
    if (!containerRef) {
      return res.status(400).json({ error: 'Container not found' });
    }
    const schema = Yup.object().shape({
      client: Yup.string(),
      type: Yup.string().oneOf(container_types),
      status: Yup.string().oneOf(container_status),
      category: Yup.string().oneOf(container_categories),
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
    const containerRef = await Container.findOne({
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

export default new ContainerController();
