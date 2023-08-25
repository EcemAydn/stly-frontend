<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Object, Number],
    default: "",
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Boolean,
    default: true,
  },
  ghost: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="flex flex-col gap-2 select-none">
    <label
      v-if="label"
      class="text-sm font-medium leading-6"
      :class="disabled ? 'text-content-primary dark:text-content-inverted-primary/50' : 'text-content-primary dark:text-content-inverted-primary'"
      >{{ label }}</label
    >
    <div
      class="gap-2"
      :class="position ? 'flex flex-wrap' : 'flex flex-col w-fit'"
    >
      <button
        :disabled="disabled"
        type="button"
        class="rounded-md text-center text-sm disabled:text-content-primary dark:text-content-inverted-primary/50"
        :class="[
          ghost
            ? 'py-1 px-3 text-sm leading-6 bg-action-ghost-normal text-content-primary dark:text-content-inverted-primary hover:text-action-primary-hover  hover:bg-action-ghost-hover disabled:bg-action-ghost-normal'
            : 'bg-interaction-background-form-field dark:bg-interaction-background-inverted-modeless border-2 border-interaction-border-neutral-normal p-2 hover:border-interaction-border-hover focus:ring-2 disabled:border-interaction-border-neutral-normal/50',
          modelValue === item.value && ghost
            ? 'border-interaction-border-selected text-interaction-default-normal'
            : modelValue === item.value && !ghost
            ? 'text-action-primary-selected bg-action-ghost-selected !border-interaction-border-selected'
            : '',
        ]"
        @click="$emit('update:modelValue', item.value)"
        v-for="(item, index) in items"
        :key="index + 291321"
      >
        <slot name="item" :item="item">
          {{ item.name }}
        </slot>
      </button>
    </div>
  </div>
</template>
