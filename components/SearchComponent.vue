<script setup>
import IconBase from "../components/icons/IconBase.vue";
import { cva } from "class-variance-authority";
import SearchIcon from "../components/icons/SearchIcon.vue";

const search = cva(
  [
    "flex gap-2 items-center text-content-primary w-full rounded-md disabled:text-content-tertiary",
  ],
  {
    variants: {
      border: {
        default:
          "border border-interaction-border-neutral-normal hover:border-interaction-border-hover focus-within:ring-1 focus-within:border-interaction-default-normal focus-within:ring-interaction-default-normal disabled:border-interaction-border-neutral-normal/50",
        inline:
          "bg-interaction-ghost-normal hover:bg-interaction-ghost-hover focus-within:ring-1 focus-within:ring-interaction-default-normal",
      },
    },
  }
);

defineProps({
  search: {
    type: String,
    default: "inline",
  },
  type: {
    type: String,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  clear: {
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
  <div class="flex flex-col gap-2">
    <div :class="search({ border })">
      <IconBase>
        <SearchIcon />
      </IconBase>
      <slot name="prepend"></slot>
      <input
        class="w-full outline-none text-sm bg-interaction-ghost-normal"
        placeholder="Search..."
        required
        v-bind="$attrs"
        :type="type"
        @input="(e) => $emit('update:modelValue', e.target.value)"
        :value="modelValue"
      />
      <button
        type="button"
        v-if="clear"
        @click="$emit('update:modelValue', '')"
      >
        <IconBase>
          <CloseIcon />
        </IconBase>
      </button>
      <slot name="append"></slot>
    </div>
  </div>
</template>
