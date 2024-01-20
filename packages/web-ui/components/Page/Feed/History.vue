<script lang="ts" setup>
</script>

<template>
  <DataTable
    title="Histories"
    :columns="[
      { key: 'feed-name', data: 'Feed.name', label: 'Name' },
      { key: 'date', data: 'date', label: 'Date', type: 'date' },
      // { key: 'status', data: 'status', label: 'Status' },
      { key: 'rssUrl', data: 'rssUrl', label: 'rssUrl' },
      { key: 'itemsCount', data: 'itemsCount', label: 'Total Item' },
      { key: 'items', label: 'Processed Items' },
      { key: 'action', label: '' }
    ]"
    :rows="[]"
    :api-url="parseApiURL('/feeds/histories')"
  >
    <!-- <template #action>
      <button class="px-4 py-2 bg-gray-800 text-sm rounded" @click="() => {}">
        New
      </button>
    </template> -->
    <template #col-feed-name="{ data }">
      <UPopover mode="hover">
        <div class="flex items-center gap-2">
          <div v-if="data?.status == 'success'" class="h-2 w-2  inline-block rounded-full bg-green-500" />
          <div v-else-if="data?.status == 'pending'" class="h-2 w-2  inline-block rounded-full bg-yellow-500" />
          <div v-else-if="data?.status == 'failed'" class="h-2 w-2  inline-block rounded-full bg-red-500" />
          {{ data?.Feed?.name }}
        </div>
        <template #panel>
          <div class="p-2 border border-gray-500 rounded-lg">{{ data?.status }}</div>
        </template>
      </UPopover>
    </template>
    <template #col-items="{ data }">
      <div>{{ data?.itemsProcessed }}/{{ data?.Feed?.config?.maxItemGet }}</div>
    </template>
    <template #col-action="{ data }">
      <!-- <button class="text-sm text-gray-200" @click="() => { run(data) }">
        Run
      </button> -->
    </template>
  </DataTable>
</template>