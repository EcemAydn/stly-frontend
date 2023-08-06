<script setup>
import { defineProps } from "vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-1 w-full items-center">
    <IconBase>
      <router-link to="/" class="text-action-neutral-normal">
        <HomeIcon></HomeIcon>
      </router-link>
    </IconBase>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center last:text-action-outline-active text-action-neutral-normal"
    >
      <IconBase>
        <ChevronRightSmall></ChevronRightSmall>
      </IconBase>
      <p class="text-sm">
        <router-link :to="item" class="text-sm">
          {{ item }}
        </router-link>
      </p>
    </div>
  </div>
</template>
