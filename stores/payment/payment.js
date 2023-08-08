import { ref } from 'vue';
import { defineStore } from 'pinia';
import payment from '../../utils/payment';
import { useAuthStore } from '../auth/auth';
import themeConfig from '../../themeConfig';

const paymentReferenceCode = themeConfig.paymentReferenceCode;

export const useSubscriptionStore = defineStore('subs', () => {
  const subscriptions = ref([]);
  const plans = ref({
    monthly: [],
    yearly: [],
  });
  const selectedPlan = ref(null);


function getProduct() {
  return new Promise((resolve, reject) => {
    try {
      plans.value = {
        monthly: [],
        yearly: [],
      };
      payment.get(`/product?referenceCode=${paymentReferenceCode}`).then((response) => {
        if(response.data.data) {
          response.data.data.product.pricingPlans.forEach((plan) => {
            if(plan.paymentInterval === 'MONTHLY') {
              plans.value.monthly.push(plan);
            } else if(plan.paymentInterval === 'YEARLY') {
              plans.value.yearly.push(plan);
            }
          });
        }
      })
      resolve();
    } catch(error) {
      console.log(error);
      reject();
    }

  });
}

function createSubscription(data) {
  return new Promise((resolve, reject) => {
    try {
      const authStore = useAuthStore();
      payment.post(`/subscriptions?referenceCode=${paymentReferenceCode}`, data)
      .then((response) => {
        subscriptions.value = response.data.data;
        authStore.update({user_data: {
          subscription_id: response.data.data.subscription.id,
          subscription_status: 'ACTIVE',
        }})
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  })
}

function get(){
  return new Promise((resolve, reject) => {
    try {
      const authStore = useAuthStore();
      payment.get(`/subscription/${authStore.user_data.subscription_id}?referenceCode=${paymentReferenceCode}`).then((response) => {
        subscriptions.value = response.data.data;
        resolve(response.data);
      }).catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  })
}

// api/subscriptions/cancel
// function cancel(){
//   return new Promise((resolve, reject) => {
//     try {
//       api.post('/api/subscriptions/cancel').then((response) => {
//         subscriptions.value = response.data.data;
//         resolve(response.data);
//       }).catch((error) => {
//         if (error.response) {
//           reject(error.response.data);
//         } else {
//           reject(error);
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   })
// }

// // POST - api/subscriptions/upgrade
// function upgrade(){
//   return new Promise((resolve, reject) => {
//     try {
//       api.post('/api/subscriptions/upgrade').then((response) => {
//         subscriptions.value = response.data.data;
//         resolve(response.data);
//       }).catch((error) => {
//         if (error.response) {
//           reject(error.response.data);
//         } else {
//           reject(error);
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   })
// }

  return {
    subscriptions,
    plans,
    selectedPlan,

    createSubscription,
    getProduct,
    // get,
    // cancel,
    // upgrade,
  };
});