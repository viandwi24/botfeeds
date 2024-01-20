<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="rounded border border-gray-600">
    <div class="px-6 pt-4 flex items-center justify-between">
      <slot name="header">
        <div class="text-2xl">
          <slot name="title">{{ title }}</slot>
        </div>
      </slot>
      <div class="flex gap-4">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="relative overflow-hidden flex-1 flex">
      <slot></slot>
    </div>
  </div>
</template>