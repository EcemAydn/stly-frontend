<script setup>
import { useLoadingStore } from 'stores/loading';

const loadingStore = useLoadingStore();

function handleLoad() {
  loadingStore.isLoading = false;
}

</script>
<template>
  <Suspense @resolve="handleLoad()">
    <div>
      Loading...
    </div>
  </Suspense>
</template>