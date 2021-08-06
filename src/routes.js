import { Router } from 'express';

import ContainerController from './app/controllers/ContainerController';

const routes = new Router();

routes.post('/containers', ContainerController.store);
routes.put('/containers/:container_id', ContainerController.update);

export default routes;
