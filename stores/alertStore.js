import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref([]);

  function addAlert(alert) {
    alerts.value.push(alert);

    setTimeout(() => {
      alerts.value.pop();
    }, 5000);
  }

  function popAlert() {
    alerts.value.pop();
  }

  function $reset() {
    alerts.value = [];
  }

  return {
    alerts,

    addAlert,
    popAlert,
    $reset,
  };
});
