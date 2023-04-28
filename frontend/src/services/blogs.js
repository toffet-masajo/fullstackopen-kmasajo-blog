import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };

  const { data } = await axios.post(baseUrl, newBlog, config);
  return data;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createBlog, getAll, setToken };