<script lang="ts" setup>
const props = defineProps({
  mode: {
    type: String as PropType<'edit' | 'create'>,
    required: true
  },
  data: {
    type: Object as PropType<ApiV1.Model.Feed>,
    required: true
  },
})
const emit = defineEmits(['close'])

const toast = useToast()

const data = ref<ApiV1.Model.Feed>(props.data)
const triggers = ref<ApiV1.Model.Trigger[]>([])

const fetch = async () => {
  const _resTriggers = await $fetch<ApiV1.Trigger.GetTriggers>(parseApiURL('/triggers'))
  triggers.value = _resTriggers.data || []
}

onMounted(() => {
  fetch()
})


const selectedTriggers = ref<number[]>([ ...data.value.Triggers.map((item) => item.id) ])

const save = async () => {
  try {
    if (props.mode === 'edit') {
      const res = await $fetch(parseApiURL(`/feeds/${props.data.id}`), {
        method: 'PUT',
        body: JSON.stringify({
          name: data.value.name,
          url: data.value.url,
          config: {
            ...data.value.config,
          },
          triggers: selectedTriggers.value
        })
      })

      toast.add({
        title: 'Success',
        description: `Source ${data.value.name} saved`,
        color: 'green'
      })
    } else {
      const res = await $fetch(parseApiURL(`/feeds/`), {
        method: 'POST',
        body: JSON.stringify({
          name: data.value.name,
          url: data.value.url,
          config: {
            ...data.value.config,
          },
          triggers: selectedTriggers.value
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
</script>

<template>
  <Modal
    :open="true"
    :title="props.mode === 'edit' ? 'Edit Source' : 'New Source'"
    modalSize="2xl"
    @close="() => $emit('close')"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label>Name</label>
        <UInput v-model="data.name" />
      </div>
      <div class="flex flex-col gap-2">
        <label>RSS URL</label>
        <UInput v-model="data.url" />
      </div>
      <div class="flex flex-col gap-2">
        <label>Triggers when item getted</label>
        <USelectMenu
          v-model="selectedTriggers"
          :options="triggers"
          placeholder="Select triggers"
          value-attribute="id"
          option-attribute="name"
          multiple
        />
        <div v-if="selectedTriggers.length > 0" class="flex flex-col gap-1">
          <div class="w-full" v-for="(item, i) in triggers.filter((item) => selectedTriggers.find(s => item.id === s))" :key="i">
            <span class="text-sm px-2 py-1 w-full rounded bg-primary-500">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="w-full h-0.5 border-b border-gray-500" />
      <div>Options</div>
      <div class="flex gap-2">
        <label class="w-1/4">Max Items to Get</label>
        <div class="flex items-center">
          <UInput type="number" v-model="data.config.maxItemGet" min="1" />
          <div class="text-xs italic ml-1 text-yellow-600">* only get {{ data.config.maxItemGet }} newest item from RSS</div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <UCheckbox v-model="data.config.forceSameItem" label="Force Same Item (if item already exist force to trigger again)" />
      </div>
    </div>
    
    <template #footer-actions>
      <button class="px-4 py-2 bg-blue-400 text-sm rounded" @click="save">Save</button>
    </template>
  </Modal>
</template>