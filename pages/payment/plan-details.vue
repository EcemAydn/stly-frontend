<script setup>
import { onMounted } from 'vue';
import { useSubscriptionStore } from '@/stores/payment/payment';
import { useAuthStore } from '@/stores/auth/auth';
import { useI18n } from 'vue-i18n';
import CardIcon from '@/components/icons/CardIcon.vue';
import OceanModal from '@/components/modal/OceanModal.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';

definePageMeta({
  middleware: ['authenticated-middleware'],
  defaultScale: 'mini',
  scalable: false,
  extra: true,
});
const subscriptionStore = useSubscriptionStore();
const authStore = useAuthStore();
const { t } = useI18n();

const showCanceling = ref(false);
const cancelLoading = ref(false);

async function handleCancel() {
  cancelLoading.value = true;
  await subscriptionStore.cancel();
  cancelLoading.value = false;
  showCanceling.value = false;
}

onMounted(async () => {
  try {
    await subscriptionStore.get()
  } catch(error) {
    console.log(error)
  } finally {
  }
});
</script>
<template>
  <div class="flex pb-12 flex-col gap-4 max-w-5xl mx-auto px-4 w-full">
    <HeaderComponent size="large" :title="t('myplan.My Plan')" />
    <CardComponent v-if="subscriptionStore.subscription" border="secondary" size="full" class="py-6 md:py-4">  
      
      <!-- <div v-for="plan in subscriptionStore.subscription" :key="plan.id">
        {{ JSON.stringify(plan) }} -->
        <div class="px-6 md:px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <div>
            <div class="text-sm text-content-secondary dark:text-content-inverted-secondary pb-1">Plan</div>
            <div class="text-2xl font-semibold">{{ subscriptionStore.subscription.pricingPlan.name }}</div>
          </div>
          <div>
            <div class="text-sm text-content-secondary dark:text-content-inverted-secondary pb-1">{{ t('myplan.Payment') }}</div>
            <div class="flex items-end gap-2">
              <div class="text-2xl font-semibold">${{ subscriptionStore.subscription.pricingPlan.paymentInterval === 'MONTHLY' ? subscriptionStore.subscription.pricingPlan.price : subscriptionStore.subscription.pricingPlan.price/12 }}</div>
              <div class="text-content-secondary dark:text-content-inverted-secondary text-sm pb-0.5">{{ t('myplan.per month') }}</div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2">
            <ButtonComponent variant="ghost" size="small" appearance="secondary" :text="t('myplan.Cancel subscription')" @click="showCanceling = true"  />
            <NuxtLink to="/payment/plans">
              <ButtonComponent variant="ghost" size="small" :text="t('myplan.upgrade')" />
            </NuxtLink>
          </div>
        </div>
        <div class="bg-black w-full border my-4"></div>
        <div class="flex flex-col lg:flex-row lg:items-center gap-4 justify-between px-6 md:px-8 py-4">
          <div class="flex flex-col items-start gap-2 w-full">
            <div class="text-sm font-medium whitespace-nowrap">{{ t('myplan.remaining days') }}</div>
              {{ Math.floor((subscriptionStore.subscription.endingDate - subscriptionStore.subscription.startingDate) / (1000 * 60 * 60 * 24)) }}
          </div>
          <div class="flex flex-col items-start gap-2 w-full">
            <div class="text-sm font-medium whitespace-nowrap">{{ t('myplan.credit') }}</div>
              {{ subscriptionStore.subscription.pricingPlan.credit }}
          </div>
          <div class="flex flex-col items-start gap-2 w-full">
            <div class="text-sm font-medium whitespace-nowrap">{{ t('myplan.status') }}</div>
            <div class="flex items-center gap-2 text-sm">
              {{ subscriptionStore.subscription.pricingPlan.paymentInterval }}
              {{ subscriptionStore.subscription.pricingPlan.status.toUpperCase() }}
              <BadgeComponent size="small" emphasis="medium" color="blue" badge-text="Active" />
            </div>
          </div>
      </div>
    </CardComponent>

    <div v-else class="flex items-center justify-center w-full h-full">
      <div class="flex flex-col gap-2 items-center">
        <img src="../../public/addCard.svg" />
        <div class="flex flex-col items-center text-content-primary dark:text-content-inverted-primary text-sm">
          {{ t('myplan.not plan') }}
          <div>{{ t('myplan.choose plan') }}</div>
        </div>
        <NuxtLink to="/payment/plans">
          <ButtonComponent size="small" appearance="secondary" :text="t('myplan.go to plans')">
            <template #append>
              <IconBase>
                <ChevronRight />
              </IconBase>
            </template>
          </ButtonComponent>
        </NuxtLink>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <OceanModal size="small" v-if="showCanceling" class="w-full modal">
        <div class="flex flex-col items-center gap-4">
          <div>Are you sure you want to cancel your subscription?</div>
          <div class="flex gap-4 justify-end items-center">
            <ButtonComponent size="small" @click="showCanceling = false">No</ButtonComponent>
            <ButtonComponent :loading="cancelLoading" size="small" appearance="secondary" @click="handleCancel">Yes</ButtonComponent>
          </div>
        </div>
      </OceanModal>
    </Transition>
  </Teleport>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  width: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>