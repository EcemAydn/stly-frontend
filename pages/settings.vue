<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const language = ref('en');
const notificationEnabled = ref(true);
const themeMod = ref(false);

</script>

<template>
<div class="">
    <CardComponent border="secondary" size="full" class="p-12">
      <div class="flex flex-wrap gap-8">
        <div class="text-2xl">{{ $t('form.Settings') }}</div>
        
        <div class="col-span-2 grid gap-4 w-full">
          <div>
            <InputComponent
              :disabled="isLoading"
              v-model="passwordInput"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Pasword"
              autocomplete="current-password"
              label="Current Password"
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
              label="New Password"
              placeholder="Confirm Your Password"
              type="password"
              autocomplete="confirm-password"
              required
              :error="confirmPasswordError"
              @focus="confirmPasswordError = ''"
            />
          </div>
          <div>
            <div class="mt-2">
              <SelectComponent
                v-model="language"
                label="Language"
                id="language"
                name="language"
                :items="[{ value: 'en', text: 'English' }, { value: 'tr', text: 'Turkish' }]"
              >
          
              </SelectComponent>
            </div>
          </div>
          <div>
            <div class="mt-2">
            <ToggleComponent label="I want to receive email notifications" v-model="notificationEnabled" />
            </div>
          </div>
          <div>
            <div class="mt-2">
            <ToggleComponent label="Dark Mode" v-model="themeMod" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4 gap-2">
        <ButtonComponent intent="destructive" text="Delete Account"  />
        <ButtonComponent intent="destructive" appearance="secondary" text="Logout"  />
        <ButtonComponent text="Save changes"  />
      </div>
    </CardComponent>
  </div>
</template>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blur-effect {
  filter: blur(2px);
}
</style>
