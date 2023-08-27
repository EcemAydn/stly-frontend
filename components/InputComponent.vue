<script setup>
import { ref } from 'vue';
import { cva } from "class-variance-authority";

const input = cva(["flex items-center gap-1 text-xs"], {
  variants: {
    isError: {
      true: "text-content-negative",
      false: "text-content-secondary dark:text-content-inverted-secondary",
    },
  },
});

const inputTag = ref();

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
      :class="disabled ? 'text-content-primary dark:text-content-inverted-primary/50' : 'text-content-primary dark:text-content-inverted-primary'"
      >{{ label }}</label
    >
    <div
      @click="() => inputTag.focus()"
      class="flex gap-2 transition-all ease-in-out duration-300 items-center border bg-interaction-background-form-field dark:bg-interaction-background-inverted-modeless py-2 px-4 w-full rounded-md focus-within:ring-1 focus-within:border-interaction-default-normal focus-within:ring-interaction-default-normal cursor-text"
      :class="{
        'border-interaction-border-alert': error,
        'border-interaction-border-neutral-normal': !error,
        'dark:border-interaction-ghost-inverted-hover': !error,
        'hover:border-interaction-border-hover': !disabled,
        'dark:hover:border-interaction-border-hover': !disabled,
        'text-content-primary': !disabled,
        'dark:text-content-inverted-primary': !disabled,
        'disabled:border-red-500': disabled,
        'text-content-primary/50': disabled,
        'dark:text-content-inverted-primary/50': disabled
      }"
    >
      <slot name="prepend"></slot>
      <input
        ref="inputTag"
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
