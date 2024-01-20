<template>
  <div>
    <HeadlessTabGroup>
      <HeadlessTabList class="flex rounded overflow-hidden w-auto">
        <HeadlessTab as="template" v-slot="{ selected }">
          <button :class="{ 'px-4 py-2 bg-gray-800': selected, 'px-4 py-2 bg-transparent': !selected, 'outline-none': true }">
            Feed Sources
          </button>
        </HeadlessTab>
        <HeadlessTab as="template" v-slot="{ selected }">
          <button :class="{ 'px-4 py-2 bg-gray-800': selected, 'px-4 py-2 bg-transparent': !selected, 'outline-none': true }">
            Feeds History
          </button>
        </HeadlessTab>
        <HeadlessTab as="template" v-slot="{ selected }">
          <button :class="{ 'px-4 py-2 bg-gray-800': selected, 'px-4 py-2 bg-transparent': !selected, 'outline-none': true }">
            Feeds Data
          </button>
        </HeadlessTab>
      </HeadlessTabList>
      <HeadlessTabPanels>
        <HeadlessTabPanel class="mt-6">
          <PageFeed />
        </HeadlessTabPanel>
        <HeadlessTabPanel class="mt-6">
          <PageFeedHistory />
        </HeadlessTabPanel>
        <HeadlessTabPanel class="mt-6">
          <PageFeedTable />
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>
