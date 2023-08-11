<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import themeConfig from '@/themeConfig';
import { useAuthStore } from '@/stores/auth/auth';

definePageMeta({
  layout: "blank",
  name: "Login",
  isAuth: true,
  // middleware: ['route-middleware'],

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
async function onSubmit() {
  try {
    isLoading.value = true;
    await authStore.login(emailInput.value, passwordInput.value, rememberMe.value);
    isLoading.value = false;
    router.push('/home');
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
      console.log('arda');
    }

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
              <NuxtLink to="/auth/forgotpassword">
                <ButtonComponent variant="bare" size="small">
                  Forgot password?
                </ButtonComponent>
              </NuxtLink >
            </div>
          </div>
        </div>


      <div>
        <ButtonComponent type="submit" :loading="isLoading" block> {{ t('auth.LoginHeader') }} </ButtonComponent>
      </div>
      </form>

      <p class="mt-10 text-sm leading-6 text-content-secondary text-center">
        {{ t('auth.HasNotAccount') }}
        <NuxtLink to="/auth/register" class="font-semibold text-global-blue-500 hover:text-global-blue-600">{{ t('auth.Started') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>