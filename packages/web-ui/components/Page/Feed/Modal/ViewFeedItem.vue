<script lang="ts" setup>
const props = defineProps({
  feedItem: {
    type: Object as PropType<any>,
    required: true
  }
})
const emit = defineEmits(['close'])
</script>

<template>
  <Modal
    :open="true"
    title="View Feed Item Data"
    modalSize="2xl"
    @close="() => { emit('close') }"
  >
    <div class="flex flex-col gap-4">
      <div>
        <label class="block">Title</label>
        <UInput type="text" class="w-full" :value="feedItem.title || '-'" readonly />
      </div>
      <div>
        <label class="block">URL</label>
        <UInput type="text" class="w-full" :value="feedItem.url || '-'" readonly />
      </div>
      <div>
        <label class="block">Byline</label>
        <UInput type="text" class="w-full" :value="feedItem.byline || '-'" readonly />
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="block">Byline</label>
          <UInput type="text" class="w-full" :value="feedItem.lang || '-'" readonly />
        </div>
        <div class="flex-1">
          <label class="block">Dir</label>
          <UInput type="text" class="w-full" :value="feedItem.dir || '-'" readonly />
        </div>
      </div>
      <div>
        <label class="block">Content Length</label>
        <UInput type="text" class="w-full" :value="feedItem.contentLength || '-'" readonly />
      </div>
      <div>
        <label class="block">Site Name</label>
        <UInput type="text" class="w-full" :value="feedItem.siteName || '-'" readonly />
      </div>
      <div>
        <label class="block">Excerpt</label>
        <UInput type="text" class="w-full" :value="feedItem.excerpt || '-'" readonly />
      </div>
      <div>
        <label class="block">Text Content</label>
        <UTextarea type="text" class="w-full" :value="feedItem.textContent || '-'" readonly :rows="25" />
      </div>
      <div>
        <label class="block">RSS Item</label>
        <UTextarea type="text" class="w-full" :value="JSON.stringify(feedItem.rssItem || '{}', null, 2)" readonly :rows="25" />
      </div>
    </div>
  </Modal>
</template>