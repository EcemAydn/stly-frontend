<script setup>
import { computed, watch } from "vue";
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import ChevronRight from '@/components/icons/ChevronRight.vue'

const props = defineProps({
  pageOptions: {
    type: Array,
    default: () => [
      { text: "5 result", value: 5 },
      { text: "10 result", value: 10 },
      { text: "15 result", value: 15 },
      { text: "20 result", value: 20 },
      { text: "25 result", value: 25 },
      { text: "50 result", value: 50 },
      { text: "100 result", value: 100 },
    ],
  },
  total: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  resultCount: {
    type: Number,
    default: 10,
  },
});
const emit = defineEmits(["update:currentPage", "update:resultCount"]);

const pageDefault = computed({
  get() {
    return props.resultCount;
  },

  set(val) {
    emit("update:resultCount", val);
  },
});

const page = computed({
  get() {
    return props.currentPage;
  },

  set(val) {
    emit("update:currentPage", val);
  },
});

const totalPages = computed(() => {
  return Math.ceil(props.total / pageDefault.value);
});

const prevDisabled = computed(() => {
  return page.value <= 1;
});

const nextDisabled = computed(() => {
  return page.value >= totalPages.value;
});
const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value += 1;
  }
};

watch(pageDefault, () => {
  if (totalPages.value < page.value) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    page.value = totalPages.value;
  }
});
</script>

<template>
  <div
    v-if="inline"
    class="bg-background-default dark:bg-background-inverted text-sm w-full text-action-neutral-normal flex items-center justify-between gap-2"
  >
    <div>
      <SelectComponent v-model="pageDefault" :items="pageOptions">
        <template #item="{ item }">
          {{ item.text }}
        </template>
      </SelectComponent>
    </div>
    <div class="flex items-center gap-4">
      <div>
        {{ Math.min((currentPage - 1) * pageDefault + 1, total) }} -
        {{ Math.min(currentPage * pageDefault, total) }} of {{ total }} results
      </div>
      <div class="text-content-primary dark:text-content-inverted-primary flex gap-1">
        <IconBase>
          <ChevronLeft />
        </IconBase>
        <IconBase>
          <ChevronRight />
        </IconBase>
      </div>
    </div>
  </div>
  <div v-else class="flex gap-1">
    <ButtonComponent
      @click="prevPage"
      size="small"
      appearance="secondary"
      button-name="Prev"
      :disabled="prevDisabled"
    >
      <template #prepend>
        <IconBase>
          <ChevronLeft />
        </IconBase>
      </template>
    </ButtonComponent>
    <button
      type="button"
      v-for="page in totalPages"
      :key="page + 'page'"
      class="text-action-neutral-normal text-sm px-4 py-2 w-fit bg-action-ghost-normal rounded-md"
      @click="$emit('update:currentPage', page)"
      :class="{ 'bg-action-ghost-selected': page === currentPage }"
    >
      {{ page }}
    </button>
    <ButtonComponent
      type="button"
      @click="nextPage"
      size="small"
      appearance="secondary"
      button-name="Next"
      :disabled="nextDisabled"
    >
      <template #append>
        <IconBase>
          <ChevronRight />
        </IconBase>
      </template>
    </ButtonComponent>
  </div>
</template>
