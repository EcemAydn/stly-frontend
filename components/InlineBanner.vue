<script setup>
import { cva } from "class-variance-authority";
import { ref } from "vue";
import NeutralInfo from '@/components/icons/NeutralInfo.vue';
import InformativeIcon from '@/components/icons/InformativeIcon.vue';
import PositiveIcon from '@/components/icons/PositiveIcon.vue';
import WarningInfo from '@/components/icons/WarningInfo.vue';
import NegativeIcon from '@/components/icons/NegativeIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';

const isOpen = ref(true);
const banner = cva(["border w-full p-5 rounded-md"], {
  variants: {
    type: {
      neutral:
        "bg-background-subtle-neutral border-border-subtle-neutral text-content-primary",
      informative:
        "bg-background-subtle-informative border-border-subtle-informative text-content-primary",
      success:
        "bg-background-subtle-positive border-border-subtle-positive text-content-primary",
      warning:
        "bg-background-subtle-warning border-border-subtle-warning text-content-primary",
      negative:
        "bg-background-subtle-negative border-border-subtle-negative text-content-primary",
      special:
        "bg-background-subtle-informative border-border-subtle-informative text-blue-600",
    },
    size: {
      small: "text-sm",
      medium: "text-md",
      large: "text-lg",
    },
  },
});
defineProps({
  type: {
    type: String,
    default: "neutral",
    validator(value) {
      return [
        "neutral",
        "informative",
        "success",
        "warning",
        "negative",
        "special",
      ].includes(value.toLocaleLowerCase());
    },
  },
  size: {
    type: String,
    default: "small",
    validator(value) {
      return ["small", "medium", "large"].includes(value.toLocaleLowerCase());
    },
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  close: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div :class="banner({ type, size })" v-show="isOpen">
    <div class="flex items-center justify-between font-semibold">
      <div class="flex items-center gap-4">
        <slot name="icon">
          <IconBase>
            <NeutralInfo v-if="type === 'neutral'" />
            <InformativeIcon v-if="type === 'informative'" />
            <PositiveIcon v-if="type === 'success'" />
            <WarningInfo v-if="type === 'warning'" />
            <NegativeIcon v-if="type === 'negative'" />
          </IconBase>
        </slot>
        {{ title }}
      </div>
      <button type="button" @click="isOpen = false">
        <IconBase v-if="close">
          <CloseIcon />
        </IconBase>
      </button>
    </div>
    <div
      class="px-9"
      :class="
        size === 'small'
          ? 'text-xs'
          : size === 'medium'
          ? 'text-sm'
          : 'text-md' + type === 'special'
          ? 'text-blue-600/70'
          : 'text-content-primary dark:text-content-inverted-primary'
      "
    >
      {{ description }}
    </div>
    <div class="px-9" :class="$slots['action'] ? 'pt-4' : 'invisible'">
      <slot name="action" />
    </div>
  </div>
</template>
