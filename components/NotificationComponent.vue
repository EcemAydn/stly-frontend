<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";
defineProps({
  title: {
    type: String,
    default: "Notification",
  },
  description:{
    type: String,
  },
  buttonText: {
    type: String,
  }
})
defineEmits(["close", "NotificationButton"]);
</script>
<template>
    <div @click="$emit('close')" class="w-full h-full fixed z-[999] inset-0">
      <div
        @click.stop
        class="bg-white h-full absolute w-full sm:w-3/5 lg:w-1/3 z-40 top-0 right-0 shadow-bottom-300 scroll-hide"
      >
      <div class="block sm:hidden text-right p-2">
        <button @click="$emit('close')" class="border border-content-secondary rounded-full p-1">
          <IconBase>
            <CloseIcon />
          </IconBase>
        </button>
      </div>
        <div class="w-full px-6 pt-2 sm:pt-6 flex flex-col">
          <div class="flex items-center justify-between gap-2">
            <div class="text-content-primary font-semibold text-lg">{{ title }}</div>
            <ButtonComponent variant="bare" size="small" :text="buttonText" @click="$emit('NotificationButton')"></ButtonComponent>
          </div>
          <div class="text-content-secondary text-sm">{{ description }}</div>
        </div>
        <div class="m-6 h-full w-full max-h-full overflow-y-auto pb-32 text-content-primary">
          <slot></slot>
        </div>
      </div>
    </div>
</template>