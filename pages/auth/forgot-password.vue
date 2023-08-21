<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import themeConfig from '@/themeConfig';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';

definePageMeta({
  layout: "blank",
  isAuth: true,
  middleware: ['not-authenticated-middleware'],
});

const isLoading = ref(false);
const error = ref('');
const emailInput = ref('');
const emailError = ref('');

const authStore = useAuthStore();
const alertStore = useAlertStore();
const { t } = useI18n();

async function onSubmit() {
  try {
    isLoading.value = true;
    await authStore.forgotPassword(emailInput.value);
    isLoading.value = false;
    alertStore.addAlert({ title: 'Email sent', type: 'success' });
  } catch (err) {
    console.log(err);
    if (err.validation_error) {
      
          emailError.value = err.validation_error.email[0];
        
    } else if (err.error) {
      error.value = err.error;
    } else {
      alertStore.addAlert({ title: err.error, type: 'negative' });
    }

    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" :src="themeConfig.logo" :alt="themeConfig.logoText">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot your password?</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <InputComponent
            :disabled="isLoading"
            v-model="emailInput"
            id="email"
            name="email"
            type="email"
            label="E-mail"
            autocomplete="email"
            required
            :error="emailError"
            @focus="emailError = ''"
          />
        </div>

        <div>
          <ButtonComponent type="submit" :loading="isLoading" block> Send Mail </ButtonComponent>
        </div>
      </form>

      <p class="mt-10 text-sm leading-6 text-content-secondary text-center">
        {{ t('auth.HasNotAccount') }}
        <NuxtLink 
          to="/auth/register"
          class="font-semibold text-global-blue-500 hover:text-global-blue-600"
          >Get Started
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
