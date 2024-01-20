<script lang="ts" setup>
const props = defineProps({
  mode: {
    type: String as PropType<'edit' | 'create'>,
    required: true
  },
  data: {
    type: Object as PropType<ApiV1.Model.Bot>,
    required: true
  },
})
const emit = defineEmits(['close'])

const toast = useToast()

const data = ref<ApiV1.Model.Bot>(props.data)

const save = async () => {
  try {
    if (props.mode === 'edit') {
      const res = await $fetch(parseApiURL(`/bots/${props.data.id}`), {
        method: 'PUT',
        body: JSON.stringify({
          name: data.value.name,
          config: data.value.config,
        })
      })

      toast.add({
        title: 'Success',
        description: `Source ${data.value.name} saved`,
        color: 'green'
      })
    } else {
      const res = await $fetch(parseApiURL(`/bots/`), {
        method: 'POST',
        body: JSON.stringify({
          name: data.value.name,
          service: data.value.service,
          config: data.value.config,
        })
      })

      toast.add({
        title: 'Success',
        description: `Source ${data.value.name} created`,
        color: 'green'
      })
    }

    // close
    emit('close')
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: `Error: ${error}`,
      color: 'red'
    })
  }
}

onMounted(() => console.log(props.data))
</script>

<template>
  <Modal
    :open="true"
    :title="props.mode === 'edit' ? 'Edit Bot' : 'New Bot'"
    modalSize="2xl"
    @close="() => $emit('close')"
  >
    <div class="flex flex-col gap-4">
      <div v-if="mode === 'edit'" class="flex flex-col gap-2">
        <label>Current Status</label>
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
      </div>
      <div class="flex flex-col gap-2">
        <label>Name</label>
        <UInput v-model="data.name" />
      </div>
      <div class="w-full h-0.5 border-b border-gray-500" />
      <template v-if="data.config.telegram">
        <div class="flex flex-col gap-2">
          <label>Api Hash</label>
          <UInput v-model="data.config.telegram.apiHash" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Api Id</label>
          <UInput type="number" v-model="data.config.telegram.apiId" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Bot Api Token</label>
          <UInput v-model="data.config.telegram.botApiToken" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Session</label>
          <UInput v-model="data.config.telegram.session" />
          <div class="text-red-500 text-xs">*nb: ignore this, this only session string saved from telegram to authorize our bot</div>
        </div>
      </template>
      <template v-else-if="data.config.twitter">
        <div class="flex flex-col gap-2">
          <label>Access Token</label>
          <UInput v-model="data.config.twitter.accessToken" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Access Secret</label>
          <UInput v-model="data.config.twitter.accessTokenSecret" />
        </div>
        <div class="flex flex-col gap-2">
          <label>App Key</label>
          <UInput v-model="data.config.twitter.apiKey" />
        </div>
        <div class="flex flex-col gap-2">
          <label>App Secret</label>
          <UInput v-model="data.config.twitter.apiSecret" />
        </div>
      </template>
    </div>
    
    <template #footer-actions>
      <button class="px-4 py-2 bg-blue-400 text-sm rounded" @click="save">
        <span v-if="mode === 'create'">Save</span>
        <span v-if="mode === 'edit'">Save & Restart</span>
      </button>
    </template>
  </Modal>
</template>