import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import 'materialize-css/dist/css/materialize.min.css';

import App from './App';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const root = document.getElementById('root');

ReactDOM.render(app, root);