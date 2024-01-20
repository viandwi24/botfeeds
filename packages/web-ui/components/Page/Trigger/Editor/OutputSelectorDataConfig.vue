<script lang="ts" setup>
const props = defineProps({
  config: {
    type: Object as PropType<ApiV1.Model.TriggerConfigPipe>,
    required: true
  },
})

const data = ref({ ...props.config as any })
const outputKey = ref(data.value?.option?.output[0])
watch(outputKey, (val) => {
  try {
    data.value.option.output[0] = val
  } catch (error) {
    data.value['option']['output'] = [val, 'string']
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label>Variable Output</label>
    <div class="flex items-center">
      <UInput
        placeholder="Prompt"
        v-model="outputKey"
        class="flex-1"
      />
      <span>, {{ data.option.output[1] }}</span>
    </div>
  </div>
</template>