<script setup>
defineProps({
  menuText: {
    type: String,
    default: "Menu text",
  },
  expandable: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    type="button"
    class="w-fit text-sm py-1 px-3 rounded bg-action-ghost-normal hover:bg-action-ghost-hover active:bg-action-ghost-active focus:ring-2 disabled:text-action-ghost-normal/50 text-action-neutral-normal flex items-center gap-2"
  >
    <slot name="append"></slot>
    {{ menuText }}
    <IconBase v-if="expandable">
      <ChevronDownSmall />
    </IconBase>
  </button>
</template>
<!-- bg-action-ghost-normal  -->
<!-- :class="
      $slots['append']
        ? 'pl-2 pr-2'
        : expandable
        ? 'pl-3 pr-2'
        : $slots['append'] && expandable
        ? 'px-2'
        : 'px-3'
    " -->
