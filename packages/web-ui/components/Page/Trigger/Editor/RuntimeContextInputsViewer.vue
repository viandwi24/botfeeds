<script lang="ts" setup>
const props = defineProps({
  runtimeContext: {
    type: Object as PropType<ApiV1.Model.TriggerRuntimeContext['preparedPipes'][0]>,
    required: true
  }
})
const toast = useToast()
const copyClip = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    const input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  toast.add({
    title: 'Copied',
    description: `Copied ${text}`,
    color: 'green'
  })
}
</script>

<template>
  <UDropdown
    :items="[runtimeContext.inputs.map((item) => ({
      label: `{{${item[0]}}}`,
      click: () => copyClip(`{{${item[0]}}}`)
    }))]"
  >
    <UButton color="white" label="Variables" trailing-icon="i-heroicons-chevron-down-20-solid" />
  </UDropdown>
</template>