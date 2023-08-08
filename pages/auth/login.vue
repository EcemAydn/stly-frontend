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
    router.push('/');
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
  <div class="flex min-h-full w-full">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-60">
      <InlineBanner v-if="error" type="negative" title="Error" :description="error"></InlineBanner>
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="mx-auto h-12 w-auto mb-12" :src="themeConfig.logo" :alt="themeConfig.logoText" />
          <h2 class="mt-8 text-3xl leading-9 tracking-wide text-content-primary">
            {{ t('auth.LoginHeader') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-content-secondary">
            {{ t('auth.HasNotAccount') }}
            <RouterLink to="/auth/register" class="font-semibold text-global-blue-500 hover:text-global-blue-600">Get
              {{ t('auth.Started') }}</RouterLink>
          </p>
        </div>

        <div class="mt-6">
          <div>
            <form @submit.prevent="onSubmit" class="space-y-6">
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
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <CheckboxComponent :disabled="isLoading" class="cursor-pointer" name="remember-me" type="checkbox"
                    :label="t('Remember Me')" v-model="rememberMe" />
                </div>
                <div class="text-sm leading-6">
                  <RouterLink to="/auth/forgotpassword">
                    <ButtonComponent variant="bare" size="small">
                      Forgot password?
                    </ButtonComponent>
                  </RouterLink>
                </div>
                <div class="text-sm leading-6">
                </div>
              </div>

              <div>
                <ButtonComponent type="submit" :loading="isLoading" block> {{ t('auth.LoginHeader') }} </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>