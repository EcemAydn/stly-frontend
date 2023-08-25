<script setup>
import { cva } from "class-variance-authority";

const card = cva(
  [
    "p-6 bg-interaction-background-modal border rounded-md shadow-bottom-400 flex flex-col gap-6",
  ],
  {
    variants: {
      size: {
        small: "max-w-md",
        medium: "max-w-xl",
        large: "max-w-4xl",
      },
    },
  }
);
defineProps({
  content: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "small",
  },
});
</script>
<template>
  <div :class="card({ size })">
    <div
      v-if="$slots['title'] || title"
      class="flex items-center justify-between"
    >
      <div
        class="text-content-primary dark:text-content-inverted-primary font-semibold text-lg leading-8 flex gap-4 items-center"
      >
        <slot name="titleIcon"></slot>
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <button
        type="button"
        @click="$emit('close')"
        class="text-action-neutral-normal"
      >
        <IconBase>
          <CloseIcon />
        </IconBase>
      </button>
    </div>
    <div
      v-if="$slots['content'] || content"
      class="text-content-secondary dark:text-content-inverted-secondary text-sm"
    >
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <div v-if="$slots['actions']" class="flex gap-4 w-full justify-end">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
