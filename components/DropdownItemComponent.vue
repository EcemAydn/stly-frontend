<script setup></script>

<template>
  <button
    type="button"
    class="flex gap-3 items-center w-full py-1.5 text-sm leading-6 rounded-md bg-interaction-background-modeless dark:bg-interaction-background-inverted-modeless hover:bg-interaction-ghost-hover dark:hover:bg-interaction-ghost-inverted-hover focus-within:ring-2 disabled:opacity-50 transition-all ease-in-out duration-500"
  >
    <div class="flex items-center gap-3 px-2">
      <slot />
    </div>
  </button>
</template>
