<script setup>
import { useRouter } from "vue-router";
import { ref, computed, watchEffect } from "vue";

const router = useRouter();
const isOpen = ref(false);
const dropdown = ref(null);
const itemsContainer = ref(null);

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  error: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  independent: {
    type: Boolean,
    default: false,
  }
});
// const emit = defineEmits(["update:modelValue"]);

function clickItem(item) {
  if (item.to) {
    router.push(item.to);
  }
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown(event) {
  if (!dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
}
// Dropdown'un açılacağı yönü hesaplamak için ekran yüksekliğini ve dropdown'un pozisyonunu izleyin
const positionClass = computed(() => {
  if (dropdown.value) {
    let className = "";
    const { top, bottom, left, right } = dropdown.value.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    if (top > screenHeight / 2) {
      className += "dropdown-up";
    } else if (bottom < screenHeight / 2) {
      className += "dropdown-down";
    }

    if (left > screenWidth / 2) {
      className += "dropdown-left";
    } else if (right < screenWidth / 2) {
      className += "dropdown-right";
    }

    return className;
  }

  return "dropdown-down"; // Varsayılan olarak aşağı doğru açılacak
});
// Dropdown açıldığında dış tıklamaları izle
watchEffect((onInvalidate) => {
  if (isOpen.value) {
    document.addEventListener("click", closeDropdown);
    onInvalidate(() => {
      document.removeEventListener("click", closeDropdown);
    });
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <button
      type="button"
      @click="toggleDropdown"
      ref="dropdown"
      class="text-content-tertiary dark:text-content-tertiary w-full flex justify-between items-center bg-background-default dark:bg-cool-grey-alpha-900 "
      :class="independent ? '' : 'pl-4 pr-3 py-2'"
      v-bind="$attrs"
    >
      <slot name="activator" />

      <transition :name="positionClass">
        <div
          v-if="isOpen"
          :class="[
            positionClass === 'dropdown-up' ? 'rounded-t-md' : 'rounded-b-md',
          ]"
          class="absolute left-0 z-[999] w-fit border px-2 py-1.5 border-border-default-alpha text-content-primary dark:text-content-inverted-primary bg-interaction-background-modeless dark:bg-interaction-background-inverted-modeless shadow-bottom-300"
          ref="itemsContainer"
          :style="{
            top: positionClass.includes('dropdown-up')
              ? itemsContainer &&
                dropdown.offsetTop - itemsContainer.offsetHeight + 'px'
              : dropdown.offsetTop + dropdown.offsetHeight + 'px',
            left:
              positionClass.includes('dropdown-left') &&
              itemsContainer &&
              dropdown.offsetLeft - itemsContainer.clientWidth + 50 + 'px',
            right:
              positionClass.includes('dropdown-right') &&
              itemsContainer &&
              dropdown.offsetLeft + itemsContainer.clientWidth + 'px',
          }"
          @click.stop
        >
          <slot>
            <template v-if="items && items.length > 0">
              <button
                v-for="(item, index) in items"
                :key="item.id || index"
                class="flex gap-3 items-center w-full py-1.5 text-sm leading-6 rounded-md bg-interaction-ghost-normal hover:bg-interaction-ghost-hover focus-within:ring-2 disabled:opacity-50"
                :class="clickItem(item) ? 'px-3' : 'px-4'"
                @click="clickItem(item)"
              >
                <div class="flex items-center gap-3">
                  <slot :name="'item' + item.id || index" :item="item">
                    {{ item.text }}
                  </slot>
                </div>
              </button>
            </template>

            <div v-else>Seçenek yok</div>
          </slot>
        </div>
      </transition>
    </button>

    <div v-if="error" class="text-xs text-content-negative">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.dropdown-up-enter-active,
.dropdown-up-leave-active {
  transition: all 0.2s ease;
}

.dropdown-down-enter-active,
.dropdown-down-leave-active {
  transition: all 0.2s ease;
}

.dropdown-up-enter-from,
.dropdown-up-leave-to {
  transform: translateY(10%);
}

.dropdown-down-enter-from,
.dropdown-down-leave-to {
  transform: translateY(-10%);
}
</style>
