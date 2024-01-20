<script lang="ts" setup>
const props = defineProps({
  i: {
    type: Number,
    required: true
  },
  trigger: {
    type: Object as PropType<ApiV1.Model.Trigger>,
    required: true
  },
  config: {
    type: Object as PropType<ApiV1.Model.TriggerConfigPipe>,
    required: true
  },
  runtimeContext: {
    type: Object as PropType<ApiV1.Model.TriggerRuntimeContext>,
    required: true
  },
  bots: {
    type: Array as PropType<ApiV1.Model.Bot[]>,
    required: true
  }
})

const emit = defineEmits<{
  (event: 'config-updated', newBotOption: ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot[]): void
}>()

const data = ref<ApiV1.Model.TriggerPipe.Output>({ ...props.config as any })
// const pipeContext = computed(() => {
//   return props.runtimeContext.preparedPipes[props.i]
// })

const botsOptions = ref<(ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot & { bot?: ApiV1.Model.Bot })[]>([ ...data.value.option.bots ])
watch(botsOptions, () => {
  emit('config-updated', botsOptions.value.map((item) => {
    return {
      id: item.id,
      content: item.content,
      telegram: item.telegram,
      twitter: item.twitter,
    }
  }))
  // data.value.option.bots = botsOptions.value.map((item) => {
  //   return {
  //     id: item.id,
  //     content: item.content,
  //     telegram: item.telegram,
  //     twitter: item.twitter,
  //   }
  // })
}, { deep: true })

const addNewBot = (id: number) => {
  console.log(id)
  const botdata = props.bots.find((item) => item.id === id)
  if (!botdata) return

  let newOpt = {
    id: botdata.id,
    content: '',
    bot: botdata
  } as ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot
  if (botdata.service === 'twitter') {
    newOpt['twitter'] = {}
  } else if (botdata.service === 'telegram') {
    newOpt['telegram'] = {
      chatIds: []
    }
  }

  botsOptions.value.push(newOpt)
}

const fetch = async () => {
  const beforeBotIds = botsOptions.value.map((item) => item.id)
  const beforeBotsOptions = [ ...botsOptions.value ]
  const botsDataDependBotsBefore = props.bots.filter((item) => beforeBotIds.includes(item.id))

  const newsBotsOptions: (ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot & { bot?: ApiV1.Model.Bot })[] = []
  console.log('AOKEOKOKE', props.bots.map(item => item.name), botsOptions.value, beforeBotsOptions, botsDataDependBotsBefore)
  for (const botData of botsDataDependBotsBefore) {
    const existBotOption = beforeBotsOptions.find((item) => item.id === botData.id)

    if (existBotOption) {
      newsBotsOptions.push({
        ...existBotOption,
        bot: botData
      })
    }
  }

  botsOptions.value = newsBotsOptions
}

onMounted(async () => {
  let maxtry = 3
  let trycount = 0
  while (trycount < maxtry) {
    try {
      await fetch()
      console.log('getted data bot', botsOptions.value.length, botsOptions.value)
      console.warn({
        botsOptions: botsOptions.value,
        props: {
          bots: props.bots,
          config: props.config,
        }
      })
      if (botsOptions.value.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 250))
        throw new Error('No bots')
      }
      break
    } catch (error) {
      console.error(error)
      trycount++
    }
  }
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="font-bold">Bots</div>
        <div class="flex items-center gap-2">
          <USelectMenu
            :options="[...props.bots].filter((item) => !botsOptions.find((s) => s.id === item.id))"
            placeholder="Select bots to add"
            value-attribute="id"
            option-attribute="name"
            @change="async (value) => {
              addNewBot(value as any)
            }"
          />
        </div>
        <div class="flex flex-col gap-4">
          <div v-for="(bot, i) in botsOptions" class="border border-gray-500 px-2 py-2 flex flex-col gap-2">
            <div class="flex justify-between">
              <div class="mb-2 font-semibold">[{{ bot.bot?.service }}] {{ bot.bot?.name }}</div>
              <UButton
                size="xs"
                color="red"
                @click="() => botsOptions.splice(i, 1)"
                icon="i-heroicons-trash-20-solid"
                label="Remove"
              />
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label>Content</label>
                <UTextarea v-model="botsOptions[i].content" :rows="10" />
              </div>
            </div>

            <PageTriggerEditorOutputPipeBotConfigTelegram
              v-if="botsOptions[i].bot?.service === 'telegram'"
              :config="botsOptions[i]"
              @config-updated="(newConfig) => {
                botsOptions[i]['telegram'] = newConfig.telegram
              }"
            />
          </div>
        </div>
        <!-- <div>
          {{ botsOptions }}
        </div> -->
      </div>
    </div>
  </div>
</template>