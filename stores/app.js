import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(true);

  return {
    isLoading,
  }
});