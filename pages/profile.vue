<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  isLoading.value = false;
});
</script>

<template>
  <div v-if="!isLoading" class="w-full">
    <CardComponent border="secondary" size="full" class="p-12">
      <div class="flex flex-wrap gap-8">
        <div class="text-2xl">{{ $t('form.Profile') }}</div>
        <div class="flex gap-20 w-full justify-between">

          <div class="col-span-2 grid gap-4 w-full">
            <div>
              <div class="mt-2">
                <InputComponent
                  :label="$t('form.DisplayName')"
                  id="name"
                  name="name"
                  autocomplete="name"
                  required
                />
              </div>
            </div>
            <div>
              <div class="mt-2">
                <InputComponent
                  :label="$t('form.LastName')"
                  id="lastname"
                  name="lastname"
                  autocomplete="lastname"
                  required
                />
              </div>
            </div>
            <div>
              <div class="mt-2">
                <InputComponent
                :label="$t('form.Email')"
                  :helper="$t('form.ChangeEmail')"
                  disabled
                >
                <template #prepend>
                  <IconBase>
                    <MailIcon />
                  </IconBase>
                </template>
              </InputComponent>
              </div>
            </div>
          </div>
          <div class="flex gap-4 flex-col ">
            <img src="https://i.pravatar.cc" alt="Avatar" class="rounded-3xl w-48 h-40 opacity-90 mt-6" />
            <ButtonComponent variant="ghost" size="small" :text="$t('form.UploadPicture')" />
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4 gap-2">
        <ButtonComponent :text="$t('form.SaveChanges')" @click="updateUser" />
      </div>
    </CardComponent>
  </div>

  <div v-else class="overlay">
    <lottie-player autoplay loop mode="normal" src="/loading.json" class="w-[320px] md:!w-[450px]" />
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
