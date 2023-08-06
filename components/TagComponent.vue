<script setup>
defineProps({
  tag: {
    type: String,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Object, Number],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:modelValue", "close"]);
</script>
<!-- remove button -->
<template>
  <button
    type="button"
    :disabled="disabled"
    class="text-content-primary leading-6 text-sm hover:bg-interaction-neutral-subtle-hover active:bg-interaction-neutral-subtle-active disabled:opacity-50 focus:ring-2 rounded px-2 w-fit flex items-center gap-1"
    :class="
      modelValue === tag
        ? 'bg-interaction-neutral-subtle-selected'
        : 'bg-interaction-neutral-subtle-normal'
    "
    @click="$emit('update:modelValue', tag)"
  >
    <div class="flex items-center gap-2">
      <slot name="icon" />
      {{ tag }}
    </div>
    <button
      type="button"
      v-if="closeable"
      @click="$emit('close')"
      :disabled="disabled"
      class="text-action-neutral-normal disabled:opacity-50"
    >
      <IconBase>
        <CloseIcon />
      </IconBase>
    </button>
  </button>
</template>
