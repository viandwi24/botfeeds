<template>
  <div>
    <HeadlessTabGroup>
      <HeadlessTabList class="flex rounded overflow-hidden w-auto">
        <HeadlessTab as="template" v-slot="{ selected }">
          <button :class="{ 'px-4 py-2 bg-gray-800': selected, 'px-4 py-2 bg-transparent': !selected, 'outline-none': true }">
            Triggers
          </button>
        </HeadlessTab>
        <!-- <HeadlessTab as="template" v-slot="{ selected }">
          <button :class="{ 'px-4 py-2 bg-gray-800': selected, 'px-4 py-2 bg-transparent': !selected, 'outline-none': true }">
            Feed Item Triggered
          </button>
        </HeadlessTab> -->
      </HeadlessTabList>
      <HeadlessTabPanels>
        <HeadlessTabPanel class="mt-6">
          <PageTrigger />
        </HeadlessTabPanel>
        <HeadlessTabPanel class="mt-6">
          <PageTriggerHistory />
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>
