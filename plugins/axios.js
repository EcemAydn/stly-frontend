import axios from 'axios';

const mainInstance = axios.create({
  baseURL: 'https://auth.ronservice.co',
});

export default mainInstance;
