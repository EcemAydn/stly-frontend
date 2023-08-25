import axios from 'axios';

const mainInstance = axios.create({
  baseURL: 'https://storage.ronservice.co/api/',
});

export default mainInstance;