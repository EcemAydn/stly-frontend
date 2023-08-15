<script setup>
import { useRoute } from 'vue-router';
import {
  computed, ref, onMounted, onUnmounted,
} from 'vue';
import themeConfig from '../themeConfig';
import navigation from '@/navigation';
import SidebarNavigation from '@/components/SidebarNavigation.vue';
import BadgeComponent from '@/components/BadgeComponent.vue';
import SettingIcon from '@/components/icons/SettingIcon.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import BellIcon from '@/components/icons/BellIcon.vue';
import LanguageIcon from '@/components/icons/LanguageIcon.vue';
import IconBase from '@/components/icons/IconBase.vue';
import UserIcon from '@/components/icons/UserIcon.vue';
import WalletIcon from '@/components/icons/WalletIcon.vue';
import CalendarIcon from '@/components/icons/Calendar.vue';
import { useAuthStore } from '@/stores/auth/auth';
import TurkeyIcon from '@/components/icons/TurkeyIcon.vue';
import EnglandIcon from '@/components/icons/EnglandIcon.vue';

const { setLocale } = useI18n();
const { locale, availableLocales } = useI18n();
const localePath = useLocalePath();
const authStore = useAuthStore();

const route = useRoute();
const isMobile = ref(false);
const mobileSidebarShow = ref(true);
const language = ref(locale);
const showNotification = ref(false);

const footerLinks = [
  // {
  //   id: 5, title: 'Plans', to: '/plans',
  // },
  // {
  //   id: 6, title: 'Profile', to: '/profile',
  // },
  {
    id: 7,
    title: 'Biling',
    to: '/payment/plans',
    icon: WalletIcon,
  },
  {
    id: 8,
    title:'Settings',
    to: '/settings',
    icon: SettingIcon,
  },
];

const pageTitle = computed(() => {
  if (route.meta.title) {
    return route.meta.title;
  }
  return route.name || '';
});

function resizeListener() {
  isMobile.value = window.innerWidth < 768;
}



async function changeLocale(item) {
  setLocale(item);

  console.log(await localePath())

  // Change URL to correct language, ex: '/home' to '/fr/home'
  // await navigateTo(localePath(useRoute().path));
}

onMounted(() => {
  isMobile.value = window.innerWidth < 720;
  window.addEventListener('resize', resizeListener);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeListener);
});
</script>

<template>
  <div class="flex h-full w-full relative">
    <Transition name="slide-x">
    <NotificationComponent
      v-if="showNotification"
      description="Update your username and manage your account"
      @close="showNotification = false"
      buttonText="Mark all as read"
    >
      <!-- <div v-for="i in 30" class="p-4 text-xs flex gap-4 items-center border-b">
        <img :src="authStore.currentUser.picture" class="w-8 h-8 rounded-md" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus consequuntur eius laudantium?
      </div> -->

      <!-- v-if ile yönetilecek örneğin bildirim yoksa aşağıdaki svg gösterilebilir -->
      <div class="w-full h-full flex flex-col justify-center items-center text-content-primary text-sm">
        <img src="../public/NoFilesFound.svg" />
        <div>
          Notification is not found
        </div>
      </div>
    </NotificationComponent>
    </Transition>
    <SidebarNavigation
      :items="navigation"
      :size="$route.meta.defaultScale || themeConfig.sidebar.defaultScale"
      :logoText="themeConfig.logoText"
      :defaultScale="$route.meta.defaultScale || themeConfig.sidebar.defaultScale"
      :scalable="true"
      :logo="themeConfig.logo"
      v-model="mobileSidebarShow"
    >
    <template #footer="{ collapsed }">
      
      <div class="w-full px-2 gap-2 flex flex-col">
        <div :class="collapsed ? 'px-1' : ''">
          <NavLinks
            :collapsed="collapsed"
            :items="footerLinks"
          />
        </div>
        <NuxtLink to="/profile" class="flex items-center gap-2" :class="collapsed ? 'pl-[7px]' : 'pl-3'">
          <img :src="authStore.currentUser.picture" class="w-8 h-8 rounded-full" />
          <div class="text-sm" v-if="!isMobile && !collapsed">{{ authStore.currentUser.email }}</div>
        </NuxtLink>
      </div>
      
    </template>
    </SidebarNavigation>

    <div class="flex flex-col w-full bg-[#f6f7f9] h-full">
      <div
        class="flex items-center py-0.5 w-full border-b relative"
        :class="[isMobile ? 'px-2 justify-end' : 'justify-end px-2']"
      >
        <IconBase
          id="menu-icon"
          @click="mobileSidebarShow = !mobileSidebarShow"
          class="cursor-pointer h-full absolute left-4 top-0 z-50"
          v-if="isMobile"
        >
          <MenuIcon />
        </IconBase>
        <div class="flex items-center justify-end gap-2 sm:gap-4">
          <!-- <SearchComponent v-if="!isMobile" class="w-full"></SearchComponent> -->
          
          <div class="flex items-center gap-3" @click="showNotification = !showNotification" >
            <IconBase class="text-content-primary cursor-pointer">
              <BellIcon />
            </IconBase>
          </div>
          <div>
            <DropdownComponent>
              <template #activator>
                <AvatarComp color="none">
                  <template #icon>
                    <IconBase viewBox="0 0 24 24">
                      <LanguageIcon />
                    </IconBase>
                  </template>
                </AvatarComp>
              </template>

              <DropdownItemComponent v-for="(item, index) in availableLocales" :key="index" @click="changeLocale(item)" >
                <div class="flex items-center gap-2 whitespace-nowrap">

                  <IconBase v-if="item === 'Turkish'">
                    <TurkeyIcon />
                  </IconBase>
                  <IconBase v-else>
                    <EnglandIcon />
                  </IconBase>
                  {{ item }}
                </div>
              </DropdownItemComponent>
            </DropdownComponent>
          </div>
        </div>
      </div>

      <div class="overflow-y-auto w-full mx-auto h-full p-5">
        <transition name="fade">
          <slot />
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-x-enter-active,
.slide-x-leave-active {
  transition: all .7s;
}

.slide-x-enter-from,
.slide-x-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-x-enter-to,
.slide-x-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

</style>
