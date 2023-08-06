<script setup>
import { useRoute } from 'vue-router';
import {
  computed, ref, onMounted, onUnmounted,
} from 'vue';
import themeConfig from '../themeConfig';
import navigation from '@/navigation';
import SidebarNavigation from '@/components/SidebarNavigation.vue';
import SettingIcon from '@/components/icons/SettingIcon.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import BellIcon from '@/components/icons/BellIcon.vue';
import LanguageIcon from '@/components/icons/LanguageIcon.vue';
import IconBase from '@/components/icons/IconBase.vue';
import UserIcon from '@/components/icons/UserIcon.vue';
import WalletIcon from '@/components/icons/WalletIcon.vue';
import CalendarIcon from '@/components/icons/Calendar.vue';

const { setLocale } = useI18n();
const { locale, availableLocales } = useI18n();
const localePath = useLocalePath();

const route = useRoute();
const isMobile = ref(false);
const mobileSidebarShow = ref(true);
const language = ref(locale);

const footerLinks = [
  // {
  //   id: 5, title: 'Plans', to: '/plans',
  // },
  // {
  //   id: 6, title: 'Profile', to: '/profile',
  // },
  {
    id: 7,
    title:'Settings',
    to: '/settings',
    icon: SettingIcon,
    children: [
      {
        id: 8,
        title: 'Biling',
        icon: WalletIcon,
        viewBox: '0 0 24 24',
        children: [
          {
            id: 9,
            title: 'Plans',
            to: '/payment/plans',
            icon: CalendarIcon,
          },
        ]
      },
    ]
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
  <div class="flex h-full w-full">
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
        <RouterLink to="/profile" :class="collapsed ? 'pl-[7px]' : 'pl-3'">
          <AvatarComp color="blue" avatarText="Ecem Aydın">
            <template #label>
              <div class="text-sm" v-if="!isMobile && !collapsed">ecem@ron.digital</div>
            </template>
          </AvatarComp>
        </RouterLink>
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
          <SearchComponent v-if="!isMobile" class="w-full"></SearchComponent>
          
          <div class="flex items-center gap-3">
            <IconBase class="text-content-primary">
              <BellIcon />
            </IconBase>
          </div>
          <div>
            <DropdownComponent>
              <template #activator>
                <AvatarComp color="raspberry">
                  <template #icon>
                    <IconBase viewBox="0 0 24 24">
                      <LanguageIcon />
                    </IconBase>
                  </template>
                </AvatarComp>
              </template>

              <DropdownItemComponent v-for="(item, index) in availableLocales" :key="index" @click="changeLocale(item)" >
                <div class="flex items-center gap-2 whitespace-nowrap">

                  <IconBase>
                    <SettingIcon />
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
</style>
