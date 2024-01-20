<script lang="ts" setup>
import type { ColumnItem } from './index.vue';

const dayjs = useDayjs()

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnItem[]>,
    required: true,
  },
  data: {
    type: Object as PropType<any>,
    default: [],
  },
  i: {
    type: Number,
    default: 0,
  }
})

const clonedColumns = computed(() => {
  return [...props.columns]
})
const dataObjRaw = computed(() => {
  return JSON.parse(JSON.stringify(props.data))
})

const parseCol = (index: number, col: ColumnItem, d: any) => {
  const objectNotation = col.data
  
  if (!objectNotation) {
    return ''
  }

  try {
    // search obj in d using objectNotation (e.g. 'status.health' or 'item.product.name')
    let curr = d
    const paths = objectNotation.split('.')
    for (let i = 0; i < paths.length; ++i) {
      if (curr[paths[i]] === undefined) {
        return ''
      }
      curr = curr[paths[i]]
    }

    // auto detect type
    if (col?.type && col?.type === 'date') curr = dayjs(curr).format('HH:mm DD/MM/YYYY')

    return curr
  } catch (error) {
    // console.error(error)
    return ''
  }
}
</script>

<template>
  <tr class="border-b border-dashed border-gray-600 last:border-b-0">
    <td class="py-3 px-2 pl-6 text-left">
      {{ i+1 }}
    </td>
    <td v-for="(col, j) in clonedColumns" :key="j" class="py-3 px-2 w-auto text-left">
      <span class="text-light text-sm">
        <slot
          :name="`col-${col.key}`"
          :colSchema="col"
          :data="dataObjRaw"
          :col="parseCol(j, col, dataObjRaw)"
        >
          {{ parseCol(j, col, dataObjRaw) }}
        </slot>
      </span>
    </td>
  </tr>
</template>