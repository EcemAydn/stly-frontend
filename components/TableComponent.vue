<script setup>
import { onMounted, ref, onUnmounted } from "vue";

const isSelectedAll = ref(false);
const mobilSelect = ref(false);

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  selectTable: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 10,
  },
});
function selectAll(e) {
  isSelectedAll.value = e;
  props.items.forEach((item) => {
    item.selected = isSelectedAll.value;
  });
}

onMounted(() => {
  resizeListener({ target: window });

  window.addEventListener("resize", resizeListener);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeListener);
});
function resizeListener(e) {
  if (e.target.innerWidth < 640) {
    mobilSelect.value = false;
  } else {
    mobilSelect.value = true;
  }
}

function itemSelect(item, val) {
  item.selected = val;

  const selectedItems = props.items.filter((itm) => itm.selected);

  if (selectedItems.length === props.items.length.slice(0, props.limit)) {
    isSelectedAll.value = true;
  } else if (isSelectedAll.value) {
    isSelectedAll.value = false;
  }
}

defineEmits(["selected"]);
</script>
<template>
  <table class="overflow-y-auto w-full text-content-primary dark:text-content-inverted-primary">
    <thead
      class="hidden text-sm sm:table-header-group font-bold bg-background-subtle-neutral dark:bg-background-neutral-strong border border-border-default dark:border-border-default-alpha"
    >
      <tr class="text-left">
        <th v-if="selectTable" class="pl-6">
          <div>
            <CheckboxComponent
              :modelValue="isSelectedAll"
              @update:modelValue="selectAll"
              class="flex items-center justify-center"
            ></CheckboxComponent>
          </div>
        </th>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="text-content-primary dark:text-content-inverted-primary py-2.5"
          :class="selectTable === false ? 'px-6' : 'px-3'"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>

    <tbody class="flex text-xs flex-col gap-2 sm:table-row-group">
      <tr
        v-for="(item, index) in items.slice(0, limit)"
        :key="index"
        class="flex flex-col sm:table-row border border-border-default dark:border-border-default-alpha sm:text-left relative bg-background-default dark:bg-background-inverted transition duration-500 ease-in-out"
      >
        <td v-if="selectTable && mobilSelect" class="pl-6">
          <div>
            <CheckboxComponent
              :modelValue="item.selected || false"
              @update:modelValue="(val) => itemSelect(item, val)"
              class="flex items-center justify-center"
            />
          </div>
        </td>

        <td
          v-for="(header, index) in headers"
          :key="index + 'qeiaoqwu'"
          class="flex flex-col gap-4 sm:table-cell py-3"
          :class="selectTable === false ? 'px-6' : 'px-3'"
        >
          <p class="font-bold sm:hidden whitespace-nowrap">
            {{ header.name.toUpperCase() }}
          </p>

          <div class="sm:flex gap-4 w-full items-center text-sm">
            <div class="w-full">
              <slot :name="header.value" :item="item">
                {{ item[header.value] }}
              </slot>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
