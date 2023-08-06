<script setup>
import OceanModal from '@/components/modal/OceanModal.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';

defineProps({
  size: {
    type: String,
    default: 'xlarge',
  }
})
defineEmits(['closeModal']);

</script>
<template>
  <OceanModal :size="size">
    <form class="w-full">
      <div class="flex justify-end">
        <IconBase @click="$emit('closeModal')">
          <CloseIcon />
        </IconBase>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div></div>
        <div>turan</div>
      </div>
    </form>
  </OceanModal>
</template>