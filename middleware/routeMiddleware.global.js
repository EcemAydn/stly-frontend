import { useAuthStore } from '../stores/auth/auth';
import { useAppStore } from '../stores/app';
import moment from '../utils/moment';
import axios from '../utils/axios';

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

export default defineNuxtRouteMiddleware(async (to, from) => {
  const appStore = useAppStore();
  let token = null;
  let expiresIn = null;
  
  if (process.client) {
    token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) || null;
    expiresIn = localStorage.getItem('expires_in') || sessionStorage.getItem('expires_in') || null;
  }
  
  // const expiresAt = moment().unix();
  // const isTokenExpired = expiresAt > expiresIn;
  const authStore = useAuthStore();

  // if(authStore.currentUser) {
    
  //     if(token && !isTokenExpired) {
  //       return navigateTo('/home');
  //     }

  //     if(!token && isTokenExpired) {
  //       return navigateTo('/auth/register');
  //     }
      
  //     if(!isTokenExpired){
  //       axios.defaults.headers.common.Authorization = `Bearer ${token}`
  //       await authStore.me()
  //         .catch(() => {
  //           deleteToken();
  //           return navigateTo('/auth/register');
  //         })
  //     } 
      
  //     if(token && isTokenExpired) {
  //       return navigateTo('/auth/register');
  //     }

  // }

  // if(!authStore.currentUser) {

  //     if(token && !isTokenExpired) {
  //       return navigateTo('/home');
  //     }

  //     if(!token && isTokenExpired) {
  //       return navigateTo('/auth/register');
  //     }

  //     if(!isTokenExpired){
  //       axios.defaults.headers.common.Authorization = `Bearer ${token}`
  //       await authStore.me()
  //         .catch(() => {
  //           deleteToken();
  //           return navigateTo('/auth/register');
  //         })
  //     }

  // }

  


  if (token && expiresIn) {
    const expiresAt = moment().unix();
    const isTokenExpired = expiresAt > expiresIn;

    if (isTokenExpired && !to.meta.isAuth) {
      console.log(3);
      deleteToken();
      appStore.isLoading = false;
      return navigateTo('/auth/register');
    }

    if (!isTokenExpired && !authStore.currentUser) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      await authStore.me()
        .catch(() => {
          deleteToken();
          return navigateTo('/auth/register');
        });
      
        appStore.isLoading = false;

      if(from.query.redirect) {
        return navigateTo(from.query.redirect);
      }

      if(to.meta.isAuth) {
        console.log('arda');
        return navigateTo('/');
      }
    }

    if (isTokenExpired && (to.meta.isAuth || to.path === '/')) {
      return navigateTo('/auth/register');
    }
  }

  if (!token && !to.meta.isAuth && !to.path === '/') {
    appStore.isLoading = false;
    return navigateTo('/auth/register');
  }

    appStore.isLoading = false;
    navigateTo({ path: '/redirect', query: { redirect: to.fullPath } });
})
