import axios from 'axios';

const http = axios.create({
  //baseURL: 'https://containers-app001.herokuapp.com/api',
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export { http };
