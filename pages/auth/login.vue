<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import themeConfig from '@/themeConfig';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';

definePageMeta({
  layout: "blank",
  name: "Login",
  isAuth: true,
  middleware: ['not-authenticated-middleware'],
});

const { t } = useI18n()

const isLoading = ref(false);
const error = ref('');
const rememberMe = ref(false);
const emailInput = ref('');
const emailError = ref('');
const passwordInput = ref('');
const passwordError = ref('');

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

async function onSubmit() {
  try {
    isLoading.value = true;
    await authStore.login(emailInput.value, passwordInput.value, rememberMe.value);
    isLoading.value = false;
    router.push('/home');
    alertStore.addAlert({ title: 'Successfully, You has been logined', type: 'success' });

  } catch (err) {
    if (err.validation_error) {
      const { validation_error: validationError } = err;
      console.log(validationError);

      Object.keys(validationError).forEach((error) => {
        if (error === 'password') {
          passwordError.value = validationError[error][0];
        }

        if (error === 'email') {
          emailError.value = validationError[error][0];
        }
      });
    } else if (err.error) {
      alertStore.addAlert({ title: err.error, type: 'negative' });
    } else {
      alertStore.addAlert({ title: 'Unexpected Error', type: 'negative' });
    }

  } finally {
    isLoading.value = false;
    
  }
}
</script>
<template>

  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" :src="themeConfig.logo" :alt="themeConfig.logoText">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ t('auth.Sign in to your account') }}</h2>
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
          <InputComponent :disabled="isLoading" v-model="passwordInput" id="password" name="password"
            type="password" label="Password" autocomplete="current-password" required :error="passwordError"
            @focus="passwordError = ''" />
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <CheckboxComponent :disabled="isLoading" class="cursor-pointer" name="remember-me" type="checkbox"
                :label="t('Remember Me')" v-model="rememberMe" />
            </div>
            <div class="text-sm leading-6">
              <NuxtLink to="/auth/forgot-password">
                <ButtonComponent variant="bare" size="small">
                  Forgot password?
                </ButtonComponent>
              </NuxtLink >
            </div>
          </div>
        </div>

      <div class="flex flex-col gap-4">
          <ButtonComponent :loading="isLoading" type="submit" block> {{ t('auth.LoginHeader') }}  </ButtonComponent>
          <div class="flex items-center pt-2">
            <hr class="w-full">
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <span class="bg-white px-6 text-gray-900 whitespace-nowrap">Or continue with</span>
            </div>
            <hr class="w-full">
          </div>
          <ButtonComponent :loading="isLoading" appearance="secondary" block>
            Login With Google
            <template #prepend>
              <IconBase>
                <GoogleIcon />
              </IconBase>
            </template>
          </ButtonComponent>
        </div>
      </form>

      <p class="mt-10 text-sm leading-6 text-content-secondary text-center">
        {{ t('auth.HasNotAccount') }}
        <NuxtLink to="/auth/register" class="font-semibold text-global-blue-500 hover:text-global-blue-600">{{ t('auth.Started') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>