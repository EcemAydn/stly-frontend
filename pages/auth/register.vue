<script setup>
import { ref } from 'vue';
import themeConfig from '@/themeConfig';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth/auth'
import { useRouter } from 'vue-router';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';
import { useAlertStore } from '@/stores/alertStore';

definePageMeta({
  layout: "blank",
  name: "Register",
  isAuth: true,
  middleware: ['not-authenticated-middleware'],
});

const gtag = useGtag()
const { t } = useI18n();
const isLoading = ref(false);
const error = ref('');
const emailInput = ref('');
const emailError = ref('');
const passwordInput = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmPasswordError = ref('');
const firstNameInput = ref('');
const lastNameInput = ref('');
const firstNameError = ref('');
const lastNameError = ref('');

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

async function onSubmit() {
  try {
    const nameRegEx = /^\p{L}+$/u;
    if (!firstNameInput.value) {
        firstNameError.value = 'First name is required';
        return;
    } else if (!nameRegEx.test(firstNameInput.value)) {
        firstNameError.value = 'First name should only contain alphabetic characters!';
        return;
    }

    if (!lastNameInput.value) {
        lastNameError.value = 'Last name is required';
        return;
    } else if (!nameRegEx.test(lastNameInput.value)) {
        lastNameError.value = 'Last name should only contain alphabetic characters!';
        return;
    }

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
    await authStore.register(firstNameInput.value, lastNameInput.value, emailInput.value, passwordInput.value, confirmPassword.value); 
    gtag('event', 'screen_view', {
      app_name: themeConfig.name,
      screen_name: 'On Register'
    })
    isLoading.value = false;
    router.push('/home');
    alertStore.addAlert({ title: 'Successfully, Account created', type: 'success' });
  } catch (err) {
    if (err.errors) {
      const { errors } = err;

      // eslint-disable-next-line no-shadow
      errors.forEach((error) => {
        if (error.path === 'first_name') {
          firstName.value = error.msg;
        }
        
        if (error.path === 'last_name') {
          firstName.value = error.msg;
        }

        if (error.path === 'confirm_password') {
          confirmPasswordError.value = error.msg;
        }

        if (error.path === 'password') {
          passwordError.value = error.msg;
        }

        if (error.path === 'email') {
          emailError.value = error.msg;
        }
      });
    } else if (err.error) {
      error.value = err.error;
      alertStore.addAlert({ title: err.error, type: 'negative' });
      console.log(err);
    } else {
      console.log(err.error)
    }

    isLoading.value = false;
  }
}

</script>
<template>
  <div class="flex min-h-full h-full flex-col justify-center px-6 pb-12 lg:px-8 overflow-y-auto sm:overflow-hidden">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto mt-20" :src="themeConfig.logo" :alt="themeConfig.logoText">
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> {{ t('auth.RegisterHeader') }}</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div class="flex flex-col w-full sm:flex-row gap-4">
          <InputComponent
            :disabled="isLoading"
            v-model="firstNameInput"
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            autocomplete="name"
            required
            :error="firstNameError"
            @focus="firstNameError = ''"
          />
          <InputComponent
            :disabled="isLoading"
            v-model="lastNameInput"
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            autocomplete="name"
            required
            :error="lastNameError"
            @focus="lastNameError = ''"
          />
        </div>

        <div>
          <InputComponent
            :disabled="isLoading"
            v-model="emailInput"
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="Enter Email"
            autocomplete="email"
            required
            :error="emailError"
            @focus="emailError = ''"
          />
        </div>
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

        <div class="flex flex-col gap-4">
          <ButtonComponent :loading="isLoading" type="submit" block> Sign Up </ButtonComponent>
          <div class="flex items-center pt-2">
            <hr class="w-full">
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <span class="bg-white px-6 text-gray-900 whitespace-nowrap">Or continue with</span>
            </div>
            <hr class="w-full">
          </div>
          <ButtonComponent :loading="isLoading" appearance="secondary" block>
            Sign Up With Google
            <template #prepend>
              <IconBase>
                <GoogleIcon />
              </IconBase>
            </template>
          </ButtonComponent>
        </div>
      </form>

      <p class="mt-4 sm:mt-10 text-sm leading-6 text-content-secondary text-center">
        {{ t('auth.HaveAccountText') }}
        <NuxtLink
          to="/auth/login"
          class="font-semibold text-global-blue-500 hover:text-global-blue-600"
          >{{ t('auth.LoginHeader') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
