<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  withClose: {
    type: Boolean,
    default: true,
  },
  modalSize: {
    type: String,
    default: 'lg',
  }
})
const emits = defineEmits(['close'])

const close = () => {
  emits('close')
}
</script>

<template>
  <Teleport to="body">
    <HeadlessDialog :open="open" @close="close" class="relative z-50">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <HeadlessDialogPanel
            :class="{
              'w-full rounded-lg text-gray-100 bg-gray-800 px-6 py-4': true,
              'max-w-md': modalSize === 'sm',
              'max-w-lg': modalSize === 'md',
              'max-w-xl': modalSize === 'lg',
              'max-w-2xl': modalSize === 'xl',
              'max-w-3xl': modalSize === '2xl',
            }"
          >
            <slot name="header">
              <HeadlessDialogTitle class="text-2xl font-bold mb-4">{{ title }}</HeadlessDialogTitle>
            </slot>
            <div class="flex-1 mb-4">
              <slot />
            </div>
            <slot name="footer">
              <div class="flex justify-end gap-2">
                <button v-if="withClose" class="px-4 py-2 bg-red-400 text-sm rounded" @click="close">Cancel</button>
                <slot name="footer-actions" />
              </div>
            </slot>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </Teleport>
</template>