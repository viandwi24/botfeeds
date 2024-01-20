<script lang="ts" setup>
export interface ColumnItem {
  key: string
  label: string
  data?: string
  type?: 'string' | 'number' | 'date'
}

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnItem[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    default: [],
  },
  title: {
    type: String,
    default: '',
  },
  apiUrl: {
    type: String,
    default: undefined,
  },
})

const isLoading = ref(true)
const data = ref([...props.data || []])
const columns = toRef(props, 'columns')

const { data: fetchData, status: fetchStatus, pending: fetchPending, refresh: fetchRefresh } = useFetch<ApiV1.BaseResponse>(props.apiUrl || 'https://google.com', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})

watch(fetchPending, (p) => {
  isLoading.value = p
  if (p) {
    data.value = []
  }
})

watch(fetchData, (d) => {
  data.value = (d?.data || []) as any
})

onMounted(() => {
  if (props.apiUrl) {
    data.value = (fetchData.value?.data || []) as any
    isLoading.value = false
  }
})

const refresh = () => {
  console.log('datatables refresh', fetchData.value)
  fetchRefresh()
}

defineExpose({
  refresh,
})
</script>

<template>
  <div class="rounded border border-gray-600">
    <div class="px-6 pt-4 pb-4 flex items-center justify-between">
      <div class="text-2xl">{{ title }}</div>
      <div class="flex gap-2">
        <slot name="action"></slot>
        <button class="px-4 py-2 bg-gray-800 text-sm rounded" @click="() => fetchRefresh()">
          Refresh
        </button>
      </div>
    </div>
    <div class="relative overflow-hidden">
      <table class="w-full my-0 align-middle text-gray-200 border border-gray-600">
        <thead class="align-bottom border-b border-gray-600">
          <tr class="font-semibold text-[0.95rem] text-secondary-dark">
            <th class="py-3 px-2 text-left w-[80px] pl-6">#</th>
            <th v-for="(item, i) in columns" :key="i" class="py-3 px-2 text-left w-auto">{{ item.label }}</th>
            <!-- <th class="py-3 px-2 text-end min-w-[50px] pr-6">...</th> -->
          </tr>
        </thead>
        <tbody>
          <DataTableItem
            v-for="(item, i) in data"
            :key="i"
            :columns="columns"
            :data="item" :i="i"
            :slot="$slots"
          >
            <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
              <slot :name="slot" v-bind="scope || {}" />
            </template>
          </DataTableItem>
          <tr v-if="data.length === 0" class="border-b border-dashed border-gray-600 last:border-b-0">
            <td class="py-3 px-2 pl-6 text-left" colspan="100%">
              <div class="text-center text-gray-400">No data</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading" class="bg-black/80 w-full h-full absolute top-0 left-0 flex items-center justify-center">
        <div class="text-white">Loading...</div>
      </div>
    </div>

    <slot />
  </div>
</template>