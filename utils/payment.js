import axios from 'axios';

const mainInstance = axios.create({
  baseURL: 'https://dev-pay.ronservice.co/api',
});

export default mainInstance;