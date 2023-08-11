<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import themeConfig from '@/themeConfig';
import { useAuthStore } from '@/stores/auth/auth';

definePageMeta({
  layout: "blank",
  name: "forgotPassword",
  isAuth: true,
});

const isLoading = ref(false);
const error = ref('');
const emailInput = ref('');
const emailError = ref('');
const passwordError = ref('');

const authStore = useAuthStore();
const { t } = useI18n();

async function onSubmit() {
  try {
    isLoading.value = true;
    await authStore.forgotPassword(emailInput.value);
    isLoading.value = false;
  } catch (err) {
    if (err.errors) {
      const { errors } = err;

      // eslint-disable-next-line no-shadow
      errors.forEach((error) => {
        if (error.path === 'password') {
          passwordError.value = error.msg;
        }

        if (error.path === 'email') {
          emailError.value = error.msg;
        }
      });
    } else if (err.error) {
      error.value = err.error;
    } else {
      console.log('arda',);
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
