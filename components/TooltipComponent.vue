<script setup>
import { cva } from "class-variance-authority";
import { ref, onMounted, watch } from "vue";

const showTooltip = ref(false);
const tooltipElement = ref(null);
let tooltipTop = ref(0);
let tooltipLeft = ref(0);

const arrowheadPosition = cva(
  [
    "w-3 h-3 absolute z-0 rounded-sm rotate-45 bg-interaction-background-inverted-modeless",
  ],
  {
    variants: {
      position: {
        top: "-top-1 left-2",
        bottom: "-bottom-1 left-2",
        left: "bottom-2 -left-1",
        right: "bottom-2 -right-1",
      },
      arposition: {
        start: [],
        middle: [],
        end: [],
      },
    },
    compoundVariants: [
      {
        position: "top",
        arposition: "start",
        class: "left-2",
      },
      {
        position: "top",
        arposition: "middle",
        class: "left-[calc(50%-8px)]",
      },
    ],
  }
);

defineProps({
  position: {
    type: String,
    default: "top",
  },
  arposition: {
    type: String,
    default: "middle",
  },
  text: {
    type: String,
    default: "Tooltip Placeholder",
  },
});

onMounted(() => {
  const rect = tooltipElement.value.getBoundingClientRect();
  tooltipTop.value = rect.top;
  tooltipLeft.value = rect.left;
});

watch(showTooltip, (newVal) => {
  if (newVal) {
    const rect = tooltipElement.value.getBoundingClientRect();
    tooltipTop.value = rect.top;
    tooltipLeft.value = rect.left;
  }
});
</script>

<template>
  <div @mouseover="showTooltip = !showTooltip" ref="tooltipElement">
    <div>arda</div>
  </div>
  <div
    v-if="showTooltip"
    :style="{ top: tooltipTop + 'px', left: tooltipLeft + 'px' }"
    class="py-1 px-2 absolute w-fit whitespace-nowrap leading-5 rounded text-xs text-content-inverted-primary bg-interaction-background-inverted-modeless"
  >
    {{ text }}
    <div :class="arrowheadPosition({ position, arposition })"></div>
  </div>
</template>
