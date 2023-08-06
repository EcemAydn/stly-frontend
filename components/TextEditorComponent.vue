<script setup>
import { cva } from "class-variance-authority";
import { onMounted, ref, watch } from "vue";

const input = cva(
  ["flex items-center gap-1 text-xs disabled:text-content-secondary"],
  {
    variants: {
      isError: {
        true: "text-content-negative",
        false: "text-content-secondary",
      },
    },
  }
);

const textarea = cva(
  [
    "transition-colors ease-in-out disabled:opacity-50 resize-none duration-300 border disabled:opacity-50 outline-none text-content-primary py-2 w-full rounded-md",
  ],
  {
    variants: {
      color: {
        primary:
          "bg-interaction-background-form-field focus-within:ring-1 focus-within:border-interaction-default-normal focus-within:ring-interaction-default-normal",
        secondary: "bg-global-blue-100 border-none hover:bg-global-blue-200",
        none: "bg-interaction-background-form-field border-none",
      },
      scalable: {
        true: "overflow-hidden",
        false: "",
      },
      padding: {
        default: "px-4",
        small: "px-1",
        none: "",
      },
    },
  }
);

const textAreaRef = ref(null);
let timeout = null;

const adjustHeight = () => {
  textAreaRef.value.style.height = "auto";
  textAreaRef.value.style.height = `${textAreaRef.value.scrollHeight}px`;
};

onMounted(() => {
  if (props.isScalable) {
    adjustHeight();
  }
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
  color: {
    type: String,
    default: "primary",
    validator(value) {
      return ["none", "primary", "secondary"].includes(
        value.toLocaleLowerCase()
      );
    },
  },
  padding: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "small", "none"].includes(value.toLocaleLowerCase());
    },
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
  isScalable: {
    type: Boolean,
    default: true,
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
      :class="[
        textarea({ color, scalable: isScalable, padding }),
        error
          ? 'border-interaction-border-alert'
          : 'border-interaction-border-neutral-normal hover:border-interaction-border-hover disabled:border-interaction-border-neutral-normal',
      ]"
      :disabled="disabled"
      v-bind="$attrs"
      :value="modelValue"
      :cols="cols"
      :rows="rows"
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
