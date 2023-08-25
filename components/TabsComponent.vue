<script setup>
import { cva } from "class-variance-authority";
const button = cva(
  [
    "flex gap-2 items-center py-2 focus:ring-2 bg-red-500 focus:rounded text-action-neutral-normal disabled:text-action-neutral-normal/50",
  ],
  {
    variants: {
      color: {
        default:
          "border-b-2 border-transparent hover:border-action-neutral-subtle-hover active:border-action-primary-active",
        ghost:
          "bg-action-ghost-normal dark:bg-interaction-background-inverted-modeless hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover rounded active:bg-action-ghost-active dark:active:bg-action-ghost-inverted-active",
      },
      selected: {
        default: "text-action-primary-normal !border-action-primary-normal",
        ghost: "font-semibold bg-action-ghost-selected dark:bg-action-ghost-inverted-selected",
      },
    },
  }
);
defineProps({
  color: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "ghost"].includes(value.toLocaleLowerCase());
    },
  },
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Object, Number],
    default: null,
  },
  selected: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "ghost"].includes(value.toLocaleLowerCase());
    },
  },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <div
    class="text-sm w-fit flex gap-2"
    :class="
      color === 'default' ? 'border-b-2 border-action-neutral-subtle-hover' : ''
    "
  >
    <button
      type="button"
      v-for="(item, index) in items"
      :key="index + 32342809"
      @click="$emit('update:modelValue', item.value)"
      class=""
      :class="[
        button({ color, selected: modelValue === item.value && color }),
        item.text ? 'px-4' : 'px-2.5',
      ]"
    >
      <slot name="item" :item="item">
        <IconBase v-if="item.icon">
          <component :is="item.icon" />
        </IconBase>

        <p v-if="item.text">
          {{ item.text }}
        </p>
      </slot>
    </button>
  </div>
</template>
