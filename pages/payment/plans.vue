<script setup>
import { computed, onMounted, ref } from 'vue';
import { useSubscriptionStore } from '@/stores/payment/payment';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import { useI18n } from 'vue-i18n';
import OceanModal from '@/components/modal/OceanModal.vue';
import TabsComponent from '@/components/TabsComponent.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue'
import LayerTwoIcon from '@/components/icons/LayerTwoIcon.vue';

definePageMeta({
  middleware: ['authenticated-middleware'],
  defaultScale: 'mini',
  scalable: false,
  extra: true,
});

const subscriptionStore = useSubscriptionStore();
const userStore = useAuthStore();
const alertStore = useAlertStore();
const { t } = useI18n();

const selectedHeader = ref('MONTHLY');
const showModal = ref(false);
const isLoading = ref(false);
const isLoadingButton = ref(true);
const cancelLoading = ref(false);
const showCanceling = ref(false);

const tabs = ref([
  { text: t('payment.Monthly'), value: 'MONTHLY' },
  { text: t('payment.Yearly'), value: 'YEARLY' },
]);

async function CardFunction(plan) {
  if (plan.text === 'Cancel') {
    showCanceling.value = true;
  } else {
    subscriptionStore.selectedPlan = plan;
    showModal.value = true;
  }
}

async function handleCancel() {
  cancelLoading.value = true;
  try {
    isLoading.value = true;
    await subscriptionStore.cancel();
    await userStore.me();
    cancelLoading.value = false;
    showCanceling.value = false;
    alertStore.addAlert({ title: 'Successfully canceled the subscription', type: 'success' });
  } catch (error) {
    cancelLoading.value = false;
    alertStore.addAlert({ title: 'Failed to cancel the subscription', type: 'negative' });
  } finally {
    cancelLoading.value = false;
    isLoading.value = false;
  }
}

const selectedPlans = computed(() => {
  const activePricingPlanId = subscriptionStore.subscription?.subscription?.pricingPlan?.id;

  if (selectedHeader.value === 'MONTHLY') {
    return subscriptionStore.plans.monthly.map((plan) => ({
      ...plan,
      text: plan.id === activePricingPlanId ? t('payment.Cancel') : t('payment.Select'),
      intent: plan.id === activePricingPlanId ? 'destructive' : 'none',
      appearance: plan.id === activePricingPlanId ? 'secondary' : 'primary',
    }));
  } else {
    return subscriptionStore.plans.yearly.map((plan) => ({
      ...plan,
      text: plan.id === activePricingPlanId ? t('payment.Cancel') : t('payment.Select'),
      intent: plan.id === activePricingPlanId ? 'destructive' : 'none',
      appearance: plan.id === activePricingPlanId ? 'secondary' : 'primary',
    }));
  }
});

onMounted(async () => {
  try {
    await Promise.all([
      await subscriptionStore.getProduct(),
      await subscriptionStore.get(),
    ])
    isLoadingButton.value = false;
  } catch {
    isLoadingButton.value = false;
  } finally {
    isLoadingButton.value = false;
  }
});

