<script setup>
import { cva } from "class-variance-authority";

const input = cva(["flex items-center gap-1 text-xs"], {
  variants: {
    isError: {
      true: "text-content-negative",
      false: "text-content-secondary",
    },
  },
});
defineProps({
  type: {
    type: String,
  },
  label: {
    type: String,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  helper: {
    type: String,
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<!-- 
    * proplar:
    * Error-message: varsa error yap dizaynı
    * Info: altta yazı olcak.

 -->

<template>
  <div class="flex flex-col gap-2 select-none">
    <label
      v-if="label"
      class="text-sm font-medium leading-6"
      :class="disabled ? 'text-content-primary/50' : 'text-content-primary'"
      >{{ label }}</label
    >
    <div
      class="flex gap-2 transition-all ease-in-out duration-300 items-center border bg-interaction-background-form-field py-2 px-4 w-full rounded-md focus-within:ring-1 focus-within:border-interaction-default-normal focus-within:ring-interaction-default-normal"
      :class="
        error
          ? 'border-interaction-border-alert'
          : 'border-interaction-border-neutral-normal' +
            (!disabled
              ? ' hover:border-interaction-border-hover text-content-primary'
              : 'disabled:border-interaction-border-neutral-normal text-content-primary/50')
      "
    >
      <slot name="prepend"></slot>
      <input
        class="w-full outline-none bg-transparent text-sm"
        :disabled="disabled"
        v-bind="$attrs"
        :type="type"
        @input="(e) => $emit('update:modelValue', e.target.value)"
        :value="modelValue"
      />
      <slot name="append"></slot>
    </div>
    <div
      v-if="helper || error"
      :disabled="disabled"
      :class="input({ isError: !!error })"
    >
      {{ error || helper }}
    </div>
  </div>
</template>
