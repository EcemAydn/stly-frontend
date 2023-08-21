import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import themeConfig from '../../themeConfig';
import { useAlertStore } from '@/stores/alertStore';

const authProjectName = themeConfig.stores.authProjectName;
export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null);
  const sessions = ref(null)
  const alertStore = useAlertStore();
  const pagination = ref({
    total: 0,
    next: null,
    prev: null,
  });

  function saveToken(token, rememberMe = false) {
    if (token) {
      console.log('token =>>', token);

      if (rememberMe) {
        localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token);
        localStorage.setItem('expires_in', token.expires_in);
      } else {
        sessionStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token);
        sessionStorage.setItem('expires_in', token.expires_in);
      }
    }
  }


  function login(email, password, rememberMe) {
    return new Promise(async (resolve, reject) => {
      try {
        const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
        const response = await axios.post('login', { email, password, rememberMe }, { 
          headers: { token:`${apiKey}` }
        });
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

  function register(first_name, last_name, email, password, confirmPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
        const response = await 
        axios.post('register', {
          email, password, confirm_password: confirmPassword, first_name, last_name,
        }, { 
          headers: { token:`${apiKey}` }
        });
        currentUser.value = response.data.data.user;
        saveToken(response.data.data.token);
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

  function logout() {
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.delete('logout', { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }})
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
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      axios.post('recover-password', { email }, { headers: { token:`${apiKey}` }})
        .then((response) => {
          console.log(response);
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

  // code, password

  function resetPassword(payload){
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      axios.put('reset-password', payload, { headers: { token:`${apiKey}` }})
        .then((response) => {
          console.log(response.data.data);
          currentUser.value = response.data.data.user;
          saveToken(response.data.data.token);
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
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.get('me', { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }}).then((response) => {
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
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.put(`update-profile`, payload , { 
        headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        currentUser.value = response.data.data.user;
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
    })
  }

  function changePassword(code){
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.put(`change-password`, code , { 
        headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        currentUser.value = response.data;
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
    })
  }

  function deleteAccount(item) {
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.post(`delete-account`, item, { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }})
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

  function sentVerifyEmail() {
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.get(`send-verify-email`, { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }})
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

  function verifyEmail(code) {
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.post(`verify-email`, code, { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }})
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

  // ?perPage=2
  function getSessions() {
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.get(`sessions`, { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }})
        .then((response) => {
          console.log(response.data.data.sessions);
          sessions.value = response.data.data.sessions;
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

  function deleteSessions(id) {
    return new Promise((resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
      axios.delete(`sessions/${id}`, { headers: { token:`${apiKey}`, Authorization: `Bearer ${token}` }})
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
    })
  }


  return {
    currentUser,
    sessions,
// functions
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    me,
    update,
    changePassword,
    deleteAccount,
    sentVerifyEmail,
    verifyEmail,
    getSessions,
    deleteSessions,
  };
});
