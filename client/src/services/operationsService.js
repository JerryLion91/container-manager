import { http } from '../http';

const create = (data) => {
  return http.post('/operations', data);
};

const get = (id) => {
  return http.get(`/operations/${id}`);
};

const index = ({ client, type }) => {
  return http.get(`/operations?client=${client}&type=${type}`);
};

const update = (id, data) => {
  return http.put(`/operations/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/operations/${id}`);
};

export const operationsService = {
  create,
  get,
  index,
  update,
  remove,
};
