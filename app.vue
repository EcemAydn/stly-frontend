<script setup>

</script>

<template>
  <div class="overflow-hidden bg-white w-full h-full relative">
    <TransitionGroup name="fade">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TransitionGroup>
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
