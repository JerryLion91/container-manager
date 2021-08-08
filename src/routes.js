import { Router } from 'express';

import ContainerController from './app/controllers/ContainerController';
import OperationController from './app/controllers/OperationController';

const routes = new Router();

routes.post('/containers', ContainerController.store);
routes.get('/containers', ContainerController.index);
routes.put('/containers/:container_id', ContainerController.update);
routes.get('/containers/:container_id', ContainerController.get);
routes.delete('/containers/:container_id', ContainerController.delete);

routes.post('/operations', OperationController.store);
routes.get('/operations/:operation_id', OperationController.get);
routes.get('/operations', OperationController.index);
routes.put('/operations/:operation_id', OperationController.update);
routes.delete('/operations/:operation_id', OperationController.delete);

export default routes;
