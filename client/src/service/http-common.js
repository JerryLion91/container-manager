import axios from 'axios';

const http = axios.create({
  baseURL: 'https://containers-app001.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export default http;
