<script setup>
import LayerTwoIcon from '@/components/icons/LayerTwoIcon.vue';
import { useAuthStore } from '@/stores/auth/auth';
import SpaceShip from '@/components/icons/SpaceShip.vue';

const authStore = useAuthStore();

const headers = ref([
  { name: "NAME", value: "name" },
  { name: "POSITION", value: "position" },
  { name: "COUNTRY", value: "country" },
  { name: "STATUS", value: "status" },
  { name: "EMAIL", value: "email" },
]);

const users = ref([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc',
    name: "Ecem Beyza Aydın",
    email: "ecem@ron.digital",
    position: "Senior Frontend Developer",
    country: "Turkey",
    status: "Active",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc",
    name: "Ceren Ozkurt",
    email: "cerenozkurt@gmail.com",
    position: "Senior Backend Developer",
    country: "Arjantin",
    status: "Active",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc",
    name: "Tirami Su",
    email: "tiramisu@gmail.com",
    position: "Senior Frontend Developer",
    country: "Turkey",
    status: "Active",
  },
  {
    id: 4,
    avatar: null,
    name: "Arda Turan",
    email: "ardaturan@gmail.com",
    position: "Futbolcu",
    country: "Turkey",
    status: "Active",
  },
  {
    id: 5,
    avatar: null,
    name: "Fettucini Gulen",
    email: "fettucini@gmail.com",
    position: "Bölücü",
    country: "Amerika",
    status: "Active",
  },
]);

// function test() {
//   fetch('/api/hello').then((response) => response.json()).then((data) => {
//     console.log(data);
//   })
// }

definePageMeta({
  middleware: ['authenticated-middleware'],
})
</script>

<template>
  <div class="flex pb-12 flex-col gap-4 max-w-7xl mx-auto px-4 w-full">

    <div class="text-2xl">
      <div class="flex items-center gap-2">
        <IconBase class="w-6 h-6 sm:!w-10 sm:!h-10" viewBox="0 0 512 512" color="blue">
          <SpaceShip />
        </IconBase>
        <div class="text-xl sm:!text-3xl text-content-primary dark:text-content-inverted-primary">
          Hey {{ authStore.currentUser.first_name.toUpperCase() }}!
        </div>
      </div>
    </div>
    
    <div class="grid lg:grid-cols-3 gap-4">
      <!-- <ButtonComponent text="deneme" @click="test" /> -->
      <CardComponent v-for="i in 3" :key="i" size="full" line>
        <template #title>
          Example Card
        </template>
        <div class="p-6 text-sm font-light">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br>
          Suscipit officiis vero, ducimus aperiam repudiandae fuga consequatur recusandae assumenda sequi aspernatur aut, asperiores blanditiis impedit!<br><br>
          <div class="flex gap-2 items-center mb-4"> 
            <i> Repellendus iste quod odit sunt? Debitis numquam modi mollitia veniam dolore aperiam nobis, accusantium a perspiciatis.</i>
            <img src="https://i.pravatar.cc" alt="Avatar" class="rounded-xl w-28 opacity-90" />
          </div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br>
          Suscipit officiis vero, ducimus aperiam repudiandae fuga consequatur recusandae assumenda sequi aspernatur aut, asperiores blanditiis impedit!<br><br>
        </div>
        <template #prepend>
          <AvatarComp color="blue" radius="full">
            <template #icon>
              <IconBase>
                <LayerTwoIcon />
              </IconBase>
            </template>
          </AvatarComp>
        </template>
      </CardComponent>
    </div>
  </div>
</template>