</script>
<template>
  <div v-if="!isLoadingButton" class="flex pb-12 flex-col gap-4 max-w-5xl mx-auto px-4 w-full">

    <!-- header -->
    <HeaderComponent size="large" :title="$t('payment.Plans & Pricing')" :description="$t('payment.PaymentDescription')" />
    <div class="mx-auto bg-white p-2 rounded-md">
      <TabsComponent color="ghost" v-model="selectedHeader" :items="tabs" />
    </div>
    
    <div class="flex flex-wrap gap-4 justify-center">
      <CardComponent
        class="h-full"
        size="xxsmall"
        :class="plan.text === $t('payment.Select') ? '' : 'ring-2'"
        line 
        v-for="plan in selectedPlans"
        :key="plan.id"
      >
        <template #title>
          <div class="flex items-center whitespace-nowrap" :class="selectedHeader === 'MONTHLY' ? 'gap-4' : 'gap-1'">
            {{ plan.name }}
            <BadgeComponent v-if="plan.text !== $t('payment.Select')" class="font-normal text-xs" color="blue" :badge-text="$t('payment.Your Plan')" />
          </div>
        </template>
          <div class="flex flex-col gap-4 text-content-tertiary p-6">
            <div class="text-sm">{{ t('payment.subtitle') }}</div>
            <div class="flex items-end gap-2">
              <div class="text-3xl font-semibold text-content-primary">${{ selectedHeader === 'MONTHLY' ? parseFloat(parseFloat(plan.price).toFixed(2)) : parseFloat(parseFloat(plan.price).toFixed(2))/12 }}</div>
              <div class="text-md pb-1 text-content-tertiary">/{{ t('payment.month') }}</div>
            </div>
            <div class="text-md">Standart</div>
            <div class="flex items-center gap-1">
              <div class="text-md"> <b>{{ plan.credit }}</b> {{ t('payment.credits') }}/{{ selectedHeader === 'MONTHLY' ? t('payment.month') : t('payment.year') }} </div>
              <!-- <IconBase :width="15" :height="15" class="text-gray-400">
                <InfoCircle />
              </IconBase> -->
            </div>
            <div class="flex gap-2">
              <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                <CheckIcon />
              </IconBase>
              <div class="text-xs">Write your articles with Article Writing Tools</div>
            </div>
            <div class="flex gap-2">
              <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                <CheckIcon />
              </IconBase>
              <div class="text-xs">Text to Image Generation</div>
            </div>
            <div class="flex gap-2">
              <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                <CheckIcon />
              </IconBase>
              <div class="text-xs">Create CEO friendly advertisement for several platforms</div>
            </div>
            <div class="flex gap-2">
              <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                <CheckIcon />
              </IconBase>
              <div class="text-xs">Make your videos with guidance of Video Timeline Tool</div>
            </div>
            <div class="flex gap-2">
              <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                <CheckIcon />
              </IconBase>
              <div class="text-xs">Make your time consuming contents with ease</div>
            </div>
            <div class="flex gap-2">
              <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                <CheckIcon />
              </IconBase>
              <div class="text-xs">Create your content in 11 LANGUAGES</div>
            </div>
          </div>
          <template #action>
            <ButtonComponent 
              :disabled="plan.disabled"
              block
              class="mt-2"
              size="small"
              @click="CardFunction(plan)"
              :text="plan.text"
              :intent="plan.intent"
              :appearance="plan.appearance"
            />
          </template>
          <template #prepend>
            <AvatarComp color="blue" radius="full">
              <template #icon>
                <IconBase>
                  <LayerTwoIcon />
                </IconBase>
              </template>
            </AvatarComp>
          </template>
        </CardComponent>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <OceanModal size="xlarge" v-if="showModal" class="modal">
        <form v-if="subscriptionStore.selectedPlan" class="w-full text-sm">
          <div class="grid sm:grid-cols-5 gap-4">
            <div class="sm:col-span-3 flex flex-col gap-2">
              <div class="flex w-full items-center justify-between">
                <div class="text-lg">Upgrade Your Plan</div>
                <IconBase @click="showModal = false" class="cursor-pointer sm:hidden">
                  <CloseIcon />
                </IconBase>
              </div>
              <div class="border border-border-subtle-informative rounded-md p-3 h-full">
                <div>{{ subscriptionStore.selectedPlan.name }}</div>
                <div class="flex flex-col gap-4 pt-2">
                  <div class="flex gap-2">
                    <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                      <CheckIcon />
                    </IconBase>
                    <div class="text-xs">Write your articles with Article Writing Tools</div>
                  </div>
                  <div class="flex gap-2">
                    <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                      <CheckIcon />
                    </IconBase>
                    <div class="text-xs">Text to Image Generation</div>
                  </div>
                  <div class="flex gap-2">
                    <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                      <CheckIcon />
                    </IconBase>
                    <div class="text-xs">Create CEO friendly advertisement for several platforms</div>
                  </div>
                  <div class="flex gap-2">
                    <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                      <CheckIcon />
                    </IconBase>
                    <div class="text-xs">Make your videos with guidance of Video Timeline Tool</div>
                  </div>
                  <div class="flex gap-2">
                    <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                      <CheckIcon />
                    </IconBase>
                    <div class="text-xs">Make your time consuming contents with ease</div>
                  </div>
                  <div class="flex gap-2">
                    <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
                      <CheckIcon />
                    </IconBase>
                    <div class="text-xs">Create your content in 11 LANGUAGES</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full sm:col-span-2">
              <div class="flex w-full items-center justify-between pb-2">
                <div class="text-lg">Summary</div>
                <IconBase @click="showModal = false" class="cursor-pointer hidden sm:block">
                  <CloseIcon />
                </IconBase>
              </div>
              <div v-if="subscriptionStore.selectedPlan" class="text-xs flex flex-col gap-4">
                <div class="">
                  <div class="flex gap-1 border border-border-secondary p-2">
                    <div>Your current plan:</div>
                    <div class="font-medium">{{ subscriptionStore.selectedPlan.name }}</div>
                  </div>
                  <div class="flex gap-1 border border-border-secondary p-2">
                    <div>Currently paying:</div>
                    <div class="font-medium">${{ subscriptionStore.selectedPlan.price }}</div>
                  </div>
                </div>
                <div class="">
                  <div class="flex flex-col gap-1 border border-border-secondary p-2">
                    <div>Total due today:</div>
                    <div class="font-medium text-lg">${{ subscriptionStore.selectedPlan.price }}</div>
                  </div>
                  <div class="flex gap-1 border border-border-secondary p-2">
                    <div class="font-medium">${{ selectedHeader === 'MONTHLY' ? subscriptionStore.selectedPlan.price*12 : subscriptionStore.selectedPlan.price }}</div>
                    <div>will be billed every year until canceled.</div>
                  </div>
                </div>
                <NuxtLink to="/payment/checkout">
                  <ButtonComponent block text="Go To Payment" />
                </NuxtLink>
              </div>
              <div v-else class="text-xs flex flex-col gap-4">
                <div class="flex gap-1">
                  <div>Your current plan:</div>
                  <div class="font-medium">Free</div>
                </div>
                <div class="flex gap-1">
                  <div>Currently paying:</div>
                  <div class="font-medium">$0</div>
                </div>
                <div class="flex gap-1">
                  <div>Total due today:</div>
                  <div class="font-medium">$0</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </OceanModal>
    </Transition>
  </Teleport>
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