<script lang="ts" setup>
const props = defineProps({
  service: {
    type: String as PropType<'telegram' | 'twitter'>,
    required: true
  },
})

const toast = useToast()

const datatable = ref<any>(null)
const editModalMode = ref<'edit' | 'create'>('edit')
const editModalData = ref<ApiV1.Model.Bot>()

const nodeAction = async (id: number, action: 'restart' | 'stop' | 'start' = 'restart') => {
  try {
    const res = await $fetch(parseApiURL(`/bots/${id}/action/${action}`), {
      method: 'POST',
    })

    toast.add({
      title: 'Success',
      description: `Bot ${id} ${action} success`,
      color: 'green'
    })
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: `Error: ${error}`,
      color: 'red'
    })
  }
}

const botDelete = async (id: number) => {
  const confirm = window.confirm('Are you sure?')
  try {
    if (!confirm) return
    const res = await $fetch(parseApiURL(`/bots/${id}`), {
      method: 'DELETE',
    })
    console.log(res)
  } catch (error) {
    console.error(error)
  }
  datatable.value?.refresh()
}

// let interavl: any
// onMounted(() => {
//   interavl = setInterval(() => {
//     datatable.value?.refresh()
//   }, 5000)
// })
// onBeforeUnmount(() => {
//   clearInterval(interavl)
// })
</script>

<template>
  <div>
    <DataTable
      ref="datatable"
      :title="`${capitalizeEachWord(service)} Bot`"
      :columns="[
        { key: 'name', data: 'name', label: 'Name' },
        { key: 'status', label: 'status' },
        { key: 'action', label: '' }
      ]"
      :rows="[]"
      :api-url="parseApiURL(`/bots/${service}`)"
    >
      <template #action>
        <button
          class="px-4 py-2 bg-gray-800 text-sm rounded"
          @click="() => {
            let config = {}
            
            if (props.service === 'telegram') {
              config = {
                telegram: {
                  apiHash: '',
                  apiId: 0,
                  botApiToken: '',
                  session: '',
                }
              }
            } else if (props.service === 'twitter') {
              config = {
                twitter: {
                  apiKey: '',
                  apiSecret: '',
                  accessToken: '',
                  accessTokenSecret: '',
                }
              }
            }

            editModalMode = 'create'
            editModalData = {
              id: -1,
              name: '',
              service: props.service,
              config,
            }
          }"
        >
          New
        </button>
      </template>
      <template #col-status="{ data }">
        <div class="flex items-center gap-2">
          <span
            :class="{
              'h-2 w-2 rounded-full': true,
              'bg-green-500': data.status === 'connected',
              'bg-red-500': data.status === 'disconnected',
              'bg-yellow-500': data.status === 'started',
              'bg-gray-500': data.status === 'stopped',
            }"
          />
          {{ data.status }}
        </div>
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
            ],
            [
              {
                label: 'Delete',
                icon: 'i-heroicons-trash-20-solid',
                click: () => botDelete(data.id),
              },
            ],
            [
              {
                label: 'Start',
                icon: 'i-heroicons-play-20-solid',
                click: () => nodeAction(data.id, 'start'),
              },
              {
                label: 'Stop',
                icon: 'i-heroicons-stop-20-solid',
                click: () => nodeAction(data.id, 'stop'),
              },
              {
                label: 'Restart',
                icon: 'i-heroicons-arrow-path-20-solid',
                click: () => nodeAction(data.id, 'restart'),
              },
            ]
          ]"
        >
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </DataTable>
    <PageBotModalBot
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
