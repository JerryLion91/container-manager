'use strict';
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _cors = require('cors');
var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes');
var _routes2 = _interopRequireDefault(_routes);
require('./database/index');

class App {
  constructor() {
    this.server = _express2.default.call(void 0);
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(_express2.default.json());
    this.server.use(
      _cors2.default.call(void 0, {
        origin: 'http://localhost:3000',
      })
    );
    this.server.use(
      _express2.default.static(
        _path2.default.resolve(__dirname, '..', 'client', 'build')
      )
    );
  }
  routes() {
    this.server.use('/api', _routes2.default);
  }
}

const app = new App().server;

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server running at: ${HOST}:${PORT}`);
});
