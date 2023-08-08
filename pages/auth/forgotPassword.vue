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
  <div class="flex min-h-full w-full">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-60"
    >
      <InlineBanner v-if="error" type="negative" title="Error" :description="error"></InlineBanner>
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2
            class="mt-8 text-3xl font-semibold leading-9 tracking-wide text-content-primary"
          >
            Forgot your password?
          </h2>
          <p class="mt-2 text-sm leading-6 text-content-secondary">
            Not a member?
            <RouterLink
              to="/auth/register"
              class="font-semibold text-global-blue-500 hover:text-global-blue-600"
              >Get Started</RouterLink
            >
          </p>
        </div>

        <div class="mt-10">
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
                <ButtonComponent type="submit" :loading="isLoading" block> Send Mail </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden flex-1 lg:block w-full h-full">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>
