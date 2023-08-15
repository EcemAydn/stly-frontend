import { useAuthStore } from '../stores/auth/auth';
import { useAppStore } from '../stores/app';
import moment from '../utils/moment';
import axios from '../utils/axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  console.log('genel')

  if(process.client) {
    function deleteToken() {
      if (process.client) {
        if (localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY)) {
          localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY);
        }
    
        if (localStorage.getItem('expires_in')) {
          localStorage.removeItem('expires_in');
        }
    
        if (sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY)) {
          sessionStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY);
        }
    
        if (sessionStorage.getItem('expires_in')) {
          sessionStorage.removeItem('expires_in');
        }
      }
    }
    
    const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || null;
    const expiresIn = localStorage.getItem('expires_in') || sessionStorage.getItem('expires_in') || null;

    if(authStore.currentUser) {
      return;
    }

    if(token && expiresIn) {
      console.log('token var')
      console.log(to, from);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      if(Date.now() / 1000 > expiresIn) {
        deleteToken();
        return navigateTo('/auth/login');
      }

      // if(authStore.currentUser && to.fullPath === '/auth/login') {
      //   console.log('kullanıcı varsa')
      //   return;
      // }
      await authStore.me()
        .catch(() => {
          deleteToken();
          return navigateTo('/auth/login');
        });

      console.log('kullanıcı geldi')

      if(to.meta.isAuth) {
        return navigateTo('/home');
      }

      return;
    }
  }

  return;
})
