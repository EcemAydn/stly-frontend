<script setup>
import { useAuthStore } from '@/stores/auth/auth';
import CheckIcon from '@/components/icons/CheckIcon.vue';

const authStore = useAuthStore();
definePageMeta({
  layout: 'blank',
})

onMounted(() => {
  const queryCode = window.location.search.replace('?c=', '');
  authStore.verifyEmail({
    code: queryCode,
  })
})
</script>
<template>
  <div class="w-full h-full flex items-center justify-center">
    <CardComponent border="secondary" size="large">
      <div class="flex flex-col items-center gap-12 pb-12">
        <div class="relative">
          <img src="../assets/img/confetti.png" />
          <div class="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex flex-col gap-4 items-center">

              <div class=" bg-non-contextual-green-muted text-non-contextual-green-default p-8 rounded-full">
                <IconBase class="w-10 h-10" viewBox="0 0 21 19">
                  <CheckIcon />
                </IconBase>
              </div>
              <div>Your email adress has been verified!</div>
            </div>
          </div>
        </div>
        <NuxtLink to="/profile" class="w-full p-4">
          <ButtonComponent block text="OK" appearance="secondary" @click="test" />
        </NuxtLink>
      </div>
    </CardComponent>
  </div>
</template>