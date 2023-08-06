<script setup>
import { cva } from "class-variance-authority";

const alert = cva(["p-3 flex justify-between items-start rounded-md"], {
  variants: {
    type: {
      none: "bg-background-neutral",
      warning: "bg-background-warning",
      success: "bg-background-positive",
      negative: "bg-background-negative",
    },
    size: {
      small: "w-1/4",
      normal: "w-1/2",
      large: "w-2/3",
      full: "w-full",
    },
  },
});

const textClass = cva(["text-sm"], {
  variants: {
    type: {
      none: "text-cool-grey-100",
      success: "text-cool-grey-100",
      negative: "text-cool-grey-100",
      warning: "text-background-inverted",
    },
  },
});
defineProps({
  title: {
    type: String,
  },
  type: {
    type: String,
    default: "none",
    validator(value) {
      return ["none", "warning", "success", "negative"].includes(
        value.toLocaleLowerCase()
      );
    },
  },
  size: {
    type: String,
    default: "full",
    validator(value) {
      return ["small", "normal", "large", "full"].includes(
        value.toLocaleLowerCase()
      );
    },
  },
});
defineEmits(["close"]);
</script>

<template>
  <div :class="alert({ type, size })">
    <div class="flex gap-2 w-full justify-start items-center">
      <IconBase :class="textClass({ type })">
        <InfoCircle
          class="text-white"
          v-if="type === 'none' || type === 'success'"
        ></InfoCircle>
        <WarningFill
          class="text-background-inverted"
          v-if="type === 'warning'"
        ></WarningFill>
        <WarningIcon v-if="type === 'negative'"></WarningIcon>
      </IconBase>
      <p :class="textClass({ type })">{{ title }}</p>
      <slot name="actions" />
    </div>
    <button :class="textClass({ type })" @click="$emit('close')">
      <IconBase>
        <CloseIcon />
      </IconBase>
    </button>
  </div>
</template>
