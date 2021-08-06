import { Router } from 'express';

import ContainerController from './app/controllers/ContainerController';

const routes = new Router();

routes.post('/containers', ContainerController.store);
routes.get('/containers', ContainerController.index);
routes.put('/containers/:container_id', ContainerController.update);
routes.get('/containers/:container_id', ContainerController.get);
routes.delete('/containers/:container_id', ContainerController.delete);

export default routes;
