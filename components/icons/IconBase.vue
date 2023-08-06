<script setup>
defineProps({
  width: {
    type: Number,
    default: 20,
  },

  height: {
    type: Number,
    default: 20,
  },
});
</script>

<template>
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    fill="currentColor"
  >
    <slot />
  </svg>
</template>
