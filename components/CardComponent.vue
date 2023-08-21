<script setup>
import { cva } from "class-variance-authority";

const card = cva(["rounded-lg flex flex-col w-full whitespace-wrap"], {
  variants: {
    size: {
      fit: "w-fit",
      mini: "max-w-[250px] w-full",
      xxsmall: "max-w-[300px] w-full",
      xsmall: "max-w-xs w-full",
      small: "max-w-sm w-full",
      medium: "max-w-md w-full",
      large: "max-w-xl w-full",
      xlarge: "max-w-3xl w-full",
      xxlarge: "max-w-6xl w-full",
      full: "w-full",
    },
    border: {
      primary: "border-none",
      secondary: "border border-border-default-alpha shadow-bottom-200",
      tertiary: "border border-border-default-alpha",
    },
    radius: {
      none: "rounded-none",
      medium: "rounded-md",
      full: "rounded-full",
    },
    color: {
      primary: "bg-background-default",
      secondary: "bg-transparent",
      tertiary: "bg-[#ebeaff]",
      dark: "bg-[#101828]",
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
  content: {
    type: String,
  },
  showAction: {
    type: Boolean,
    default: false,
  },
  line: {
    type: Boolean,
    defaul: false,
  },
  size: {
    type: String,
    default: "small",
    validator(value) {
      return [
        "fit",
        "mini",
        "xxsmall",
        "xsmall",
        "small",
        "medium",
        "large",
        "xlarge",
        "xxlarge",
        "full",
      ].includes(value.toLocaleLowerCase());
    },
  },
  border: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary", "tertiary"].includes(value.toLocaleLowerCase());
    },
  },
  radius: {
    type: String,
    default: "medium",
    validator(value) {
      return ["none", "medium", "full"].includes(value.toLocaleLowerCase());
    },
  },
  color: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary", "tertiary", "dark"].includes(
        value.toLocaleLowerCase()
      );
    },
  },
});
</script>
<template>
  <div :class="card({ size, border, radius, color })">
    <!-- header -->
    <div
      v-if="title || $slots['title']"
      class="flex justify-between items-center py-4 px-6 w-full whitespace-wrap"
      :class="line ? 'border-b border-border-default' : ''"
    >
      <div class="flex items-center gap-2">
        <slot name="prepend"></slot>
        <div class="flex flex-col">
          <div
            class="font-semibold"
            :class="
              color === 'dark'
                ? 'text-content-inverted-primary'
                : 'text-content-primary'
            "
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div
            v-if="description"
            class="text-content-secondary text-xs whitespace-wrap"
            :class="
              color === 'dark'
                ? 'text-content-inverted-primary'
                : 'text-content-secondary'
            "
          >
            {{ description }}
          </div>
        </div>
      </div>
      <slot name="titleAction"></slot>
    </div>
    <!-- Content -->
    <div
      v-if="content || $slots['default']"
      class="h-full"
      :class="
        color === 'dark'
          ? 'text-content-inverted-primary'
          : 'text-content-primary'
      "
    >
      <slot>{{ content }}</slot>
    </div>
    <!-- Footer -->
    <div
      v-if="showAction || $slots['action']"
      class="flex gap-2 items-center justify-end px-3 pb-3 text-sm"
    >
      <slot name="action"></slot>
    </div>
  </div>
</template>
