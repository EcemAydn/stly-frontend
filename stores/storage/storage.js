import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../../utils/storage';
import { useAuthStore } from '../auth/auth';

export const useStorageStore = defineStore('storage', () => {
  const medias = ref(null);

  function createMedia(media) {
    return new Promise(async (resolve, reject) => {
      const apiKey = import.meta.env.VITE_APP_TOKEN_KEY;
      try {
        const authStore = useAuthStore();
        axios.post('medias', media, {
          headers: { token:`${apiKey}` },
        }).then((response) => {
          medias.value = response.data.data.medias;
          authStore.update({
            profile_photo_id: response.data.data.medias[0].id,
          })
          resolve(response.data);
        })
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }
  

  return {
    medias,
    createMedia,
  }
});