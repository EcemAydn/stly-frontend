<script setup>
import { ref, computed, watchEffect } from "vue";
import { cva } from "class-variance-authority";
import ChevronDownSmall from "@/components/icons/ChevronDownSmall.vue";
import CheckSmall from "@/components/icons/CheckSmall.vue";

const isOpen = ref(false);
const select = ref(null);
const itemsContainer = ref(null);

const input = cva(["text-xs disabled:text-content-secondary text-left"], {
  variants: {
    isError: {
      true: "text-content-negative",
      false: "text-content-secondary",
    },
  },
});
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Array, Number],
    default: "",
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  helper: {
    type: String,
    default: "",
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

function selectItem(val) {
  if (props.multiple) {
    const index = props.modelValue.indexOf(val);
    if (index > -1) {
      const updated = props.modelValue.slice();
      updated.splice(index, 1);
      emit("update:modelValue", updated);
      // props.modelValue.splice(index, 1);
    } else {
      const updated = props.modelValue.slice();
      updated.push(val);
      emit("update:modelValue", updated);
      // props.modelValue.push(val);
    }
  } else {
    emit("update:modelValue", val);
  }
}

const getModelValueText = computed(() => {
  if (props.multiple) {
    const selectedItem = props.modelValue.map(
      (a) => props.items.find((item) => item.value === a)?.text
    );
    return selectedItem.join(", ") || "Select";
  } else {
    const existingValue = props.items.find(
      (item) => item.value === props.modelValue
    );
    if (existingValue) {
      return existingValue.text;
    }
    return "Select";
  }
});
const isItemSelected = (item) =>
  props.multiple
    ? props.modelValue.includes(item.value)
    : item.value === props.modelValue;

function toggleSelect() {
  isOpen.value = !isOpen.value;
}

function closeSelect(event) {
  if (!select.value.contains(event.target)) {
    isOpen.value = false;
  }
}

// Dropdown'un açılacağı yönü hesaplamak için ekran yüksekliğini ve dropdown'un pozisyonunu izleyin
const positionClass = computed(() => {
  if (select.value) {
    const { top, bottom } = select.value.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if (top > screenHeight / 2) {
      return "dropdown-up";
    } else if (bottom < screenHeight / 2) {
      return "dropdown-down";
    }
  }

  return "dropdown-down"; // Varsayılan olarak aşağı doğru açılacak
});
// Dropdown açıldığında dış tıklamaları izle
watchEffect((onInvalidate) => {
  if (isOpen.value) {
    document.addEventListener("click", closeSelect);
    onInvalidate(() => {
      document.removeEventListener("click", closeSelect);
    });
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-2 items-start text-sm">
    <label
      v-if="label"
      :disabled="disabled"
      class="font-medium leading-6"
      :class="disabled ? 'text-content-primary/50' : 'text-content-primary'"
      >{{ label }}</label
    >
    <button
      v-bind="$attrs"
      type="button"
      @click="toggleSelect"
      :disabled="disabled"
      ref="select"
      class="text-content-tertiary pl-4 pr-3 py-2 w-full flex justify-between items-center border bg-interaction-background-form-field focus:ring disabled:opacity-50 border-interaction-border-neutral-normal rounded-md"
      :class="{
        'border-content-negative ring-offset-1 ring-offset-white': !!error,
        'hover:border-interaction-border-hover': !error,
      }"
    >
      <span class="text-black">
        <slot name="selected" :selected="getModelValueText">
          {{ getModelValueText }}
        </slot>
      </span>

      <IconBase
        class="text-action-neutral-normal transition-all ease-in-out"
        :class="[isOpen ? 'rotate-180' : '']"
      >
        <ChevronDownSmall />
      </IconBase>

      <transition :name="positionClass">
        <div
          v-if="isOpen"
          :class="[
            positionClass === 'dropdown-up' ? 'rounded-t-md' : 'rounded-b-md',
          ]"
          class="absolute overflow-y-auto max-h-[300px] scroll-hide left-0 z-50 w-fit border px-2 py-1.5 border-border-default-alpha text-content-primary bg-interaction-background-modeless shadow-bottom-300"
          ref="itemsContainer"
          :style="{
            top:
              positionClass === 'dropdown-up'
                ? itemsContainer &&
                  select.offsetTop - itemsContainer.offsetHeight + 'px'
                : select.offsetTop + select.offsetHeight + 'px',
            left: select.offsetLeft + 'px',
          }"
        >
          <template v-if="items && items.length > 0">
            <button
              type="button"
              v-for="item in items"
              :key="item.id"
              :multiple="multiple"
              class="flex gap-1.5 items-center w-full py-1.5 text-sm leading-6 rounded-md bg-interaction-ghost-normal hover:bg-interaction-ghost-hover focus-within:ring-2 disabled:opacity-50"
              :class="isItemSelected(item) ? 'px-2' : 'pl-7 pr-3'"
              @click="selectItem(item.value)"
            >
              <div class="flex items-center gap-1.5 whitespace-nowrap">
                <IconBase v-if="isItemSelected(item)">
                  <CheckSmall />
                </IconBase>
                <slot name="item" :item="item">
                  {{ item.text }}
                </slot>
              </div>
            </button>
          </template>

          <div v-else>Seçenek yok</div>
        </div>
      </transition>
    </button>
    <div
      v-if="helper || error"
      :disabled="disabled"
      :class="input({ isError: !!error })"
    >
      {{ error || helper }}
    </div>
  </div>
</template>

<style scoped>
.dropdown-up-enter-active,
.dropdown-up-leave-active {
  transition: all 0.2s ease;
  opacity: 1;
}

.dropdown-down-enter-active,
.dropdown-down-leave-active {
  transition: all 0.2s ease;
  opacity: 1;
}

.dropdown-up-enter-from,
.dropdown-up-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.dropdown-down-enter-from,
.dropdown-down-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
</style>
