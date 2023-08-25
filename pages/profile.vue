<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import { useStorageStore } from '@/stores/storage/storage';
import { useI18n } from 'vue-i18n';
import MailIcon from '@/components/icons/MailIcon.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';

definePageMeta({
  middleware: ['authenticated-middleware'],
  defaultScale: 'mini',
  scalable: false,
  extra: true,
});

const authStore = useAuthStore();
const alertStore = useAlertStore();
const storageStore = useStorageStore();
const { t } = useI18n();

const passwordLoading = ref(false);
const updateLoading = ref(false);
const verifyLoading = ref(false);
const uploading = ref(false);
const logoutSessions = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


async function updateUser() {
  updateLoading.value = true;
  try {
    await authStore.update({
      id: authStore.currentUser.id,
      first_name: authStore.currentUser.first_name,
      last_name: authStore.currentUser.last_name,
    });
    alertStore.addAlert({ 
      title: 'Successfully updated your profile', 
      type: 'success' 
    });
  } catch (error) {
    console.log(error);
    alertStore.addAlert({
      title: 'Failed to update your profile',
      type: 'negative'
    });

  } finally {
    updateLoading.value = false;
  }
}

async function changePassword() {
  passwordLoading.value = true;
  try {

    if (newPassword.value !== confirmPassword.value) {
      alertStore.addAlert({
        title: 'Passwords do not match',
        type: 'negative'
      });
      return;
    }
    
    await authStore.changePassword({
      old_password: currentPassword.value,
      password: newPassword.value,
      end_all_sessions: logoutSessions.value,
      confirmPassword: confirmPassword.value
    });
    alertStore.addAlert({ 
      title: 'Successfully updated your password', 
      type: 'success' 
    });
  } catch (err) {
    alertStore.addAlert({
      title: err.error,
      type: 'negative'
    });
  } finally {
    passwordLoading.value = false;
  }
}

function verifyEmail() {
  verifyLoading.value = true;
  try {
    authStore.sentVerifyEmail();
    alertStore.addAlert({
    title: 'Email verification sent. Please check your email.',
    type: 'success'
  })  
  } catch (err) {
    console.log(err);
    alertStore.addAlert({
      title: 'Failed to verify email',
      type: 'negative'
    })
  } finally {
    verifyLoading.value = false;
  }
}

async function handleFileSelection(files) {
  files = files.value;
  const file = files && files.length > 0 ? files[0] : null;
  uploading.value = true;
  
  if (file) {
    const formData = new FormData();
    formData.append('user_id', authStore.currentUser.id);
    formData.append('image[]', file, 'deneme.png');

    try {
      await storageStore.createMedia(formData);
      alertStore.addAlert({
        title: 'Successfully uploaded image',
        type: 'success'
      })
      uploading.value = false;
    } catch (error) {
      console.error('Görsel yüklenirken hata:', error);
      alertStore.addAlert({
        title: 'Failed to upload image',
        type: 'negative'
      });
      uploading.value = false;

    } finally {
      uploading.value = false;
    }
  }
}



</script>

