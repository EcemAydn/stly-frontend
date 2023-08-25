<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import OceanModal from '@/components/modal/OceanModal.vue';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const alertStore = useAlertStore();
const { t } = useI18n();

const router = useRouter();
const language = ref('en');
const notificationEnabled = ref(authStore.currentUser.receive_emails);
const themeMod = ref(false);
const isLoading = ref(false);
const showModal = ref(false);

definePageMeta({
  middleware: ['authenticated-middleware'],
  defaultScale: 'mini',
  scalable: false,
  extra: true,
});

async function deleteFunction(){
  deleteLoading.value = true;
  try {
    if(passwordInput.value !== confirmPasswordInput.value){
      alertStore.addAlert({
        title: 'Passwords do not match',
        type: 'negative'
      })
    }
    await authStore.deleteAccount({
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value
    });
    alertStore.addAlert({ 
      title: 'Successfully deleted your account', 
      type: 'success'
    });
    router.push('/login');
  } catch (err) {
    alertStore.addAlert({
      title: err.error,
      type: 'negative'
    })
  } finally {
    deleteLoading.value = false;
  }
}

// notificationEnabled
watch(notificationEnabled, async (newValue) => {
    await authStore.update({
      receive_emails: newValue ? true : '0',
    })
    alertStore.addAlert({
      title: 'Successfully!',
      type: 'success'
    })
})

</script>

<template>
  <div class="flex pb-12 flex-col gap-4 max-w-5xl mx-auto px-4 w-full">
    <!-- header -->
    <HeaderComponent size="large" :title="t('settings.Settings')" />
    <CardComponent border="secondary" size="full" class="py-6 md:py-4 px-6 md:px-12">
      <div class="grid gap-8">
        <!-- Reminders -->
        <div class="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-border-default-alpha gap-8 pb-8">
          <HeaderComponent :title="t('settings.Reminders')" :description="t('settings.notifications to remind')" />
          <CardComponent size="full" class="md:p-4">
            <div class="py-4 flex lg:justify-end">
              <ToggleComponent :label="t('settings.receive email')" v-model="notificationEnabled" />
            </div>
          </CardComponent>
        </div>

        <!-- Delete Account -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
          <HeaderComponent :title="t('settings.Danger Zone')" :description="t('settings.cannot be reversed')" />
          <CardComponent size="full" class="md:p-4">
            <div class="py-4 flex justify-end">
                <ButtonComponent :loading="isLoading" appearance="secondary" intent="destructive" :text="t('settings.Delete Your Account')" @click="showModal = true" />
            </div>
          </CardComponent>
        </div>
      </div>
    </CardComponent>

  </div>
  <Teleport to="body">
    <Transition name="fade">
      <OceanModal size="medium" v-if="showModal" @closeModal="showModal = false" class="w-full modal">
        <div class="flex flex-col p-8 gap-4">
          <InlineBanner
            size="small"
            type="warning"
            :title= "t('settings.Password Required')"
            :description="t('settings.identity and security')"
          />
          <div class="mt-2">
            <InputComponent
              :disabled="isLoading"
              v-model="passwordInput"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Pasword"
              autocomplete="current-password"
              :label="t('settings.Password')"
              required
            />
          </div>
          <div class="mt-2">
            <InputComponent
              :disabled="isLoading"
              v-model="confirmPasswordInput"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Pasword"
              autocomplete="current-password"
              :label="t('settings.Confirm Password')"
              required
            />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <ButtonComponent :loading="deleteLoading" intent="destructive" :text="t('settings.Delete Account')" @click="deleteFunction" />
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
