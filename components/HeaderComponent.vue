<script setup>
import { cva } from "class-variance-authority";

const titleSize = cva(["text-content-primary dark:text-content-inverted-primary font-semibold"], {
  variants: {
    size: {
      small: "text-lg",
      medium: "text-xl",
      large: "text-2xl",
    },
  },
});
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  size: {
    type: String,
    default: "small",
    validator(value) {
      return ["small", "medium", "large"].includes(value.toLocaleLowerCase());
    },
  },
});
</script>
<template>
  <div>
    <div
      class="py-4 w-full flex items-center justify-between text-content-primary dark:text-content-inverted-primary"
      :class="$slots['toolbar'] ? 'border-b border-border-default' : ''"
    >
      <div class="flex items-center gap-2">
        <slot name="prepend"></slot>
        <div>
          <div :class="titleSize({ size })">
            {{ title }}
          </div>
          <div
            v-if="description"
            class="text-content-secondary dark:text-content-inverted-secondary pt-2"
            :class="
              size === 'small'
                ? 'text-sm'
                : size === 'medium'
                ? 'text-sm'
                : 'text-base'
            "
          >
            {{ description }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <slot name="actions"></slot>
      </div>
    </div>
    <div
      v-if="$slots['toolbar']"
      class="px-6 py-4 w-full flex gap-2 items-center bg-background-default dark:bg-background-inverted border-b border-border-default"
    >
      <slot name="toolbar"></slot>
    </div>
  </div>
</template>
