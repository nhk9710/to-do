<script setup lang="ts">
import { useDrop } from 'vue3-dnd'
import { ItemTypes } from './ItemType'
import { computed, unref } from 'vue'
import { toRefs } from '@vueuse/core'
import { usePlayerCardStore } from '../../stores/playerCard.js'
import {storeToRefs} from "pinia";

const store = usePlayerCardStore();
const { name, health } = storeToRefs(store);

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  backgroundColor: 'teal',
  borderRadius: '10px',
  float: 'left',
  transitionDuration: '0.5s',
}

const [collect, drop] = useDrop(() => ({
  accept: ItemTypes.Card,
  drop: () => ({ 'name': name }),
  collect: monitor => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))
const { canDrop, isOver } = toRefs(collect)
const isActive = computed(() => unref(canDrop) && unref(isOver))
const backgroundColor = computed(() =>
  unref(isActive) ? 'darkgreen' : unref(canDrop) ? 'darkkhaki' : '#222'
)
const boxShadow = computed(() =>
  unref(isActive) ? '0 0 12px 0.2rem rgba(0,255,0,0.9)' : unref(canDrop) ? '0 0 12px 0.2rem rgba(255,8,0,0.5)' : 'none'
)
</script>

<template>
  <div :ref="drop" role="Dustbin" :style="{ ...style, boxShadow }">
    {{ isActive ? 'Release to drop' : 'Drag a box here' }}
    {{ health }}
  </div>
</template>
