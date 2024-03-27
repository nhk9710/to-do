<template>
  <div
    :ref="drag"
    role="Card"
    :style="{ ...style, opacity }"
    :data-testid="`card-${name}`"
  >
      {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { useDrag } from 'vue3-dnd'
import { ItemTypes } from './ItemType'
import { computed, unref } from 'vue'
import { toRefs } from '@vueuse/core'
import { usePlayerCardStore } from '../../stores/playerCard.js'
import {storeToRefs} from "pinia";

interface DropResult {
  name: string
}

const props = defineProps<{ name: string }>()
const store = usePlayerCardStore();
const { health } = storeToRefs(store);

const style = {
  color: 'black',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginBottom: '1.5rem',
  borderRadius: '5px',
  cursor: 'move',
  float: 'left',
}

const [collect, drag] = useDrag(() => ({
  type: ItemTypes.Card,
  item: () => ({
    name: props.name,
  }),
  end: (item, monitor) => {
    const dropResult = monitor.getDropResult<DropResult>()
    if (item && dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`)
      health.value -= 10;
    }
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
  }),
}))

const { isDragging } = toRefs(collect)

const opacity = computed(() => (unref(isDragging) ? 0.4 : 1))
</script>

<style lang="less" scoped>
.card {
  float: left;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid gray;
  cursor: move;

  &.dragging {
    opacity: 0.4;
  }
}
</style>
