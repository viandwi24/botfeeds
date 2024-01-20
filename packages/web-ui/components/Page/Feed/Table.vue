<script lang="ts" setup>
const datatable = ref<any>(null)
const feedItem = ref<any>()
</script>

<template>
  <DataTable
    ref="datatable"
    title="Data"
    :columns="[
      { key: 'FeedHistory.name', data: 'FeedHistory.Feed.name', label: 'Name' },
      { key: 'title', data: 'title', label: 'Title' },
      { key: 'title', data: 'rssItem.pubDate', label: 'Pub Date' },
      { key: 'url', data: 'url', label: 'URL' },
      { key: 'action', label: '' }
    ]"
    :rows="[]"
    :api-url="parseApiURL('/feeds/items')"
  >
    <!-- <template #action>
      <button class="px-4 py-2 bg-gray-800 text-sm rounded" @click="() => {}">
        New
      </button>
    </template> -->
    <template #col-items="{ data }">
      <div>{{ data?.itemsProcessed }}/{{ data?.Feed?.config?.maxItemGet }}</div>
    </template>
    <template #col-action="{ data }">
      <button class="text-sm text-gray-200" @click="() => { feedItem = data }">
        View
      </button>
    </template>

    <PageFeedModalViewFeedItem
      v-if="feedItem"
      :feedItem="feedItem"
      @close="() => {
        feedItem = undefined
        datatable?.refresh()
      }"
    />
  </DataTable>
</template>