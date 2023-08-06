<script setup>
import {
  ref,
  watch,
  onMounted,
  useSlots,
  onUpdated,
  onBeforeUnmount,
} from "vue";

const slots = useSlots();
const steps = ref(0);
const progress = ref();
const progressBackground = ref();

const emit = defineEmits("update:modelValue");

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },

  isNumberClickable: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
  },
});

function handleNumberClick(index) {
  if (props.isNumberClickable) {
    emit("update:modelValue", index);
  }
}

function initProgress(val) {
  if (val < steps.value) {
    const step = document.getElementById(`ronded-ui-kit-${val}`);
    progress.value.style.width = `${step.offsetLeft}px`;

    const lastStep = document.getElementById(
      `ronded-ui-kit-${steps.value - 1}`
    );

    progressBackground.value.style.width = `${lastStep.offsetLeft}px`;
  }
}

function resizeEvent() {
  initProgress(props.modelValue);
}

onMounted(() => {
  const defaultSlots = slots.default();

  steps.value = defaultSlots.length;

  setTimeout(() => {
    initProgress(props.modelValue);
    window.addEventListener("resize", resizeEvent);
  }, 500);
});

onUpdated(() => {
  initProgress(props.modelValue);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeEvent);
});

watch(
  () => props.modelValue,
  (val) => {
    initProgress(val);
    if (val > steps.value - 1) {
      emit("update:modelValue", steps.value);
    }
  }
);
</script>

<template>
  <div class="flex items-center w-full relative">
    <div
      v-for="(step, index) in steps"
      :key="index + '73718'"
      class="flex items-center w-full justify-end z-10"
    >
      <AvatarComp
        :id="'ronded-ui-kit-' + index"
        class="select-none"
        :class="{ 'cursor-pointer': isNumberClickable }"
        @click="handleNumberClick(index)"
        :color="`${index >= modelValue ? 'blue' : 'green'}`"
        radius="full"
      >
        <template v-if="modelValue >= step" #icon>
          <IconBase>
            <CheckSmall />
          </IconBase>
        </template>

        <template v-else #icon>
          {{ index + 1 }}
        </template>
      </AvatarComp>
      {{ step.text }}
    </div>

    <div
      ref="progressBackground"
      class="absolute w-full bg-gray-200 left-0 h-1"
    >
      <div
        ref="progress"
        class="w-0 h-1 transition-all ease-in-out duration-500 bg-global-green-400"
      ></div>
    </div>
  </div>

  <template v-for="(slot, index) in $slots.default()" :key="index">
    <component
      v-if="
        modelValue === index || (modelValue > steps - 1 && index + 1 === steps)
      "
      :is="slot"
    />
  </template>
</template>
