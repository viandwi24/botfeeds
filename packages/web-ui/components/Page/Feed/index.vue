<script lang="ts" setup>
const toast = useToast()

const datatable = ref<any>(null)
const editModalMode = ref<'edit' | 'create'>('edit')
const editModalData = ref<ApiV1.Model.Feed>()

const run = async (item: ApiV1.Model.Feed) => {
  const toast = useToast()
  const rand = Math.random()
  toast.add({
    id: `feed-run-${item.id}${rand}`,
    title: `Running feed ${item.name}`,
    description: 'Please wait...',
    color: 'gray',
    timeout: 0,
  })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const res = await fetch(parseApiURL(`/feeds/${item.id}/run`), {
      method: 'POST'
    })
    console.log(await res.json())
    toast.remove(`feed-run-${item.id}${rand}`)
    toast.add({
      id: `feed-runned-${item.id}-${Math.random()}`,
      title: `Feed ${item.name} runned`,
      color: 'green',
      icon: 'i-heroicons-check-circle'
    })
  } catch (error) {
    toast.remove(`feed-run-${item.id}${rand}`)
    toast.add({
      id: `feed-runned-${item.id}-${Math.random()}`,
      title: `Feed ${item.name} failed to run`,
      color: 'red',
      icon: 'i-heroicons-x-circle'
    })
  }
}

const resetFeed = async (id: number) => {
  const confirm = window.confirm('Are you sure?')
  try {
    if (!confirm) return
    const res = await $fetch(parseApiURL(`/feeds/${id}/reset`), {
      method: 'POST',
    })
    console.log(res)
    toast.add({
      title: 'Success',
      description: `Feed ${id} resetted`,
      color: 'green'
    })
  } catch (error) {
    console.error(error)
  }
}

const deleteFeed = async (id: number) => {
  const confirm = window.confirm('Are you sure?')
  try {
    if (!confirm) return
    const res = await $fetch(parseApiURL(`/feeds/${id}`), {
      method: 'DELETE',
    })
    console.log(res)
    toast.add({
      title: 'Success',
      description: `Feed ${id} deleted`,
      color: 'green'
    })
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
      title="Sources"
      :columns="[
        { key: 'name', data: 'name', label: 'Name' },
        { key: 'rss', data: 'url', label: 'rss' },
        // { key: 'lastUpdateDate', data: 'lastUpdateDate', label: 'Last Updated' },
        // { key: 'lastUpdateItemsCount', data: 'lastUpdateItemsCount', label: 'Last Count' },
        { key: 'triggers', label: 'Triggers' },
        { key: 'action', label: '' }
      ]"
      :rows="[]"
      :api-url="parseApiURL('/feeds')"
    >
      <template #action>
        <button
          class="px-4 py-2 bg-gray-800 text-sm rounded"
          @click="() => {
            editModalMode = 'create'
            editModalData = {
              id: -1,
              config: {
                forceSameItem: false,
                maxItemGet: 10,
              },
              name: 'your source name',
              url: '',
              Triggers: [],
            }
          }"
        >
          New
        </button>
      </template>
      <template #col-triggers="{ data }">
        <div v-html="[...data?.Triggers || []].map((item) => item?.name).join('<br>')"></div>
      </template>
      <template #col-action="{ data }">
        <UDropdown
          :items="[
            [
              {
                label: 'Edit',
                icon: 'i-heroicons-pencil-square-20-solid',
                click: () => {
                  editModalMode = 'edit'
                  editModalData = data
                },
              },
              {
                label: 'Run (Test)',
                icon: 'i-heroicons-play-20-solid',
                click: () => run(data),
              },
            ],
            [
              {
                label: 'Reset Feed Items',
                icon: 'i-heroicons-archive-box-arrow-down-16-solid',
                click: () => resetFeed(data.id),
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
        <!-- <div class="flex gap-2 divide-x divide-dotted divide-gray-500">
          <button class="text-sm text-gray-200" @click="() => editModalData = data">
            Edit
          </button>
          <button class="pl-2 text-sm text-gray-200" @click="() => run(data)">
            Run (Test)
          </button>
          <button class="pl-2 text-sm text-red-400" @click="() => editModalData = data">
            Reset Items
          </button>
        </div> -->
      </template>
    </DataTable>
    <PageFeedModalSource
      v-if="editModalData"
      :data="editModalData"
      :mode="editModalMode"
      @close="() => {
        editModalData = undefined
        datatable?.refresh()
      }"
    />
  </div>
</template>