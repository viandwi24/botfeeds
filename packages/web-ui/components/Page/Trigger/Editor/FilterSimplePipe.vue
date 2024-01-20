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

const data = ref<ApiV1.Model.TriggerPipe.FilterSimple>({ ...props.config as any })
const pipeContext = computed(() => {
  return props.runtimeContext.preparedPipes[props.i]
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <PageTriggerEditorInputSelectorDataConfig :runtime-context="pipeContext" :config="(config as any)" />
      <div class="flex flex-col gap-2">
        <label>Blacklist Words</label>
        <div>
          <UButton
            size="xs"
            color="green"
            @click="() => data.option.blacklistWords.push('')"
            icon="i-heroicons-plus-20-solid"
            label="Add"
            class="mb-2"
          />
          <div v-for="(item, i) in data.option.blacklistWords" class="flex">
            <UButton
              class="mr-2"
              size="xs"
              color="red"
              @click="() => data.option.blacklistWords.splice(i, 1)"
              icon="i-heroicons-minus-20-solid"
            />
            <UInput class="" v-model="data.option.blacklistWords[i]" />
          </div>
        </div>
      </div>
      <PageTriggerEditorOutputSelectorDataConfig :config="data" itemType="string" />
    </div>
  </div>
</template>