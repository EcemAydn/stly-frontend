import { useAuthStore } from '../stores/auth/auth';
import { useAppStore } from '../stores/app';
import moment from '../utils/moment';
import axios from '../utils/axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (process.client) {
    console.log('client')
    function deleteToken() {
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

    const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
    // const expiresIn = localStorage.getItem('expires_in') || sessionStorage.getItem('expires_in');

    if (authStore.currentUser) {
      if (to.meta.isAuth) {
        return navigateTo('/home'); // Zaten giriş yapmış bir kullanıcı giriş sayfasına erişmeye çalışırsa ana sayfaya yönlendir.
      }
      return;
    }

    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      
      // if (Date.now() / 1000 > expiresIn) {
      //   deleteToken();
      //   return navigateTo('/auth/login'); // Token süresi dolmuşsa giriş sayfasına yönlendir.
      // }

      await authStore.me().catch(() => {
        deleteToken();
        return navigateTo('/auth/login'); // Kullanıcı bilgisini alamazsak token'ı sil ve giriş sayfasına yönlendir.
      });

      if (to.meta.isAuth) {
        return navigateTo('/home'); // Giriş yapmış bir kullanıcı için belirli sayfalara erişimi engelle.
      }
    } else if (!to.meta.isAuth) {
      return navigateTo('/auth/login'); // Giriş yapmamış bir kullanıcı için belirli sayfalara erişimi engelle.
    }
  }
});
