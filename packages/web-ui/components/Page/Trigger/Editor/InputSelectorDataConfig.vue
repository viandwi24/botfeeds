<script lang="ts" setup>
const props = defineProps({
  runtimeContext: {
    type: Object as PropType<ApiV1.Model.TriggerRuntimeContext['preparedPipes'][0]>,
    required: true
  },
  config: {
    type: Object as PropType<ApiV1.Model.TriggerConfigPipeWithDefaultOption>,
    required: true
  },
  itemType: {
    type: String,
    required: false
  }
})


const inputKey = ref(props?.config?.option?.input)

watch(inputKey, (value) => {
  props.config['option']['input'] = value
})

onMounted(() => {
  const a = props.runtimeContext.inputs.find(item => item[0] === inputKey.value)
  if (!a) {
    inputKey.value = undefined
  }
})

</script>

<template>
  <div class="flex flex-col gap-2">
    <label>Select Input Variable</label>
    <div>
      <div class="">
        <USelectMenu
          v-model="inputKey"
          :options="runtimeContext.inputs.filter(item => (itemType) ? (itemType === item[1]) : true).map((item) => item[0])"
        />
      </div>
      <!-- <UDropdown
        :items="[runtimeContext.inputs.filter(item => (itemType) ? (itemType === item[1]) : true).map((item) => ({
          label: item[0],
          click: () => {
            config['option']['input'] = item[0]
          }
        }))]"
      >
        <UButton color="white" :label="config.option.input" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown> -->
    </div>
  </div>
</template>