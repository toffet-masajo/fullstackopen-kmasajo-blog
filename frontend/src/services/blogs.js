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

const updateBlog = async ({ author, title, url, likes, user, id }) => {
  const config = {
    headers: { Authorization: token }
  };

  const blogObject = { 
    author,
    title,
    url,
    likes: likes+1,
    user: user.id
  };
  
  const { data } = await axios.put(`${baseUrl}/${id}`, blogObject, config);
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
export default { createBlog, updateBlog, getAll, setToken };