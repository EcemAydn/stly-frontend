<script setup>
import { cva } from "class-variance-authority";

const button = cva(
  [
    "transition-all ease-in-out duration-300 rounded-md flex items-center justify-center gap-2 tracking-[.013em] focus:ring focus:ring-offset-2 whitespace-nowrap flex-shrink-0 flex-grow-0",
  ],
  {
    variants: {
      block: {
        true: "w-full",
        false: "",
      },
      size: {
        small: "py-1 px-3 text-sm leading-6",
        medium: "py-2 px-4 text-sm leading-6",
        large: "py-2.5 px-4 leading-7",
      },
      variant: {
        default: [],
        ghost: [],
        bare: [],
      },
      apperance: {
        primary: [],
        secondary: [],
        inverted: [],
      },
      intent: {
        none: [],
        success: [],
        destructive: [],
      },
      icon: {
        true: [""],
        false: ["min-w-[100px] min-h-[32px]"],
      },

      loading: {
        true: "cursor-wait",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        appearance: "primary",
        intent: "none",
        class:
          "text-action-inverted-normal bg-action-primary-normal hover:bg-action-primary-hover active:bg-action-primary-active selected:bg-action-primary-selected disabled:bg-action-primary-normal disabled:opacity-50 loading:bg-action-primary-normal loading:opacity-50",
      },
      {
        variant: "default",
        appearance: "primary",
        intent: "success",
        class:
          "text-action-inverted-normal bg-action-success-normal hover:bg-action-success-hover active:bg-action-success-active selected:bg-action-success-selected disabled:bg-action-success-normal disabled:opacity-50 loading:bg-action-success-normal loading:opacity-50",
      },
      {
        variant: "default",
        appearance: "primary",
        intent: "destructive",
        class:
          "text-action-inverted-normal bg-action-destructive-normal hover:bg-action-destructive-hover active:bg-action-destructive-active selected:bg-action-destructive-selected disabled:bg-action-destructive-normal disabled:opacity-50 loading:bg-action-destructive-normal loading:opacity-50",
      },
      {
        variant: "default",
        appearance: "secondary",
        intent: "none",
        class:
          "border border-action-outline-normal text-action-neutral-normal bg-action-inverted-normal hover:text-action-neutral-hover hover:border-action-outline-hover active:text-action-neutral-active active:border-action-outline-active selected:text-action-neutral-selected selected:border-action-outline-selected disabled:text-action-neutral-normal disabled:border-action-outline-normal disabled:opacity-50 loading:text-action-neutral-normal loading:border-action-outline-normal loading:opacity-50",
      },
      {
        variant: "default",
        appearance: "secondary",
        intent: "success",
        class:
          "border border-action-outline-normal text-action-success-normal bg-action-inverted-normal hover:text-action-success-hover hover:border-action-outline-hover active:text-action-success-active active:border-action-outline-active selected:text-action-success-selected selected:border-action-outline-selected disabled:text-action-success-normal disabled:border-action-outline-normal disabled:opacity-50 loading:text-action-success-normal loading:border-action-outline-normal loading:opacity-50",
      },
      {
        variant: "default",
        appearance: "secondary",
        intent: "destructive",
        class:
          "border border-action-outline-normal text-action-destructive-normal bg-action-inverted-normal hover:text-action-destructive-hover hover:border-action-outline-hover active:text-action-destructive-active active:border-action-outline-active selected:text-action-destructive-selected selected:border-action-outline-selected disabled:text-action-destructive-normal disabled:border-action-outline-normal disabled:opacity-50 loading:text-action-destructive-normal loading:border-action-outline-normal loading:opacity-50",
      },
      {
        variant: "default",
        appearance: "inverted",
        intent: "none",
        class:
          "text-action-neutral-normal bg-action-inverted-normal hover:text-action-neutral-hover hover:bg-action-inverted-hover active:text-action-neutral-active active:bg-action-inverted-active selected:text-action-neutral-selected selected:bg-action-inverted-selected disabled:text-action-neutral-normal disabled:bg-action-inverted-normal disabled:opacity-50 loading:text-action-neutral-normal loading:bg-action-inverted-normal loading:opacity-50",
      },
      {
        variant: "ghost",
        appearance: "primary",
        intent: "none",
        class:
          "bg-action-ghost-normal text-action-primary-normal hover:text-action-primary-hover active:text-action-primary-active selected:text-action-primary-selected disabled:text-action-primary-normal disabled:opacity-50 loading:text-action-primary-normal hover:bg-action-ghost-hover active:bg-action-ghost-active selected:bg-action-ghost-selected disabled:bg-action-ghost-normal loading:bg-action-ghost-normal loading:opacity-50",
      },
      {
        variant: "ghost",
        appearance: "primary",
        intent: "success",
        class:
          "bg-action-ghost-normal text-action-success-normal hover:text-action-success-hover active:text-action-success-active selected:text-action-success-selected disabled:text-action-success-normal disabled:opacity-50 loading:text-action-success-normal hover:bg-action-ghost-hover active:bg-action-ghost-active selected:bg-action-ghost-selected disabled:bg-action-ghost-normal loading:bg-action-ghost-normal loading:opacity-50",
      },
      {
        variant: "ghost",
        appearance: "primary",
        intent: "destructive",
        class:
          "bg-action-ghost-normal text-action-destructive-normal hover:text-action-destructive-hover active:text-action-destructive-active selected:text-action-destructive-selected disabled:text-action-destructive-normal disabled:opacity-50 loading:text-action-destructive-normal hover:bg-action-ghost-hover active:bg-action-ghost-active selected:bg-action-ghost-selected disabled:bg-action-ghost-normal loading:bg-action-ghost-normal loading:opacity-50",
      },
      {
        variant: "ghost",
        appearance: "secondary",
        intent: "none",
        class:
          "bg-action-ghost-normal text-action-neutral-normal hover:text-action-neutral-hover active:text-action-neutral-active selected:text-action-neutral-selected disabled:text-action-neutral-normal disabled:opacity-50 loading:text-action-neutral-normal hover:bg-action-ghost-hover active:bg-action-ghost-active selected:bg-action-ghost-selected disabled:bg-action-ghost-normal loading:bg-action-ghost-normal loading:opacity-50",
      },
      {
        variant: "ghost",
        appearance: "inverted",
        intent: "none",
        class:
          "bg-action-ghost-normal text-action-inverted-normal hover:text-action-inverted-hover active:text-action-inverted-active selected:text-action-inverted-selected disabled:text-action-inverted-normal disabled:opacity-50 loading:text-action-inverted-normal hover:bg-action-ghost-inverted-hover active:bg-action-ghost-inverted-active selected:bg-action-ghost-inverted-selected disabled:bg-action-ghost-inverted-normal loading:bg-action-ghost-inverted-normal loading:opacity-50",
      },
      {
        variant: "ghost",
        appearance: "reverse inverted",
        intent: "none",
        class:
          "bg-action-ghost-normal text-action-reverse-inverted-normal hover:text-action-reverse-inverted-hover active:text-action-reverse-inverted-active selected:text-action-reverse-inverted-selected disabled:text-action-reverse-inverted-normal disabled:opacity-50 loading:text-action-reverse-inverted-normal hover:bg-action-ghost-hover active:bg-action-ghost-active selected:bg-action-ghost-selected disabled:bg-action-ghost-normal loading:bg-action-ghost-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "primary",
        intent: "none",
        class:
          "px-0 py-0 text-action-primary-normal hover:text-action-primary-hover active:text-action-primary-active selected:text-action-primary-selected disabled:text-action-primary-normal disabled:opacity-50 loading:text-action-primary-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "primary",
        intent: "success",
        class:
          "px-0 py-0 text-action-success-normal hover:text-action-success-hover active:text-action-success-active selected:text-action-success-selected disabled:text-action-success-normal disabled:opacity-50 loading:text-action-success-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "primary",
        intent: "none",
        class:
          "px-0 py-0 text-action-primary-normal hover:text-action-primary-hover active:text-action-primary-active selected:text-action-primary-selected disabled:text-action-primary-normal disabled:opacity-50 loading:text-action-primary-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "primary",
        intent: "destructive",
        class:
          "px-0 py-0 text-action-destructive-normal hover:text-action-destructive-hover active:text-action-destructive-active selected:text-action-destructive-selected disabled:text-action-destructive-normal disabled:opacity-50 loading:text-action-destructive-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "secondary",
        intent: "none",
        class:
          "px-0 py-0 text-action-neutral-normal hover:text-action-neutral-hover active:text-action-neutral-active selected:text-action-neutral-selected disabled:text-action-neutral-normal disabled:opacity-50 loading:text-action-neutral-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "inverted",
        intent: "none",
        class:
          "px-0 py-0 underline decoration-1 text-action-inverted-normal hover:text-action-inverted-hover active:text-action-inverted-active selected:text-action-inverted-selected disabled:text-action-inverted-normal disabled:opacity-50 loading:text-action-inverted-normal loading:opacity-50",
      },
      {
        variant: "bare",
        appearance: "reverse inverted",
        intent: "none",
        class:
          "px-0 py-0 underline decoration-1 text-action-reverse-inverted-normal hover:text-action-reverse-inverted-hover active:text-action-reverse-inverted-active selected:text-action-reverse-inverted-selected disabled:text-action-reverse-inverted-normal disabled:opacity-50 loading:text-action-reverse-inverted-normal loading:opacity-50",
      },
    ],
  }
);

defineProps({
  text: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  intent: {
    type: String,
    default: "none",
    validator(value) {
      return ["none", "success", "destructive"].includes(
        value.toLocaleLowerCase()
      );
    },
  },
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value.toLocaleLowerCase());
    },
  },
  appearance: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary", "inverted", "reverse inverted"].includes(
        value.toLocaleLowerCase()
      );
    },
  },
  variant: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "ghost", "bare"].includes(value.toLocaleLowerCase());
    },
  },
});
</script>
<template>
  <button
    :class="button({ intent, appearance, variant, size, block, loading, icon })"
    :type="type"
    :disabled="loading || disabled"
  >
    <slot v-if="!loading" name="prepend"></slot>

    <LoadingComponent
      v-else
      :theme="
        appearance === 'primary' && variant === 'default'
          ? 'dark'
          : 'light' +
            (variant !== 'default' && appearance === 'inverted' ? 'dark' : '')
      "
    />

    <slot>
      {{ text }}
    </slot>
    <slot name="append"></slot>
  </button>
</template>
