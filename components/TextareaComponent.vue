<script setup>
import { cva } from "class-variance-authority";
import { onMounted, ref, watch, onBeforeUnmount } from "vue";

const input = cva(["flex items-center gap-1 text-xs"], {
  variants: {
    isError: {
      true: "text-content-negative",
      false: "text-content-secondary",
    },
  },
});

const textAreaRef = ref(null);
let timeout = null;

const adjustHeight = () => {
  textAreaRef.value.style.height = "auto";
  const height = textAreaRef.value.scrollHeight;
  textAreaRef.value.style.height = `${height > 64 ? height : 64}px`;
};

onMounted(() => {
  addEventListener("resize", adjustHeight);
  adjustHeight();
});

onBeforeUnmount(() => {
  removeEventListener("resize", adjustHeight);
});

const props = defineProps({
  label: {
    type: String,
  },
  helper: {
    type: String,
  },
  error: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 5,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  cols: {
    type: Number,
    default: 100,
  },
  char: {
    type: Boolean,
    default: false,
  },
  maxChar: {
    type: Number,
    default: 1000,
  },
});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  () => {
    if (props.isScalable) {
      adjustHeight();
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      emit("bounced", props.modelValue);
    }, 700);
  }
);
</script>
<template>
  <div class="flex flex-col gap-2 select-none text-sm">
    <div v-if="label" class="flex justify-between">
      <label
        class="font-medium leading-6"
        :class="disabled ? 'text-content-primary/50' : 'text-content-primary'"
        >{{ label }}</label
      >
      <div
        v-if="char"
        :class="error ? 'text-content-negative' : 'text-content-tertiary'"
      >
        {{ props.modelValue.length }} / {{ maxChar }}
      </div>
    </div>
    <textarea
      ref="textAreaRef"
      class="overflow-hidden transition-colors ease-in-out duration-300 border disabled:opacity-50 outline-none text-content-primary bg-interaction-background-form-field py-1 px-4 w-full rounded-md focus-within:ring-1 focus-within:border-interaction-default-normal focus-within:ring-interaction-default-normal"
      :class="
        error
          ? 'border-interaction-border-alert'
          : 'border-interaction-border-neutral-normal hover:border-interaction-border-hover disabled:border-interaction-border-neutral-normal disabled:resize-none'
      "
      :disabled="disabled"
      :rows="rows"
      v-bind="$attrs"
      :value="modelValue"
      :cols="cols"
      @input="(e) => $emit('update:modelValue', e.target.value)"
    ></textarea>

    <div
      v-if="helper || error"
      :disabled="disabled"
      :class="input({ isError: !!error })"
    >
      {{ error || helper }}
    </div>
  </div>
</template>
