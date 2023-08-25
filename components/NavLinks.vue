<script setup>
import { onUpdated, ref, defineEmits, defineProps } from "vue";
import { useRoute } from "vue-router";
import { cva } from "class-variance-authority";
import IconBase from "./IconBase.vue";
import ChevronDownSmall from "@/components/icons/ChevronDownSmall.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue"
import CollapseIndicator from "@/components/icons/CollapseIndicator.vue";

const route = useRoute();
const isCollapsed = ref([true]);

const link = cva(
  "w-full mx-3 select-none rounded-[6px] focus:ring-2 focus:ring-interaction-default-normal text-action-neutral-normal dark:text-action-inverted-normal text-sm transition-all ease-in-out duration-300",
  {
    variants: {
      isSelected: {
        true: "bg-action-primary-subtle-normal dark:bg-action-ghost-inverted-active hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover text-action-primary-selected dark:text-action-inverted-selected",
        false: ["hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover"],
      },
      isDisabled: {
        true: [
          "opacity-30 cursor-default focus:ring-0 hover:bg-white hover:bg-action-ghost-hover",
        ],
        false: ["cursor-pointer hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover"],
      },
      collapsed: {
        true: [
          "bg-action-ghost-hover items-center hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover",
        ],
        false: ["hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover"],
      },
      isHeader: {
        true: ["hover:bg-white bg-white focus:!ring-0 cursor-default text-xs"],
        false: [],
      },
      isChild: {
        true: "pl-2 hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover",
        false: "hover:bg-action-ghost-hover dark:hover:bg-action-ghost-inverted-hover",
      },
    },

    compoundVariants: [],
  }
);

defineEmits(["headerClick"]);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },

  title: {
    type: String,
    default: "",
  },

  child: {
    type: Boolean,
    default: false,
  },

  index: {
    type: Number,
    default: 1,
  },

  collapsed: {
    type: Boolean,
    default: false,
  },
});

function isSelected(item) {
  if (item.workspace) {
    return false;
  }

  if (route && item.to === route.path) {
    return true;
  }
  return false;
}

function isDisabled(item) {
  return item.disabled;
}

function isCollapsable(item) {
  return item.children && item.children.length > 0;
}

function handleCollapse(item, index) {
  if (isCollapsable(item)) {
    isCollapsed.value[props.index + index] =
      !isCollapsed.value[props.index + index];
  }
}

onUpdated(() => {
  if (props.collapsed && isCollapsed.value.length > 1) {
    isCollapsed.value = [isCollapsed.value[0], isCollapsed.value[1]];
  }
});
</script>

<template>
  <ul class="flex flex-col gap-2 w-full">
    <li
      class="w-full flex flex-col gap-2 justify-start items-center"
      :class="{ 'px-2': collapsed && item.header }"
      v-for="(item, idx) in items"
      :key="item.id * 21321"
    >
      <NuxtLink
        :class="
          link({
            collapsed: isCollapsed[index + idx],
            isSelected: isSelected(item) || false,
            isDisabled: isDisabled(item) || false,
            isHeader: item.header,
            isChild: item.child,
          })
        "
        active-class="bg-action-primary-subtle-normal"
        @click="handleCollapse(item, idx)"
        :to="
          !isCollapsable(item) && item.to && !isDisabled(item) ? item.to : ''
        "
      >
        <div
          v-if="item.workspace"
          class="flex gap-3 items-center"
          :class="collapsed ? 'p-2 justify-center' : 'pl-3 pr-2 py-3'"
        >
          <AvatarComp
            size="ss"
            class="w-9 h-9"
            emphasis="high"
            :avatarText="$t(item.title)"
          />

          <div v-if="!collapsed" class="flex gap-1 items-center font-semibold">
            {{ $t(item.title) }}

            <IconBase
              class="flex-shrink-0 transition-all ease-in-out duration-500"
              :width="18"
              :height="18"
              :class="isCollapsed[index + idx] ? '' : 'rotate-180'"
            >
              <ChevronDownSmall />
            </IconBase>
          </div>
        </div>

        <div v-else-if="item.header">
          <div
            v-if="!collapsed"
            class="flex justify-between items-center text-content-tertiary dark:text-content-inverted-tertiary font-semibold pl-4 uppercase py-2"
          >
            {{ $t(item.title) }}

            <IconBase
              class="cursor-pointer hover:text-content-primary dark:text-content-inverted-primary"
              @click="$emit('headerClick', item)"
              :width="20"
              :height="20"
              :class="isCollapsed[index + idx] ? '' : 'rotate-180'"
            >
              <PlusIcon />
            </IconBase>
          </div>

          <div
            v-else
            class="w-full h-2 border-t border-border-default dark:border-border-default-alpha cursor-default"
          ></div>
        </div>

        <div
          v-else
          class="flex w-full items-center gap-2 px-4 py-2 transition-all ease-in-out duration-500"
          :class="[
            child && !isCollapsable(item) ? 'px-5 !py-1' : '',
            child ? 'pl-5' : '',
            collapsed ? 'items-center justify-center !px-0 py-1' : '',
          ]"
        >
          <IconBase
            v-if="isCollapsable(item) && !collapsed"
            viewBox="0 0 4 6"
            :width="4"
            :height="6"
            :class="isCollapsed[index + idx] ? 'rotate-90' : ''"
          >
            <CollapseIndicator />
          </IconBase>

          <IconBase
          v-if="item.icon"
            class="flex-shrink-0"
            :width="20"
            :height="20"
            :viewBox="item.viewBox"
          >
            <component :is="item.icon" />
          </IconBase>

          <span v-if="!collapsed" :class="item.icon ? '' : 'pl-5'">
            {{ $t(item.title) }}
          </span>
        </div>
      </NuxtLink>

      <div class="w-full" v-if="isCollapsed[index + idx]">
        <NavLinks
          :child="item.workspace ? false : true"
          :index="items.length * index"
          :items="item.children"
          :collapsed="collapsed"
        />
      </div>
    </li>
  </ul>
</template>
