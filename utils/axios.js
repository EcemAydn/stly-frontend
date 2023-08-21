import axios from 'axios';

const mainInstance = axios.create({
  baseURL: 'https://auth2.ronservice.co/api',
});

export default mainInstance;