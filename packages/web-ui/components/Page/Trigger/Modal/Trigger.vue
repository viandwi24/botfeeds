<script lang="ts" setup>
import debounce from 'lodash/debounce'
const props = defineProps({
  data: {
    type: Object as PropType<ApiV1.Model.Trigger>,
    required: true
  },
  mode: {
    type: String as PropType<'edit' | 'create'>,
    required: true
  }
})
const emit = defineEmits(['close'])

const toast = useToast()
const data = ref<ApiV1.Model.Trigger>(props.data)
const bots = ref<ApiV1.Model.Bot[]>([])
const isLoading = ref(false)

const fetch = async () => {
  const _resBots = await $fetch<ApiV1.Bot.GetBots>(parseApiURL('/bots'))
  bots.value = _resBots.data || []
  console.log('getted data bot', bots.value)
}

// const selectedBots = ref<number[]>([ ...data.value.Bots.map((item) => item.id) ])

const save = async () => {
  try {
    if (props.mode === 'edit') {
      const res = await $fetch(parseApiURL(`/triggers/${props.data.id}`), {
        method: 'PUT',
        body: JSON.stringify({
          name: data.value.name,
          config: {
            ...data.value.config,
          },
          // bots: selectedBots.value
        })
      })
      console.log(res)
    } else {
      const res = await $fetch(parseApiURL(`/triggers`), {
        method: 'POST',
        body: JSON.stringify({
          name: data.value.name,
          config: {
            ...data.value.config,
          },
        })
      })
      console.log(res)
    }

    toast.add({
      title: 'Success',
      description: `Source ${data.value.name} saved`,
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
  // close
  emit('close')
}

const currentConfig = ref<ApiV1.Model.TriggerConfig>({ ...data.value.config })
const runtimeContext = ref<ApiV1.Model.TriggerRuntimeContext>()
const getTgetTestedContextFromRuntimeLoading = ref(false)
const getTestedContextFromRuntime = async () => {
  try {
    getTgetTestedContextFromRuntimeLoading.value = true
    const res = await $fetch(parseApiURL(`/triggers/test-runtime`), {
      method: 'POST',
      body: JSON.stringify({
        config: currentConfig.value
      })
    })
    runtimeContext.value = (res as any)?.data?.context
    console.log('getTestedContextFromRuntime', runtimeContext.value)
  } catch (error) {
    console.error(error)
  }
  getTgetTestedContextFromRuntimeLoading.value = false
}
const getPipeContextByIndex = (runtimeContext: ApiV1.Model.TriggerRuntimeContext, index: number) => {
  return runtimeContext.preparedPipes[index]
}
// watch currentConfig change with lodash debounce 1s with useDebounce
const debouncedGetTestedContextFromRuntime = debounce(getTestedContextFromRuntime, 1000)
watch(currentConfig, () => {
  debouncedGetTestedContextFromRuntime()
}, { deep: true })

onMounted(async () => {
  isLoading.value = true
  await fetch()
  getTestedContextFromRuntime()
  isLoading.value = false
  console.warn('AOWEKOWKEOAWE', currentConfig.value)
})


// watch
const modalAddPipeList = ref([
  {
    name: 'chatgpt.commander',
    label: 'Chat GPT - Commander Prompt',
    initialConfig: {
      name: 'chatgpt.commander',
      option: {
        input: undefined,
        prompt: 'input your prompt here',
        output: ['Summarized', 'string']
      }
    },
  },
  {
    name: 'filter.simple',
    label: 'Filter - Simple',
    initialConfig: {
      name: 'filter.simple',
      option: { input: undefined, blacklistWords: ['ngentod'], output: ['Filtered', 'string'] }
    },
  },
])
const modalAddPipe = ref<{
  show: boolean
  pipe: 'chatgpt.commander' | 'filter.simple'
  currI: number
  mode: 'after' | 'before'
}>()
const modalAddPipeActionSave = () => {
    const pipe = modalAddPipeList.value.find((item) => item.name === modalAddPipe.value?.pipe)
  if (modalAddPipe.value && modalAddPipe.value.pipe && pipe) {
    let prevI = 0
    if (modalAddPipe.value.mode === 'after') {
      const _prevI = modalAddPipe.value.currI
      prevI = _prevI + 1
    } else {
      const _prevI = modalAddPipe.value.currI
      prevI = _prevI
    }

    // inject data
    if (pipe) {
      currentConfig.value.pipes.splice(prevI, 0, pipe.initialConfig)
    }

    // close
    modalAddPipe.value.show = false
  }
}
</script>

<template>
  <Modal
    :open="true"
    :title="mode === 'edit' ? 'Edit Trigger' : 'Create Trigger'"
    modalSize="2xl"
    @close="() => $emit('close')"
  >
    <div v-if="true" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label>Name</label>
        <UInput v-model="data.name" />
      </div>
      <div class="h-0.5 w-full bg-gray-500 rounded" />
      <div class="flex flex-col gap-2">
        <div class="font-semibold">
          Pipes
          <span v-if="getTgetTestedContextFromRuntimeLoading">Testing in runtime...</span>
        </div>
        <div v-if="runtimeContext && currentConfig && data" class="flex flex-col gap-4">
          <div v-for="(pipe, i) in currentConfig.pipes" :key="i">
            <div class="flex flex-col gap-2 items-center justify-center mb-3">
              <PageTriggerEditorRuntimeContextInputsViewer :runtime-context="runtimeContext.preparedPipes[i]" />
              <div>
                <Icon name="i-heroicons-arrow-down-20-solid" class="text-gray-500 text-2xl" />
              </div>
            </div>
            <div class="py-4 rounded border border-gray-500">
              <div class="font-semibold pb-4 w-full text-center border-b border-gray-500">{{ pipe.name }}</div>
              <div class="px-4 pt-4">
                <LazyPageTriggerEditorChatGptCommanderPipe
                  v-if="pipe.name === 'chatgpt.commander'"
                  :i="i"
                  :trigger="data"
                  :config="currentConfig.pipes[i]"
                  :runtimeContext="runtimeContext"
                />
                <LazyPageTriggerEditorFilterSimplePipe
                  v-if="pipe.name === 'filter.simple'"
                  :i="i"
                  :trigger="data"
                  :config="currentConfig.pipes[i]"
                  :runtimeContext="runtimeContext"
                />
                <LazyPageTriggerEditorOutputPipe
                  v-if="pipe.name === 'output'"
                  :i="i"
                  :trigger="data"
                  :config="currentConfig.pipes[i]"
                  :runtimeContext="runtimeContext"
                  :bots="bots"
                  @config-updated="(newConfig) => {
                    (currentConfig.pipes[i] as any)['option']['bots'] = newConfig
                  }"
                />
              </div>
              <div class="px-4 mt-4 pt-4 flex justify-between items-center border-t border-gray-500 text-sm">
                <div>
                  <div v-if="getPipeContextByIndex(runtimeContext, i).outputs.length > 0">
                    <div>
                      Output Variable :
                      <span v-for="(item, j) in getPipeContextByIndex(runtimeContext, i).outputs" :key="j">
                        {{ item[0] }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <UButton
                    size="xs"
                    color="green"
                    label="+"
                    icon="i-heroicons-arrow-up-20-solid"
                    @click.prevent="() => {
                      modalAddPipe = {
                        show: true,
                        pipe: 'chatgpt.commander',
                        currI: i,
                        mode: 'before'
                      }
                    }"
                  />
                  <template v-if="pipe.name !== 'output'">
                    <UButton
                      size="xs"
                      color="green"
                      label="+"
                      icon="i-heroicons-arrow-down-20-solid"
                      @click.prevent="() => {
                        modalAddPipe = {
                          show: true,
                          pipe: 'chatgpt.commander',
                          currI: i,
                          mode: 'after'
                        }
                      }"
                    />
                  <UButton
                    size="xs"
                    color="red"
                    icon="i-heroicons-trash-20-solid"
                    @click.prevent="() => {
                      currentConfig.pipes.splice(i, 1)
                    }"
                  />
                  </template>
                </div>
              </div>
            </div>
            <div v-if="i !== currentConfig.pipes.length - 1" class="flex items-center justify-center mt-3">
              <Icon name="i-heroicons-arrow-down-20-solid" class="text-gray-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <template #footer-actions>
      <button class="px-4 py-2 bg-blue-400 text-sm rounded" @click="save">Save</button>
    </template>

    <Teleport to="body">
      <Modal
        :open="modalAddPipe && modalAddPipe.show"
        title="Add Pipe"
        @close="() => {
          if (modalAddPipe) {
            modalAddPipe.show = false
          }
        }"
      >
        <div v-if="modalAddPipe" class="flex flex-col">
          <div class="flex flex-col gap-2">
            <label>Pipe</label>
            <USelect
              v-model="modalAddPipe.pipe"
              :options="modalAddPipeList"
              placeholder="Select Pipe"
              value-attribute="name"
              option-attribute="label"
            />
          </div>
        </div>
        <template #footer-actions>
          <UButton
            color="green"
            label="Add"
            @click.prevent="modalAddPipeActionSave"
          />
        </template>
      </Modal>
    </Teleport>
  </Modal>
</template>