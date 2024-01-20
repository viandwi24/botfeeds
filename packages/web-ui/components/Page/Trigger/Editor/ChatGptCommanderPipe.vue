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
  }
})

const data = ref<ApiV1.Model.TriggerPipe.ChatGptCommander>({ ...props.config as any })
const pipeContext = computed(() => {
  return props.runtimeContext.preparedPipes[props.i]
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <!-- <PageTriggerEditorInputSelectorDataConfig :runtime-context="pipeContext" :config="(config as any)" /> -->
      <div class="flex flex-col gap-2">
        <label>Prompt</label>
        <UTextarea
          placeholder="Prompt"
          v-model="data.option.prompt"
        />
      </div>
      <PageTriggerEditorOutputSelectorDataConfig :config="data" />
    </div>
  </div>
</template>