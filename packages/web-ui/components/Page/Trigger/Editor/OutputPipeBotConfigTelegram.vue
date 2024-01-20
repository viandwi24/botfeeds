<script lang="ts" setup>
const props = defineProps({
  config: {
    type: Object as PropType<ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot>,
    required: true
  },
})

// emit configUpdated(newConfig: ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot)
const emit = defineEmits<{
  (e: 'configUpdated', newConfig: ApiV1.Model.TriggerPipe.TriggerConfigPipeOptionBot): void,
}>()

const chatIds = ref<string[]>([ ...props.config.telegram?.chatIds ?? [] ])
watch(chatIds, () => {
  emit('configUpdated', {
    ...props.config,
    telegram: {
      ...props.config.telegram,
      chatIds: chatIds.value
    }
  })
}, { deep: true })

</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <label>Chat Ids (Channel / Group id)</label>
      <div>
        <UButton
          size="xs"
          color="green"
          @click="() => chatIds.push('')"
          icon="i-heroicons-plus-20-solid"
          label="Add"
          class="mb-2"
        />
      </div>
      <div v-for="(item, i) in chatIds" class="flex">
        <UButton
          class="mr-2"
          size="xs"
          color="red"
          @click="() => chatIds.splice(i, 1)"
          icon="i-heroicons-minus-20-solid"
        />
        <UInput class="" v-model="chatIds[i]" />
      </div>
    </div>
  </div>
</template>