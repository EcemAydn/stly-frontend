<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import TabsComponent from '@/components/TabsComponent.vue';
import LayerTwoIcon from '@/components/icons/LayerTwoIcon.vue';
import OceanModal from '@/components/modal/OceanModal.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';

const selectedHeader = ref('MONTHLY');
const showModal = ref(false);


</script>
<template>
  <div>
    <HeaderComponent size="large" title="Plans" description="Start small and scale up as you need" />
      
    <div class="flex flex-wrap gap-4 justify-center">
      <CardComponent
        class="h-full"
        size="xxsmall"
        line 
        v-for="i in 3"
        :key="i"
      >
        <template #title>
          <div class="flex items-center whitespace-nowrap" :class="selectedHeader === 'MONTHLY' ? 'gap-4' : 'gap-1'">
            Plan {{ i }}
            <BadgeComponent  class="font-normal text-xs" color="blue" badge-text="Your Plan" />
          </div>
        </template>
        <div class="flex flex-col gap-4 text-content-tertiary p-6">
          <div class="text-sm">Start exploring now and find out if it's the perfect fit for you.</div>
          <div class="flex items-end gap-2">
            <div class="text-3xl font-semibold">$10</div>
            <div class="text-md pb-1 text-content-tertiary">/month</div>
          </div>
          <div class="text-md"> Standart</div>
          <div class="flex items-center gap-1">
            <div class="text-md"> <b>100</b> credits/month</div>
          </div>
          <div class="flex gap-2">
            <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
              <CheckIcon />
            </IconBase>
            <div class="text-xs">Write your articles with Article Writing Tools</div>
          </div>
          <div class="flex gap-2">
            <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
              <CheckIcon />
            </IconBase>
            <div class="text-xs">Text to Image Generation</div>
          </div>
          <div class="flex gap-2">
            <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
              <CheckIcon />
            </IconBase>
            <div class="text-xs">Create CEO friendly advertisement for several platforms</div>
          </div>
          <div class="flex gap-2">
            <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
              <CheckIcon />
            </IconBase>
            <div class="text-xs">Make your videos with guidance of Video Timeline Tool</div>
          </div>
          <div class="flex gap-2">
            <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
              <CheckIcon />
            </IconBase>
            <div class="text-xs">Make your time consuming contents with ease</div>
          </div>
          <div class="flex gap-2">
            <IconBase :width="18" :height="18" viewBox="0 0 21 19" class="text-blue-500">
              <CheckIcon />
            </IconBase>
            <div class="text-xs">Create your content in 11 LANGUAGES</div>
          </div>
        </div>

        <template #action>
          <ButtonComponent 
            block
            class="mt-2"
            size="small"
            text="Select"
            @click="showModal = true"
          />
        </template>
        
        <template #prepend>
          <AvatarComp color="blue" radius="full">
            <template #icon>
              <IconBase>
                <LayerTwoIcon />
              </IconBase>
            </template>
          </AvatarComp>
        </template>
      </CardComponent>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <OceanModal size="xlarge" v-if="showModal" class="modal">
        <form class="w-full text-sm">
          <div class="flex justify-end">
            <IconBase @click="showModal = false">
              <CloseIcon />
            </IconBase>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="border border-gray-100 rounded-md p-2">
              arda
            </div>
            <div class="p-2">turan</div>
          </div>
        </form>
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
}
</style>