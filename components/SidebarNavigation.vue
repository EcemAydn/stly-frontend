<script setup>
import { ref, onMounted, onUnmounted, watchEffect, watch } from "vue";
import NavLinks from "./NavLinks.vue";
import IconBase from "./icons/IconBase.vue";
import SidebarShow from "./icons/SidebarShow.vue";
import SidebarHide from "./icons/SidebarHide.vue";
import AvatarComp from "./AvatarComp.vue";

const sidebar = ref();
const isSidebarShow = ref(false);
const isMobileSidebar = ref(false);

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  logo: {
    type: String,
    default: null,
  },

  items: {
    type: Array,
    default: () => [],
  },

  logoText: {
    type: String,
  },

  size: {
    type: String,
    default: "mini",
    validator: (val) => ["mini", "normal"].includes(val.toLowerCase()),
  },

  scalable: {
    type: Boolean,
    default: true,
  },

  defaultScale: {
    type: String,
    default: "normal",
    validator: (val) => ["mini", "normal"].includes(val.toLowerCase()),
  },

  modelValue: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  isSidebarShow.value = props.defaultScale === "normal";

  resizeListener({ target: window });

  window.addEventListener("resize", resizeListener);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeListener);
});

function resizeListener(event) {
  if (event.target.innerWidth < 720) {
    isMobileSidebar.value = true;
  } else if (event.target.innerWidth < 1024) {
    isSidebarShow.value = false;
    isMobileSidebar.value = false;
    emit("update:modelValue", false);
  } else {
    isMobileSidebar.value = false;
    if (props.defaultScale === "mini" || props.size === "mini") {
      isSidebarShow.value = false;
      emit("update:modelValue", false);
    } else {
      isSidebarShow.value = true;
    }
  }
}

function handleExpandSidebar() {
  isSidebarShow.value = !isSidebarShow.value;
}

function closeSidebar(event) {
  const menuIcon = document.getElementById("menu-icon");
  if (
    !sidebar.value.contains(event.target) &&
    menuIcon &&
    event.target.id !== "menu-icon" &&
    !menuIcon.contains(event.target)
  ) {
    isSidebarShow.value = false;
    emit("update:modelValue", false);
  }
}

watchEffect((onInvalidate) => {
  if (
    isSidebarShow.value &&
    (props.defaultScale === "mini" || props.size === "mini")
  ) {
    document.addEventListener("click", closeSidebar);
    onInvalidate(() => {
      document.removeEventListener("click", closeSidebar);
    });
  }
});

watch(
  () => props.modelValue,
  () => {
    if (isMobileSidebar.value) {
      isSidebarShow.value = props.modelValue;
    }
  }
);

watch(
  () => props.size,
  (val) => {
    if (!isMobileSidebar.value) {
      if (val === "mini") {
        isSidebarShow.value = false;
      } else {
        isSidebarShow.value = true;
      }
    }
  }
);
</script>

<template>
  <div
    class="flex h-full text-content-primary z-30 bg-white"
    id="sidebar"
    ref="sidebar"
  >
    <div
      class="flex flex-col h-full bg-white border-r border-border-default transition-all ease-in-out duration-500 flex-shrink-0 text-content-primary z-30"
      :class="[
        isMobileSidebar
          ? isSidebarShow
            ? 'w-16'
            : 'w-0'
          : isSidebarShow
          ? 'w-72'
          : 'w-16',
      ]"
    >
      <div
        class="flex items-center transition-all ease-in-out duration-100 mb-3 flex-shrink-0"
        :class="[
          isMobileSidebar
            ? isSidebarShow
              ? 'justify-center border-b border-border-default px-1.5 py-2'
              : ''
            : isSidebarShow
            ? 'justify-between border-b border-border-default px-3 py-2.5'
            : 'border-b border-border-default justify-center px-3 py-2',
        ]"
      >
        <span
          v-if="
            (isMobileSidebar && isSidebarShow) ||
            (!scalable && !isMobileSidebar) ||
            (scalable && isSidebarShow)
          "
          class="flex gap-2 items-center flex-shrink-0"
        >
          <slot name="logo">
            <router-link v-if="logo" to="/">
              <AvatarComp class="w-8 h-8" radius="normal" :src="logo" />
            </router-link>
          </slot>
          <slot v-if="!isMobileSidebar && isSidebarShow" name="logoText">
            <router-link to="/">
              {{ logoText }}
            </router-link>
          </slot>
        </span>

        <IconBase
          v-if="scalable && !isMobileSidebar"
          class="cursor-pointer hover:text-content-primary flex-shrink-0 w-8 h-8 p-1.5"
          :class="isSidebarShow ? '' : 'm-0.5'"
          @click="isSidebarShow = !isSidebarShow"
        >
          <component :is="isSidebarShow ? SidebarHide : SidebarShow" />
        </IconBase>
      </div>

      <div
        v-if="!isMobileSidebar || (isMobileSidebar && isSidebarShow)"
        class="w-full h-full px-2 overflow-y-auto overflow-x-hidden scroll-hide pt-1"
        :class="isMobileSidebar || !isSidebarShow ? 'px-3' : 'px-1'"
      >
        <NavLinks
          @expandSidebar="handleExpandSidebar"
          :collapsed="isMobileSidebar ? true : !isSidebarShow"
          :items="items"
        ></NavLinks>
      </div>

      <div
        v-if="
          ($slots['footer'] && !isMobileSidebar) ||
          (isMobileSidebar && isSidebarShow)
        "
        class="flex items-center flex-shrink-0 pb-3 overflow-x-hidden pt-2"
      >
        <slot
          name="footer"
          :collapsed="isMobileSidebar ? true : !isSidebarShow"
        ></slot>
      </div>
    </div>
  </div>
</template>
