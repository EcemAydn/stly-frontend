<script setup>
import { onMounted } from 'vue';
import { useSubscriptionStore } from '@/stores/payment/payment';
import { useAuthStore } from '@/stores/auth/auth';
import { useI18n } from 'vue-i18n';
import CardIcon from '@/components/icons/CardIcon.vue';
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

async function handleCancel() {
  await subscriptionStore.cancel();
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

    <div v-for="plan in subscriptionStore.subscription" :key="plan.id">
      <div class="px-6 md:px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-2">
        <div>
          <div class="text-sm text-content-secondary pb-1">Plan</div>
          <div class="text-2xl font-semibold">{{ plan.pricingPlan.name }}</div>
        </div>
        <div>
          <div class="text-sm text-content-secondary pb-1">{{ t('myplan.Payment') }}</div>
          <div class="flex items-end gap-2">
            <div class="text-2xl font-semibold">${{ plan.pricingPlan.paymentInterval === 'MONTHLY' ? plan.pricingPlan.price : plan.pricingPlan.price/12 }}</div>
            <div class="text-content-secondary text-sm pb-0.5">{{ t('myplan.per month') }}</div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2">
          <!-- @click="subscriptionStore.selectPlan(plan)" -->
          <ButtonComponent variant="ghost" size="small" appearance="secondary" :text="t('myplan.Cancel subscription')" @click="handleCancel"  />
          <NuxtLink to="/payment/plans">
            <ButtonComponent variant="ghost" size="small" :text="t('myplan.upgrade')" />
          </NuxtLink>
        </div>
      </div>
      <div class="bg-black w-full border my-4"></div>
      <div class="flex flex-col lg:flex-row lg:items-center gap-4 justify-between px-6 md:px-8 py-4">
        <div class="flex flex-col items-start gap-2 w-full">
          <div class="text-sm font-medium whitespace-nowrap">{{ t('myplan.remaining days') }}</div>
            {{ Math.floor((plan.endingDate - plan.startingDate) / (1000 * 60 * 60 * 24)) }}
        </div>
        <div class="flex flex-col items-start gap-2 w-full">
          <div class="text-sm font-medium whitespace-nowrap">{{ t('myplan.credit') }}</div>
            {{ plan.pricingPlan.credit }}
        </div>
        <div class="flex flex-col items-start gap-2 w-full">
          <div class="text-sm font-medium whitespace-nowrap">{{ t('myplan.status') }}</div>
          <div class="flex items-center gap-2 text-sm">
            {{ plan.pricingPlan.paymentInterval }}
            {{ plan.pricingPlan.status.toUpperCase() }}
            <BadgeComponent size="small" emphasis="medium" color="blue" badge-text="Active" />
          </div>
        </div>

      </div>
      
    </div>
    </CardComponent>
      <div v-else class="flex items-center justify-center w-full h-full">
      <div class="flex flex-col gap-2 items-center">
        <img src="../../public/addCard.svg" />
        <div class="flex flex-col items-center text-content-primary text-sm">
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
</template>