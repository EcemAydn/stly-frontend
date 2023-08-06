<script setup>
defineProps({
  sidebarItem: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: "normal",
  },
  avatarText: {
    type: String,
  },
});
</script>
<template>
  <div class="flex h-full w-full">
    <!-- <SidebarNavigation logo="UK" :size="size">
      <template #navbar="{ size }">
        <NavLinks :items="sidebarItem" :size="size"> </NavLinks>
      </template>
    </SidebarNavigation> -->
    <div class="flex flex-col items-center w-full bg-[#fafcfd]">
      <div class="flex justify-between items-center py-1 px-8 w-full border-b">
        <SearchComponent> </SearchComponent>
        <div class="flex items-center gap-3">
          <IconBase width="28" height="28" class="text-content-primary">
            <BellIcon />
          </IconBase>
          <DropdownComponent>
            <template #activator>
              <AvatarComp
                size="large"
                :avatar-text="avatarText"
                radius="full"
              ></AvatarComp>
            </template>

            <DropdownItemComponent> asd </DropdownItemComponent>

            <DropdownItemComponent> asd </DropdownItemComponent>
          </DropdownComponent>
        </div>
      </div>
      <div class="p-16">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