<template>
  <div class="flex pb-12 flex-col gap-4 max-w-5xl mx-auto px-4 w-full">
    <!-- header -->
    <HeaderComponent size="large" :title="t('profile.Account')" />
    <CardComponent border="secondary" size="full" class="py-6 md:py-4 px-6 md:px-12">
      <div class="grid gap-8">

        <!-- profile -->
        <form @submit.prevent="updateUser" class="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b-2 pt-2 border-border-default-alpha pb-8 pr-4">
          <HeaderComponent :title="t('profile.Profile Settings')" :description="t('profile.careful what you share')" />
          <CardComponent  size="full" class="md:p-4">
            <div class="grid gap-4 w-full">
              <InlineBanner v-if="authStore.currentUser.email_verified === false" type="negative" class="w-full" :title="t('profile.EmailNotVerified')" :description="t('profile.EmailNotVerifiedDesc')">
                <template #action>
                  <ButtonComponent :loading="verifyLoading" variant="ghost" intent="destructive" :text="t('profile.Verify')" @click="verifyEmail" />
                </template>
                <template #icon>
                  <IconBase class="text-global-red-500">
                    <MailIcon />
                  </IconBase>
                </template>
              </InlineBanner>
              <div class="flex flex-col gap-2 items-start">
                <label class="text-sm font-medium">{{ t('profile.Profile Picture')}}</label>
                <div class="flex gap-2">
                  <img :src="authStore.currentUser.picture" class="rounded-md max-w-[100px]" />
                  <div class="flex flex-col ">
                    <label class="text-sm pt-1 text-content-secondary dark:text-content-inverted-secondary">{{ t('profile.ChangeProfilePicture') }}</label>
                    <FileUploader
                      button
                      :loading="uploading"
                      helper=".jpg .jpeg .png .gif .webp"
                      accept=".jpg, .jpeg, .png, .gif, .webp"
                      inverted
                      @update:modelValue="handleFileSelection"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div class="mt-2">
                  <InputComponent
                    :label="t('profile.FirstName')"
                    id="name"
                    name="name"
                    autocomplete="name"
                    v-model="authStore.currentUser.first_name"
                    required
                  />
                </div>
              </div>
              <div>
                <div class="mt-2">
                  <InputComponent
                    :label="$t('profile.LastName')"
                    id="lastname"
                    name="lastname"
                    autocomplete="lastname"
                    v-model="authStore.currentUser.last_name"
                    required
                  />
                </div>
              </div>
              <div>
                <div class="mt-2">
                  <InputComponent
                    :label="$t('profile.Email')"
                    :helper="$t('profile.not changing email address')"
                    id="email"
                    name="email"
                    autocomplete="email"
                    v-model="authStore.currentUser.email"
                    disabled
                  >
                    <template #prepend>
                      <IconBase>
                        <MailIcon />
                      </IconBase>
                    </template>
                    <template #append>
                      <AvatarComp v-if="authStore.currentUser.email_verified === true" size="small" radius="full" color="green">
                        <template #icon>
                          <IconBase class="w-4 h-4" viewBox="0 0 21 19">
                            <CheckIcon />
                          </IconBase>
                        </template>
                      </AvatarComp>
                    </template>
                  </InputComponent>
                </div>
              </div>
            
              <!-- <div class="flex gap-4 flex-col "> -->
                <!-- <img :src="authStore.currentUser.picture" alt="Avatar" class="rounded-3xl w-36 md:w-48 h-36 opacity-90 mt-6" /> -->
                <!-- <ButtonComponent variant="ghost" size="small" :text="$t('form.UploadPicture')" /> -->
                <!-- <AvatarComp :avatarText="authStore.currentUser.full_name" ></AvatarComp>
              </div> -->
            </div>
      
            <div class="flex justify-end mt-4 gap-2">
              <ButtonComponent :loading="updateLoading" :text="$t('profile.Save Changes')" type="submit" />
            </div>
          </CardComponent>
        </form>

        <!-- password -->
        <form @submit.prevent="changePassword" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HeaderComponent :title="t('profile.Password Settings')" :description="t('profile.careful what you share')" />
          <CardComponent size="full" class="p-4">
            
            <div class="flex flex-col gap-4 py-4">
              <div class="mt-2">
                <InputComponent
                  :disabled="isLoading"
                  v-model="currentPassword"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  autocomplete="current-password"
                  :label="t('profile.Current Password')"
                  required
                />
              </div>
              <div class="mt-2">
                <InputComponent
                  :disabled="isLoading"
                  v-model="newPassword"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Pasword"
                  autocomplete="current-password"
                  :label="t('profile.New Password')"
                  required
                />
              </div>
              <div>
                <InputComponent
                  :disabled="isLoading"
                  v-model="confirmPassword"
                  id="confirm-password"
                  name="confirm-password"
                  :label="t('profile.Confirm Password')"
                  placeholder="Confirm Your Password"
                  type="password"
                  autocomplete="confirm-password"
                  required
                />
              </div>
              <CheckboxComponent :label="t('profile.Logout of all sessions')" v-model="logoutSessions" />
              <div class="flex justify-end  gap-2">
                <ButtonComponent :loading="passwordLoading" :text="t('profile.Change Password')" type="submit" />
              </div>
            </div>
          </CardComponent>
        </form>

      </div>
    </CardComponent>

  </div>
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
