import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/plugins/axios.js';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null);

  function saveToken(token, rememberMe = false) {
    if (token) {
      // console.log(token);
      axios.defaults.headers.common.Authorization = `Bearer ${token.code}`;

      if (rememberMe) {
        localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token.code);
        localStorage.setItem('expires_in', token.expires_in);
      } else {
        sessionStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token.code);
        sessionStorage.setItem('expires_in', token.expires_in);
      }
    }
  }


  function login(email, password, rememberMe) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post('/api/auth/login', { email, password, rememberMe });
        currentUser.value = response.data.data.user;
        saveToken(response.data.data.token, rememberMe);
        resolve();
      } catch (error) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  function register(firstName, lastName, email, password, confirmPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('/register', {
          email, password, confirm_password: confirmPassword, firstName, lastName,
        });
        currentUser.value = response.data.data.user;
        saveToken(response.data.data.token);
        resolve();
      } catch (error) {
        console.log('error ===>', error);
        if (error.response) {
          console.log('error response data ===>', error.response.data); 
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }
  


  return {
    currentUser,
// functions
    login,
    register,
  };
});
