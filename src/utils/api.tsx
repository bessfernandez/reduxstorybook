/* eslint-disable no-console */
import axios from 'axios';

const apiRoot = 'http://localhost:3012/';

/**
 * Create an Axios Client with baseURL as default
 */
export const client = axios.create({
  baseURL: apiRoot,
});

/**
 * A lightweight wrapper for axios - a Promise based HTTP client for the browser and node.js
 * see https://github.com/axios/axios#request-config for config options
 */
const request = async (options: {}) => {
  const onSuccess = (response: {}) => {
    // console.debug('Request Successful!', response);
    return response;
  };

  const onError = (error: {
    config: {};
    response: { status: string; data: {}; headers: {} };
    message: string;
  }) => {
    // console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.error('Status:', error.response.status);
      // console.error('Data:', error.response.data);
      // console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      // console.error('Error Message:', error.message);
    }

    return error.response || error.message;
  };

  const response = await client(options)
    .then(onSuccess)
    .catch(onError);

  return response;
};

export default request;
