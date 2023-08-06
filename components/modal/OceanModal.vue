<script setup>
const emit = defineEmits(['closeModal']);
function closeModalButton() {
  emit('closeModal');
}

defineProps({
  size: {
    type: String,
    default: 'large',
  }
})

</script>
<template>
  <div @click="closeModalButton" class="fixed inset-0 flex items-center justify-center backdrop-blur-md">
    <CardComponent border="secondary" @click.stop :size="size" class="p-4 w-full">
      <slot />
    </CardComponent>
  </div>
</template>