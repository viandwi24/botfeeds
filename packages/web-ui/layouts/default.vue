<script lang="ts" setup>
const menus = ref([
  {
    type: 'item',
    name: 'Dashboard',
    path: '/',
  },
  {
    type: 'header',
    name: 'Automation',
  },
  {
    type: 'item',
    name: 'Trigger',
    path: '/triggers',
  },
  {
    type: 'item',
    name: 'Feeds',
    path: '/feeds',
  },
  {
    type: 'header',
    name: 'Bots',
  },
  {
    type: 'item',
    name: 'Telegram',
    path: '/bots/telegram',
  },
  {
    type: 'item',
    name: 'Twitter',
    path: '/bots/twitter',
  },
])
</script>

<template>
  <div class="bg-gray-950 text-gray-100 min-h-screen w-full flex flex-col">
    <div class="w-screen h-[64px] sticky flex border-b border-gray-600">
      <div class="flex-1 flex items-center max-w-screen-xl w-full mx-auto px-4">
        <div class="font-semibold text-xl">BOT FEEDS</div>
      </div>
    </div>
    <div class="flex-1 max-w-screen-xl w-full mx-auto py-4 flex gap-6">
      <div class="w-[160px] flex flex-col">
        <template
          v-for="item in menus"
          :key="Math.random()"
        >
          <NuxtLink
            v-if="item.type === 'item' && item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-50"
            active-class="bg-gray-700 text-gray-50"
          >
            {{ item.name }}
          </NuxtLink>
          <div
            v-if="item.type === 'header'"
            class="px-4 py-2 mt-4 rounded-lg text-gray-400"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <footer class="border-t border-gray-600">
      <div class="max-w-screen-xl w-full mx-auto py-4 flex gap-6">
        &copy; 2023
      </div>
    </footer>
  </div>
</template>
