import { useAuthStore } from '../stores/auth/auth';
import { useAppStore } from '../stores/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  console.log('authenticated')

  if(authStore.currentUser && to.fullPath !== '/auth/login') {
    console.log(to.path);
    return;
  }
  console.log('arda');
  return navigateTo('/auth/login');
})
