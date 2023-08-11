<script setup>
import themeConfig from '@/themeConfig';

import ChevronDownSmall from '@/components/icons/ChevronDownSmall.vue';
import ChevronRightSmall from '@/components/icons/ChevronRightSmall.vue';
import UploadIcon from '@/components/icons/UploadIcon.vue';
import RefreshIcon from '@/components/icons/RefreshIcon.vue';
import LockIcon from '@/components/icons/LockIcon.vue';
import TouchIdIcon from '@/components/icons/TouchIdIcon.vue';

definePageMeta({
  layout: "blank",
  path: "/",
  name: "Landing",
});
</script>
<template>
  <main class="w-full h-full overflow-y-auto">
    <header class="flex h-full w-full overflow-y-auto">
      <nav class="flex flex-col w-full bg-[#f6f7f9] h-full">
        <div
          class="flex items-center gap-4 py-1 w-full justify-between text-content-primary font-medium sm:px-8"
        >
          <img :src="themeConfig.logo" alt="logo" class="w-12 h-12">
          <NuxtLink to="/home">
              Home
            </NuxtLink>
          <!-- <div class="items-center gap-8 hidden sm:flex">
            <NuxtLink to="/home">
              Home
            </NuxtLink>
            <NuxtLink to="/home" class="pl-6">
              Components
            </NuxtLink>
            <div>
              <DropdownComponent>
                <template #activator>
                  <div class="flex font-medium items-center text-content-primary">
                    Examples
                    <IconBase>
                      <ChevronDownSmall />
                    </IconBase>
                  </div>
                </template>

                <DropdownItemComponent v-for="(item, index) in 2" :key="index" >
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    Forms
                  </div>
                </DropdownItemComponent>
              </DropdownComponent>
            </div>
          </div> -->
          <NuxtLink to="/auth/register">
            <ButtonComponent variant="ghost" appearance="secondary">
              Get Started
              <template #append>
                <IconBase>
                  <ChevronRightSmall />
                </IconBase>
              </template>
            </ButtonComponent>
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-6 items-center justify-center h-full relative">
          <div aria-hidden="true" class=" absolute top-40 left-0 lg:left-80 w-60 h-60 bg-background-brand blur-lg opacity-30 rounded-full"></div>
          <div aria-hidden="true" class="absolute bottom-40 right-0 lg:right-80 w-60 h-60 bg-background-brand blur-lg opacity-30 rounded-full"></div>
          <NuxtLink to="/auth/register">
            <ButtonComponent appearance="secondary" size="small" class="bg-transparent">
              <div class="flex flex-col sm:flex-row gap-2 items-center">
                Ocean Starter Kit is now available for Nuxt 3! 
                <div class="flex items-center text-content-informative">
                  Read more 
                  <IconBase>
                    <ChevronRightSmall />
                  </IconBase>
                </div>
              </div>
            </ButtonComponent>
          </NuxtLink>
          <h1 class="text-4xl font-bold">OCEAN STARTER KIT</h1>
          <p class="text-content-secondary text-center">Beautifully designed, fully featured, and ready to go starter kit for Nuxt 3 and<br>Tailwind CSS.</p>
          <div class="flex items-center gap-4">
            <NuxtLink to="/auth/register">
              <ButtonComponent>Get Started</ButtonComponent>
            </NuxtLink>
            <a href="https://github.com/Ron-Digital/ocean-starter-kit">
              <ButtonComponent variant="ghost">View Github
                <IconBase>
                  <ChevronRightSmall />
                </IconBase>
              </ButtonComponent>
            </a>
          </div>
        </div>
      </nav>
    </header>

    <section class="bg-[#f6f7f9] flex flex-col lg:flex-row justify-between w-full gap-8 relative">
      <aside class="md:pl-32 px-4 md:pr-20 py-8 flex flex-col gap-4">
        <div class="text-3xl font-bold">Everything you need to create your app</div>
        <div class="text-content-secondary font-medium">
          Includes everything you need to build your app, including a customizable UI kit, authentication, and more.
        </div>
        <div class="text-content-secondary flex items-start text-sm gap-2 py-4">
          <AvatarComp color="blue" class="pt-1">
            <template #icon>
              <IconBase viewBox="0 0 20 22">
                <UploadIcon />
              </IconBase>
            </template>
          </AvatarComp>
          <div>
            <b>Nuxt 3</b> The latest and greatest version of Nuxt.js, with a new file system based routing system and a new way to write your components.
          </div>
        </div>
        <div class="text-content-secondary flex items-start text-sm gap-2 py-4">
          <AvatarComp color="blue" class="pt-1">
            <template #icon>
              <IconBase viewBox="0 0 16 20">
                <LockIcon />
              </IconBase>
            </template>
          </AvatarComp>
          <div>
            <b>Tailwind CSS</b> A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.
          </div>
        </div>
        <div class="text-content-secondary flex items-start text-sm gap-2 py-4">
          <AvatarComp color="blue" class="pt-1">
            <template #icon>
              <IconBase viewBox="0 0 14 20">
                <RefreshIcon />
              </IconBase>
            </template>
          </AvatarComp>
          <div>
            <b>Ronded UI</b> Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
          </div>
        </div>
        <div class="text-content-secondary flex items-start text-sm gap-2 py-4">
          <AvatarComp color="blue" class="pt-1">
            <template #icon>
              <IconBase viewBox="0 0 24 24">
                <TouchIdIcon />
              </IconBase>
            </template>
          </AvatarComp>
          <div>
            <b>Built-in Components</b> A collection of UI components built with Tailwind CSS and Ronded UI, ready to be used in your projects.
          </div>
        </div>
      </aside>
      <figure class="flex flex-col items-center gap-4 w-full">
        <img src="../../assets/img/feature-1.png" class="lg:absolute right-0 -bottom-20 w-[500px] rounded-xl" alt="Description of the Image">
        <img src="../../assets/img/feature-2.png" class="w-[600px] lg:w-[800px] rounded-xl" alt="Description of the Image">
      </figure>
    </section>
    <footer class="bg-[#f6f7f9] pt-40">
      <div class="flex items-center justify-center">
        <div class="bg-gradient-to-r from-background-informative px-4 md:px-0 to-[#f6f7f9] w-full py-20 items-center flex flex-col md:flex-row gap-8 justify-between">
          <div class="flex flex-col gap-6 px-20 text-white">
            <div class="font-bold text-3xl">Boost your productivity</div>
            <div class="">Start building your next app with Ocean Starter Kit today.</div>
            <div class="flex items-center gap-4">
              <NuxtLink to="/auth/register">
                <ButtonComponent>Get Started</ButtonComponent>
              </NuxtLink>
              <a href="https://github.com/Ron-Digital/ocean-starter-kit">
              <ButtonComponent>View Github
                <IconBase>
                  <ChevronRightSmall />
                </IconBase>
              </ButtonComponent>
            </a>
            </div>
          </div>
          <img src="../../assets/img/feature-2.png" class="md:w-1/2 m-4 rounded-xl md:rounded-l-xl" alt="Description of the Image">
        </div>
      </div>
      <div class="flex justify-between items-center gap-2 text-content-secondary pt-20 pb-2 px-2 md:px-20 lg:px-40 font-medium text-xs md:text-sm">
        <div class="hidden md:block">Ocean Starter Kit</div>
        <div class="">Ocean Starter Kit by <a href="https://github.com/Ron-Digital/ocean-starter-kit" class="text-content-primary font-semibold">Ron Digital</a>. All rights reserved.</div>
      </div>
    </footer>
  </main>
</template>