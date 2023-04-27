import axios from 'axios';

const baseUrl = '/api/login';

const login = async (loginDetails) => {
  const { data } = await axios.post( baseUrl, loginDetails );
  return data;
};

//eslint-disable-next-line import/no-anonymous-default-export
export default { login };