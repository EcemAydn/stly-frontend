<script setup>
import { useAppStore } from './stores/app';
import { useAlertStore } from './stores/alertStore';

const appStore = useAppStore();
const alertStore = useAlertStore();

</script>

<template>
  <div class="overflow-hidden bg-white w-full h-full relative">
    <!-- <Loading v-if="appStore.isLoading" /> -->

    <TransitionGroup name="fade">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TransitionGroup>

    <Teleport to="body">
      <div class="pt-4 pr-2 z-[9999] fixed top-0 right-0 w-96">
        <div class="relative flex flex-col gap-2">
          <TransitionGroup name="slide-top">
            <AlertComponent
              v-for="(alert, index) in alertStore.alerts"
              :key="alert.title + alert.type + index"
              class="w-full shadow-md"
              :style="{ position: 'absolute', top: 5 * index + 'px', right: 0, zIndex: 9999, opacity: index + 1 === alertStore.alerts.length ? '' : .7 }"
              :title="alert.title"
              :type="alert.type"
              @click="alertStore.popAlert()"
            />
          </TransitionGroup>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-top-enter-to,
.slide-top-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
