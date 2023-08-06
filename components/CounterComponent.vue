<script setup>
import { cva } from "class-variance-authority";

const badge = cva(["text-sm rounded-md px-2 whitespace-nowrap"], {
  variants: {
    emphasis: {
      low: ["text-content-primary"],
      high: ["text-content-inverted-primary"],
    },
    color: {
      outline: ["border"],
      blue: [],
      green: [],
      grey: [],
      red: [],
      orange: [],
    },
  },
  compoundVariants: [
    {
      emphasis: "high",
      color: "blue",
      class: "bg-non-contextual-blue-default",
    },
    {
      emphasis: "high",
      color: "green",
      class: "bg-non-contextual-green-default",
    },
    {
      emphasis: "high",
      color: "grey",
      class: "bg-non-contextual-grey-default",
    },
    {
      emphasis: "high",
      color: "red",
      class: "bg-non-contextual-red-default",
    },
    {
      emphasis: "high",
      color: "orange",
      class: "bg-non-contextual-orange-default",
    },
    {
      emphasis: "high",
      color: "outline",
      class: "border-border-neutral",
    },
    {
      emphasis: "low",
      color: "blue",
      class: "bg-non-contextual-blue-subtle",
    },
    {
      emphasis: "low",
      color: "green",
      class: "bg-non-contextual-green-subtle",
    },
    {
      emphasis: "low",
      color: "grey",
      class: "bg-non-contextual-grey-subtle",
    },
    {
      emphasis: "low",
      color: "red",
      class: "bg-non-contextual-red-subtle",
    },
    {
      emphasis: "low",
      color: "orange",
      class: "bg-non-contextual-orange-subtle",
    },
    {
      emphasis: "low",
      color: "raspberry",
      class: "bg-non-contextual-raspberry-subtle",
    },
    {
      emphasis: "low",
      color: "magenta",
      class: "bg-non-contextual-magenta-subtle",
    },
    {
      emphasis: "low",
      color: "purple",
      class: "bg-non-contextual-purple-subtle",
    },
    {
      emphasis: "low",
      color: "grape",
      class: "bg-non-contextual-grape-subtle",
    },
    {
      emphasis: "low",
      color: "violet",
      class: "bg-non-contextual-violet-subtle",
    },
    {
      emphasis: "low",
      color: "teal",
      class: "bg-non-contextual-teal-subtle",
    },
    {
      emphasis: "low",
      color: "cyan",
      class: "bg-non-contextual-cyan-subtle",
    },
    {
      emphasis: "low",
      color: "aquamarine",
      class: "bg-non-contextual-aquamarine-subtle",
    },
    {
      emphasis: "low",
      color: "emerald",
      class: "bg-non-contextual-emerald-subtle",
    },
  ],
});

defineProps({
  badgeText: {
    type: String,
  },
  color: {
    type: String,
    default: "grey",
    validator(value) {
      return [
        "blue",
        "green",
        "grey",
        "red",
        "orange",
        "raspberry",
        "magenta",
        "purple",
        "grape",
        "violet",
        "teal",
        "cyan",
        "aquamarine",
        "emerald",
      ].includes(value.toLocaleLowerCase());
    },
  },
  emphasis: {
    type: String,
    default: "high",
    validator(value) {
      return ["high", "medium", "low"].includes(value.toLocaleLowerCase());
    },
  },
});
</script>
<template>
  <div
    :class="[
      badge({ emphasis, color }),
      $slots['icon'] ? 'px-[2px] py-[2px]' : 'px-2',
    ]"
  >
    <slot name="icon">
      {{ badgeText }}
    </slot>
  </div>
</template>
