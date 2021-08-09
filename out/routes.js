"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _ContainerController = require('./app/controllers/ContainerController'); var _ContainerController2 = _interopRequireDefault(_ContainerController);
var _OperationController = require('./app/controllers/OperationController'); var _OperationController2 = _interopRequireDefault(_OperationController);

const routes = new (0, _express.Router)();

routes.post('/containers', _ContainerController2.default.store);
routes.get('/containers', _ContainerController2.default.index);
routes.put('/containers/:container_id', _ContainerController2.default.update);
routes.get('/containers/:container_id', _ContainerController2.default.get);
routes.delete('/containers/:container_id', _ContainerController2.default.delete);

routes.post('/operations', _OperationController2.default.store);
routes.get('/operations/:operation_id', _OperationController2.default.get);
routes.get('/operations', _OperationController2.default.index);
routes.put('/operations/:operation_id', _OperationController2.default.update);
routes.delete('/operations/:operation_id', _OperationController2.default.delete);

exports. default = routes;
