<script setup>
import { ref } from "vue";
import { cva } from "class-variance-authority";

const check = ref(true);
const minus = ref(false);
const button = cva(
  [
    "flex justify-center items-center rounded h-4 w-4 focus:ring-2 focus:border focus:border-interaction-inverted-normal",
  ],
  {
    variants: {
      checked: {
        true: "text-white bg-interaction-default-normal hover:bg-interaction-default-hover disabled:bg-interaction-default-normal/50",
        false:
          "bg-interaction-background-form-field border-2 border-interaction-border-neutral-normal hover:border-interaction-border-hover disabled:border-interaction-border-neutral-normal/50",
      },
      isError: {
        true: "border-content-negative",
        false: "",
      },
    },
  }
);

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  modelValue: {
    type: [String, Number, Boolean, Array],
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
  <div
    class="flex items-center"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <button
      type="button"
      :disabled="disabled"
      :class="button({ checked: modelValue, isError: !!error })"
    >
      <IconBase class="text-interaction-inverted-normal">
        <CheckSmall v-if="check" />
        <MinusIcon v-if="minus" />
      </IconBase>
    </button>

    <input v-bind="$attrs" type="checkbox" class="hidden" />

    <label
      v-if="label || $slots['label']"
      class="pl-2 text-sm"
      :class="disabled ? 'text-content-primary/50' : 'text-content-primary'"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>
