import { useAuthStore } from '../stores/auth/auth';
import { useAppStore } from '../stores/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  console.log('not authenticated');

  if(authStore.currentUser) {
    console.log('not authenticated');
    return navigateTo('/home');
  }

  return;
})
