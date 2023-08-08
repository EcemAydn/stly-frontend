import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../../utils/axios';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null);

  function saveToken(token, rememberMe = false) {
    if (token) {
      // console.log(token);

      if (rememberMe) {
        localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token.code);
        localStorage.setItem('expires_in', token.expires_in);
      } else {
        sessionStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token.code);
        sessionStorage.setItem('expires_in', token.expires_in);
      }
    }
  }


  function login(username, password, rememberMe) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('/login?project=ecommerce', { username, password, rememberMe });
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

  function register(given_name, family_name, email, password, confirmPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await 
        axios.post('/register?project=ecommerce', {
          email, password, confirm_password: confirmPassword, given_name, family_name,
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

  function logout() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.get('/logout?project=ecommerce', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY);
          sessionStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY);
          currentUser.value = null;
          resolve(response);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  function forgotPassword(email) {
    return new Promise((resolve, reject) => {
      axios.post('/reset-password?project=ecommerce', { email })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  
  function me() {
    return new Promise((resolve, reject) => {
      axios.get('/auth-user?project=ecommerce').then((response) => {
        currentUser.value = response.data.data.user;

        resolve(response);
      }).catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
    });
  }

  function update(payload){
    return new Promise((resolve, reject) => {
      axios.put('/update?project=ecommerce', payload).then((response) => {
        currentUser.value = response.data.data.user;
        resolve(response);
      }).catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
    })
  }


  return {
    currentUser,
// functions
    login,
    register,
    logout,
    forgotPassword,
    me,
    update,
  };
});
