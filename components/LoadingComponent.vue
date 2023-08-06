<script setup>
import { cva } from "class-variance-authority";
const loading = cva(["animate-spin h-5 w-5 rounded-md"], {
  variants: {
    theme: {
      default: "text-interaction-neutral-subtle-normal",
      dark: "text-interaction-inverted-normal/40",
      light: "text-interaction-inverted-normal/40",
    },
  },
});
defineProps({
  theme: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "dark", "light"].includes(value.toLocaleLowerCase());
    },
  },
});
</script>
<template>
  <svg
    class=""
    :class="loading({ theme })"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="7"
      :stroke="
        theme === 'dark'
          ? '#FFFFFF40'
          : theme === 'light'
          ? '#4A545E'
          : '#F0F3F5'
      "
      stroke-width="2"
    />
    <path
      d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3"
      :stroke="
        theme === 'dark'
          ? 'currentColor'
          : theme === 'light'
          ? 'black'
          : '#3062D4'
      "
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>

  <!-- <div class="p-8 rounded-2xl bg-zinc-700 w-fit">
    <svg
      class="animate-spin h-5 w-5 rounded-md"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="7" stroke="#FFFFFF40" stroke-width="2" />
      <path
        d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3"
        stroke="currenttheme"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </div> -->
</template>
