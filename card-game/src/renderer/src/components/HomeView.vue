<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import dayjs from "dayjs"

const goAbout = () => {
  router.push('/about')
}
</script>

<template>
  <div class="home">
    <Card class="main-today">
      <template #title><h1>Todo List</h1></template>
      <template #subtitle>
        <div class="sub-body">
          <h3>Today...</h3>
          <h4>{{ dayjs().format('YYYY-MM-DD') }}</h4>
        </div>
      </template>
      <template #content>
        <p>오늘의 할 일을 추가해 주세요...</p>
        <div class="main-body">
          <Button icon="pi pi-plus" raised class="addBtn" @click="goAbout"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="sass">
.home
  width: 100vw
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.main-today
  width: 80vw

.sub-body
  display: flex
  justify-content: space-between

.main-body
  height: 100%
  display: flex
  align-items: center
  justify-content: center

.addBtn
  width: 8%
  height: 25%

</style>
