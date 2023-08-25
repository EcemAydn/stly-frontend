<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import themeConfig from '@/themeConfig';

definePageMeta({
  layout: "blank",
  name: "forgotPassword",
  middleware: ['not-authenticated-middleware'],
  isAuth: true,
});

const isLoading = ref(false);
const error = ref('');
const passwordInput = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const { t } = useI18n();

async function onSubmit() {
  try {

    if (passwordInput.value !== confirmPassword.value) {
      passwordError.value = 'Passwords do not match';
      confirmPasswordError.value = 'Passwords do not match';
      return;
    }

    if (passwordInput.value.length < 8) {
      passwordError.value = 'Password should be at least 8 characters';
      return;
    }

    isLoading.value = true;
    const queryCode = window.location.search.replace('?c=', '');
    await authStore.resetPassword({
      code: queryCode,
      password: passwordInput.value,
      confirmPassword: confirmPassword.value,
    });
    isLoading.value = false;
    router.push('/home');
    alertStore.addAlert({ title: 'Password Reset', type: 'success' });
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
      alertStore.addAlert({ title: err.error, type: 'negative' });
    }

    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-background-default dark:bg-background-inverted">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" :src="themeConfig.logo" :alt="themeConfig.logoText">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-content-primary dark:text-content-inverted-primary">Reset Password</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <InputComponent
            :disabled="isLoading"
            v-model="passwordInput"
            id="password"
            name="password"
            type="password"
            placeholder="Enter Pasword"
            autocomplete="current-password"
            label="Password"
            required
            :error="passwordError"
            @focus="passwordError = ''"
          />
        </div>
        <div>
          <InputComponent
            :disabled="isLoading"
            v-model="confirmPassword"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            placeholder="Confirm Your Password"
            type="password"
            autocomplete="confirm-password"
            required
            :error="confirmPasswordError"
            @focus="confirmPasswordError = ''"
          />
        </div>

        <div>
          <ButtonComponent type="submit" :loading="isLoading" block>Reset</ButtonComponent>
        </div>
      </form>

      <p class="mt-10 text-sm leading-6 text-content-secondary dark:text-content-inverted-secondary text-center">
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
