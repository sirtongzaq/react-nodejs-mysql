import axios from "axios";

const baseURL = "http://localhost:5555";

const handleSuccess = (response) => {
  // Handle successful responses
  return response.data;
};

const handleError = (error) => {
  // Handle errors
  throw error;
};

const get = async (url) => {
  try {
    const response = await axios.get(`${baseURL}${url}`);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

const post = async (url, data) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, data);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

const patch = async (url, data) => {
  try {
    const response = await axios.patch(`${baseURL}${url}`, data);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

const put = async (url, data) => {
  try {
    const response = await axios.put(`${baseURL}${url}`, data);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

const del = async (url) => {
  try {
    const response = await axios.delete(`${baseURL}${url}`);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

export const http = {
  get,
  post,
  patch,
  put,
  del,
};
