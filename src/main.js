import express from 'express';
import path from 'path';
import routes from './routes';
import './database/index';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      express.static(path.resolve(__dirname, '..', 'client', 'build'))
    );
  }
  routes() {
    // this.server.use('/api/v1', routes);
  }
}

const app = new App().server;

const PORT = process.env.APP_PORT || 8000;
const HOST_NAME = process.env.APP_HOST || 'localhost';

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at: ${HOST_NAME}:${PORT}`);
});
