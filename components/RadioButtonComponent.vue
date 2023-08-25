<script setup>
import { cva } from "class-variance-authority";

const button = cva(
  [
    "flex justify-center items-center rounded-full h-4 w-4 focus:ring-2 focus:border focus:border-interaction-inverted-normal",
  ],
  {
    variants: {
      checked: {
        true: "text-white bg-interaction-default-normal hover:bg-interaction-default-hover disabled:bg-interaction-default-normal/50",
        false:
          "bg-interaction-background-form-field dark:bg-interaction-background-inverted-modeless border-2 border-interaction-border-neutral-normal hover:border-interaction-border-hover disabled:border-interaction-border-neutral-normal/50",
      },
      isError: {
        true: "border-content-negative",
        false: "",
      },
    },
  }
);

defineProps({
  color: {
    type: String,
    default: "checkedFalse",
  },
  name: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="flex items-center">
    <button
      type="button"
      @click="$emit('update:modelValue', !modelValue)"
      :disabled="disabled"
      :class="button({ checked: modelValue, isError: !!error })"
    >
      <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
    </button>
    <input
      v-bind="$attrs"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      type="radio"
      class="hidden"
      :value="modelValue"
    />
    <label
      v-if="label"
      :disabled="disabled"
      class="pl-2 text-sm text-content-primary dark:text-content-inverted-primary disabled:text-content-primary dark:text-content-inverted-primary/50"
      >{{ label }}</label
    >
  </div>
</template>
