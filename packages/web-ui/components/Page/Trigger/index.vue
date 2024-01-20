<script lang="ts" setup>
const datatable = ref<any>(null)
const editModalData = ref<ApiV1.Model.Trigger>()
const editModalMode = ref<'edit' | 'create'>('edit')

const deleteFeed = async (id: number) => {
  const confirm = window.confirm('Are you sure?')
  try {
    if (!confirm) return
    const res = await $fetch(parseApiURL(`/triggers/${id}`), {
      method: 'DELETE',
    })
    console.log(res)
  } catch (error) {
    console.error(error)
  }
  datatable.value?.refresh()
}
</script>

<template>
  <div>
    <DataTable
      ref="datatable"
      title="Bot Triggers"
      :columns="[
        { key: 'name', data: 'name', label: 'Name' },
        { key: 'action', label: '' }
      ]"
      :rows="[]"
      :api-url="parseApiURL('/triggers')"
    >
      <template #action>
        <button class="px-4 py-2 bg-gray-800 text-sm rounded" @click="() => {
          editModalData = {
            config: {
              pipes: [
                { name: 'output', option: { bots: [] } } as ApiV1.Model.TriggerPipe.Output,
              ]
            },
            id: -1,
            name: 'your trigger name',
          }
          editModalMode = 'create'
        }">
          New
        </button>
      </template>
      <template #col-action="{ data }">
        <UDropdown
          :items="[
            [
              {
                label: 'Edit',
                icon: 'i-heroicons-pencil-square-20-solid',
                click: () => {
                  editModalData = data
                  editModalMode = 'edit'
                },
              },
            ],
            [
              {
                label: 'Delete',
                icon: 'i-heroicons-trash-20-solid',
                click: () => deleteFeed(data.id),
              },
            ]
          ]"
        >
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
        <!-- <button class="text-sm text-gray-200">
          Edit
        </button> -->
      </template>
    </DataTable>
    <PageTriggerModalTrigger
      v-if="editModalData"
      :mode="editModalMode"
      :data="editModalData"
      @close="() => {
        editModalData = undefined
        datatable?.refresh()
      }"
    />
  </div>
</template>