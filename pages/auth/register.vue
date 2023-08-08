<script setup>
import { ref } from 'vue';
import themeConfig from '@/themeConfig';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth/auth'
import { useRouter } from 'vue-router';

definePageMeta({
  layout: "blank",
  name: "Register",
  isAuth: true,
});

const { t } = useI18n();
const isLoading = ref(false);
const error = ref('');
const emailInput = ref('');
const emailError = ref('');
const passwordInput = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmPasswordError = ref('');
const fullNameInput = ref('');
const fullNameError = ref('');

const router = useRouter();
const authStore = useAuthStore();

async function onSubmit() {
  const nameParts = fullNameInput.value.split(' ');
  
  if (nameParts.length < 2) {
    fullNameError.value = 'Full name should contain a first and last name, separated by a space!';
    return;
  }

  const [given_name, family_name] = nameParts;
  try {

    const nameRegEx = /^[A-Za-z\s]+$/;
    if (!nameRegEx.test(given_name) || !nameRegEx.test(family_name)) {
      fullNameError.value = 'Name should only contain alphabetic characters!';
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
    await authStore.register(given_name, family_name, emailInput.value, passwordInput.value, confirmPassword.value); 
    isLoading.value = false;
    router.push('/');
  } catch (err) {
    if (err.errors) {
      const { errors } = err;

      // eslint-disable-next-line no-shadow
      errors.forEach((error) => {
        if (error.path === 'given_name' || error.path === 'last_name') {
          fullNameError.value = error.msg;
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
    } else {
      console.log('arda')
    }

    isLoading.value = false;
  }
}

</script>
<template>
  <div class="flex min-h-full w-full overflow-x-auto pb-20 sm:!pb-0 sm:!overflow-hidden">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:!px-6 lg:!flex-none lg:!px-20 xl:!px-60"
    >
    <InlineBanner v-if="error" type="negative" title="Error" :description="error"></InlineBanner>
    <div class="mx-auto w-full max-w-sm lg:!w-96">
        <div>
          <img class="mx-auto h-12 w-auto mb-12" :src="themeConfig.logo" :alt="themeConfig.logoText" />
          <h2
            class="mt-8 text-3xl font-semibold leading-9 tracking-wide text-content-primary"
          >
            {{ t('auth.RegisterHeader') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-content-secondary">
            {{ t('auth.HaveAccountText') }}
            <RouterLink
              to="/auth/login"
              class="font-semibold text-global-blue-500 hover:text-global-blue-600"
              >{{ t('auth.LoginHeader') }}</RouterLink
            >
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form @submit.prevent="onSubmit" class="space-y-6">
              <div>
                <InputComponent
                  :disabled="isLoading"
                  v-model="fullNameInput"
                  id="fullName"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  autocomplete="name"
                  required
                  :error="fullNameError"
                  @focus="fullNameError = ''"
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

              <div>
                <ButtonComponent :loading="isLoading" type="submit" block> Sign Up </ButtonComponent>
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
stores/auth/tsstores/auth/ts