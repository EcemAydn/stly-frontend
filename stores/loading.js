import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(true);

  function $reset() {
    isLoading.value = false;
  }

  return { isLoading, $reset };
});