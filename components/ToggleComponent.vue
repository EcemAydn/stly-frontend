<script setup>
import { cva } from "class-variance-authority";

const button = cva(
  [
    "border border-transparent focus-within:border ease-in-out transition duration-300 focus-within:border-interaction-inverted-normal focus-within:ring-2 disabled:bg-interaction-disabled-normal/50 w-9 p-[2px] rounded-[100px] flex",
  ],
  {
    variants: {
      size: {
        small: "w-[28px]",
        large: "w-9",
      },
      checked: {
        true: "flex justify-end bg-interaction-default-normal hover:bg-interaction-default-hover active:bg-interaction-default-active",
        false:
          "bg-interaction-disabled-normal hover:bg-interaction-disabled-hover active:bg-interaction-disabled-active",
      },
    },
  }
);
const input = cva(["text-xs disabled:text-content-secondary text-center"], {
  variants: {
    isError: {
      true: "text-content-negative",
      false: "text-content-secondary",
    },

    size: {
      small: "pl-3",
      normal: "pl-6",
    },
  },
});

defineProps({
  label: {
    type: String,
  },
  helper: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "large",
    validation(val) {
      return ["small", "large"].includes(val.toLowercase());
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  checked: {
    type: String,
    default: "false",
  },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="flex flex-col w-fit">
    <div class="flex items-center">
      <button
        type="button"
        @click="$emit('update:modelValue', !modelValue)"
        :disabled="disabled"
        :class="button({ size, checked: modelValue })"
      >
        <!-- :class="button({ size, checked === true
          ? 'flex justify-end bg-interaction-default-normal hover:bg-interaction-default-hover active:bg-interaction-default-active'
          : 'bg-interaction-disabled-normal hover:bg-interaction-disabled-hover active:bg-interaction-disabled-active ' })"
    > -->
        <div
          :disabled="disabled"
          class="rounded-full ease-in-out transition duration-500 bg-interaction-inverted-normal border border-border-default-alpha shadow-bottom-100"
          :class="size === 'large' ? 'w-4 h-4' : 'w-3 h-3'"
        ></div>
      </button>
      <label
        v-if="label"
        :disabled="disabled"
        class="pl-2 text-sm text-content-primary disabled:text-content-primary/50"
        >{{ label }}</label
      >
    </div>
    <div
      v-if="(helper || error) && label"
      :disabled="disabled"
      :class="
        input({ size: size === 'small' ? 'small' : 'normal', isError: !!error })
      "
    >
      {{ error || helper }}
    </div>
  </div>
</template>
