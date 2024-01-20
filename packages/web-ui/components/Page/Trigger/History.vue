<template>
  <div>
    <DataTable
      title="Triggered History"
      :columns="[
        { key: 'name', data: 'name', label: 'Name' },
        { key: 'bots', label: 'Bots' },
        { key: 'action', label: '' }
      ]"
      :rows="[]"
      :api-url="parseApiURL('/triggers')"
    >
      <template #action>
        <button class="px-4 py-2 bg-gray-800 text-sm rounded" @click="() => {}">
          New
        </button>
      </template>
      <template #col-bots="{ data }">
        <div v-html="[...data?.Bots || []].map((item) => `<span>${item?.name}</span>`).join(', ')"></div>
      </template>
      <template #col-action="{}">
        <button class="text-sm text-gray-200" @click="() => {}">
          View
        </button>
      </template>
    </DataTable>
  </div>
</template>