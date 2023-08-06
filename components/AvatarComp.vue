<script setup>
import { cva } from "class-variance-authority";
import { computed } from "vue";

const image = cva([""], {
  variants: {
    size: {
      xsmall: "w-5 h-5",
      small: "w-6 h-6",
      normal: "w-8 h-8",
      large: "w-10 h-10",
      xlarge: "w-12 h-12",
    },
    radius: {
      normal: "rounded-md",
      full: "rounded-full",
    },
  },
});

const imageText = cva(
  ["flex items-center justify-center tracking-[.013em] uppercase"],
  {
    variants: {
      size: {
        xsmall: "w-5 h-5 text-[9px]",
        small: "w-6 h-6 text-[10px]",
        normal: "w-8 h-8 text-xs leading-5",
        large: "w-10 h-10 text-sm leading-6",
        xlarge: "w-12 h-12 leading-7",
      },
      radius: {
        normal: "rounded-md",
        full: "rounded-full",
      },
      emphasis: {
        low: [],
        high: ["text-content-inverted-primary"],
      },
      color: {},
    },
    compoundVariants: [
      {
        emphasis: "low",
        color: "none",
        class: "bg-white border border-gray-200 hover:bg-gray-100",
      },
      {
        emphasis: "low",
        color: "blue",
        class: "bg-non-contextual-blue-muted text-non-contextual-blue-default",
      },
      {
        emphasis: "low",
        color: "green",
        class:
          "bg-non-contextual-green-muted text-non-contextual-green-default",
      },
      {
        emphasis: "low",
        color: "grey",
        class: "bg-non-contextual-grey-muted text-non-contextual-grey-default",
      },
      {
        emphasis: "low",
        color: "red",
        class: "bg-non-contextual-red-muted text-non-contextual-red-default",
      },
      {
        emphasis: "low",
        color: "orange",
        class:
          "bg-non-contextual-orange-muted text-non-contextual-orange-default",
      },
      {
        emphasis: "low",
        color: "raspberry",
        class:
          "bg-non-contextual-raspberry-muted text-non-contextual-raspberry-default",
      },
      {
        emphasis: "low",
        color: "magenta",
        class:
          "bg-non-contextual-magenta-muted text-non-contextual-magenta-default",
      },
      {
        emphasis: "low",
        color: "purple",
        class:
          "bg-non-contextual-purple-muted text-non-contextual-purple-default",
      },
      {
        emphasis: "low",
        color: "grape",
        class:
          "bg-non-contextual-grape-muted text-non-contextual-grape-default",
      },
      {
        emphasis: "low",
        color: "violet",
        class:
          "bg-non-contextual-violet-muted text-non-contextual-violet-default",
      },
      {
        emphasis: "low",
        color: "teal",
        class: "bg-non-contextual-teal-muted text-non-contextual-teal-default",
      },
      {
        emphasis: "low",
        color: "cyan",
        class: "bg-non-contextual-cyan-muted text-non-contextual-cyan-default",
      },
      {
        emphasis: "low",
        color: "aquamarine",
        class:
          "bg-non-contextual-aquamarine-muted text-non-contextual-aquamarine-default",
      },
      {
        emphasis: "low",
        color: "emerald",
        class:
          "bg-non-contextual-emerald-muted text-non-contextual-emerald-default",
      },
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
        color: "magenta",
        class: "bg-non-contextual-magenta-default",
      },
      {
        emphasis: "high",
        color: "purple",
        class: "bg-non-contextual-purple-default",
      },
      {
        emphasis: "high",
        color: "grape",
        class: "bg-non-contextual-grape-default",
      },
      {
        emphasis: "high",
        color: "violet",
        class: "bg-non-contextual-violet-default",
      },
      {
        emphasis: "high",
        color: "teal",
        class: "bg-non-contextual-teal-default",
      },
      {
        emphasis: "high",
        color: "cyan",
        class: "bg-non-contextual-cyan-default",
      },
      {
        emphasis: "high",
        color: "raspberry",
        class: "bg-non-contextual-raspberry-default",
      },
      {
        emphasis: "high",
        color: "aquamarine",
        class: "bg-non-contextual-aquamarine-default",
      },
      {
        emphasis: "high",
        color: "emerald",
        class: "bg-non-contextual-emerald-default",
      },
    ],
  }
);

const props = defineProps({
  avatarText: {
    type: String,
    default: "",
  },
  src: {
    type: String,
  },
  size: {
    type: String,
    default: "normal",
  },
  radius: {
    type: String,
    default: "normal",
  },
  // color: {
  //   type: String,
  //   default: "highGrey",
  // },
  emphasis: {
    type: String,
    default: "low",
    validator(value) {
      return ["low", "high"].includes(value.toLocaleLowerCase());
    },
  },
  color: {
    type: String,
    default: "grey",
    validator(value) {
      return [
        "none",
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
});

const displayText = computed(() => {
  const words = props.avatarText.split(" ");
  if (words.length <= 2) {
    return words.map((word) => word.charAt(0)).join("");
  } else {
    return words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
  }
});
</script>
<template>
  <div class="flex gap-2 items-center">

    <div class="relative flex-shrink-0">
      <div
      v-if="!src"
      v-bind="$attrs"
      :class="imageText({ size, radius, emphasis, color })"
      >
      {{ displayText }}
        <slot name="icon"></slot>
      </div>
      
      <img
      v-else
      v-bind="$attrs"
      :class="image({ size, radius })"
      :src="src"
      alt=""
      />
    </div>
    <slot name="label"></slot>
  </div>
</template>
