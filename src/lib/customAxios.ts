import axios from 'axios';

import getAuthHeader from './getAuthHeader';

export const customAxios = axios.create();

customAxios.interceptors.request.use((config) => {
  const authHeader = getAuthHeader();
  if (authHeader === null || authHeader === undefined) return config;

  config.headers = {
    ...config.headers,
    Authorization: authHeader,
  };
  return config;
});

export default customAxios;
