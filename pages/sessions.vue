<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useAlertStore } from '@/stores/alertStore';
import { useI18n } from 'vue-i18n';

definePageMeta({
  middleware: ['authenticated-middleware'],
  defaultScale: 'mini',
  scalable: false,
  extra: true,
});

const authStore = useAuthStore();
const alertStore = useAlertStore();
const { t } = useI18n();

const isLoadingButton = ref(true);
const deleteLoad = ref(false);

const headers = ref([
  { name: t('sessions.browser'), value: "browser" },
  { name: "IP", value: "ip" },
  { name: t('sessions.Recent Activity'), value: "recent_activity" },
  { name: t('sessions.Actions'), value: "actions" },
]);

async function deleteSession(itemId) {
  deleteLoad.value = true;
  await authStore.deleteSessions(itemId);
  alertStore.addAlert({
    title: 'Successfully deleted the session',
    type: 'success'
  })
  deleteLoad.value = false;
  authStore.sessions = authStore.sessions.filter(session => session.id !== itemId);
}

onMounted(async () => {
  isLoadingButton.value = true;
  await authStore.getSessions();
  isLoadingButton.value = false;
});

</script>
<template>
  <div v-if="!isLoadingButton" class="flex pb-12 flex-col gap-4 max-w-5xl mx-auto px-4 w-full">
  <HeaderComponent size="large" :title="t('sessions.Sessions')" :description="t('sessions.careful what you share')" />
  <div class="my-4 w-full">
    <!-- <div class="flex justify-end">
      <PaginationComponent :total="10" :resultCount="2" class="mb-4"></PaginationComponent>
    </div> -->
    <!-- <div v-for="session in authStore.sessions" :key="session.id"> -->
    <TableComponent :headers="headers" :items="authStore.sessions">
      <template #browser="{ item }">
        <div class="flex items-center gap-2">
          <img v-if="item.browser === 'Chrome' || item.browser === 'Mobile Chrome'" src="../assets/img/chrome.png" alt="Chrome" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Firefox' || item.browser === 'Mobile Firefox'" src="../assets/img/firefox.png" alt="Firefox" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Safari' || item.browser === 'Mobile Safari'" src="../assets/img/safari.png" alt="Safari" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Opera' || item.browser === 'Mobile Opera'" src="../assets/img/opera.png" alt="Opera" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Edge' || item.browser === 'Mobile Edge'" src="../assets/img/edge.png" alt="Edge" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Vivaldi' || item.browser === 'Mobile Vivaldi'" src="../assets/img/vivaldi.png" alt="Vivaldi" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Yandex' || item.browser === 'Mobile Yandex'" src="../assets/img/yandex.png" alt="Yandex" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Brave' || item.browser === 'Mobile Brave'" src="../assets/img/brave.png" alt="Brave" class="w-6 h-6 rounded-full">
          <img v-else-if="item.browser === 'Postman' || item.browser === 'Mobile Postman'" src="../assets/img/postman.png" alt="Brave" class="w-6 h-6 rounded-full">
          <img v-else src="../assets/img/default.png" alt="Other" class="w-6 h-6 rounded-full">
          <div>
            {{ item.browser }}
          </div>
          <div v-if="item.is_current">
            <BadgeComponent class="text-xs" emphasis="high" color="blue" :badge-text="t('sessions.Current')" />
          </div>
        </div>
      </template>
      <template #recent_activity="{ item }">
        <div>
          {{ item.last_used_at ? moment(item.last_used_at).format('D MMM YYYY HH:mm') : '-' }}
        </div>
      </template>
      <template #actions="{ item }">
        <div>
          <ButtonComponent size="small" appearance="secondary" :loading="deleteLoad" :disabled="item.is_current" intent="destructive" :text="t('sessions.Delete')" @click="deleteSession(item.id)" />
        </div>
      </template>
    </TableComponent>
    <!-- </div> -->
  </div>
</div>
</template>