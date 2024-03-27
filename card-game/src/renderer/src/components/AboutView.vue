<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import dayjs from "dayjs"
import Toast from 'primevue/toast'
import { useToast } from "primevue/usetoast";
const toast = useToast();

const router = useRouter();

const doList = ref([])
const visible = ref(false)

const insertTodo = () => {
  visible.value = false;
  if(itemHeader.value === ''){
    toast.add({ severity: 'error', summary: '알림', detail: '제목을 입력해주세요!', group: 'br', life: 3000 });
    return false;
  };
  if(itemContent.value === ''){
    toast.add({ severity: 'error', summary: '알림', detail: '내용을 입력해주세요!', group: 'br', life: 3000 });
    return false;
  }
  doList.value.push({ 'header' : itemHeader.value, 'content' : itemContent.value, 'completeCheck': false });
  itemHeader.value = '';
  itemContent.value = '';
  unCompleteJob.value += 1;
}

const deleteItem = (index) => {
  if(doList.value[index].completeCheck){
    completeJob.value -= 1;
  }else{
    unCompleteJob.value -= 1;
  }
  doList.value.splice(index,1)
}

const checkItem = (index) => {
  if(!doList.value[index].completeCheck){
    doList.value[index].completeCheck = true;
    completeJob.value += 1;
    unCompleteJob.value -= 1;
  }else{
    doList.value[index].completeCheck = false;
    completeJob.value -= 1;
    unCompleteJob.value += 1;
  }
}

const completeJob = ref(0);
const unCompleteJob = ref(0);

const itemHeader = ref('');
const itemContent = ref('');
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="about">
    <Card class="main-body">
      <template #title>
        <div clas="card-title">
          {{ dayjs().format('YYYY-MM-DD') }}
        </div>
      </template>
      <template #subtitle>
        <div style="display: flex;" :style="doList.length > 0 ? 'justify-content: space-between' : 'justify-content : center'">
          <span>목록</span>
          <div style="width: 30%; display: flex; justify-content: space-between" v-if="doList.length > 0">
            <span>완료 : {{ completeJob }}</span>
            <span>미완 : {{ unCompleteJob }}</span>
          </div>
        </div>
      </template>
      <template #content>
        <div v-if="doList.length > 0">
          <Panel v-for="(item,index) in doList" :key="index" toggleable :header="item.header" style="margin-bottom:1rem; width: 30rem;">
            {{ item.content }}
            <template #icons>
              <button class="p-panel-header-icon p-link mr-2" @click="checkItem(index)">
                <span class="pi pi-check-square" :style="item.completeCheck ? 'color: green' : 'color:red'"></span>
              </button>
              <button class="p-panel-header-icon p-link mr-2" @click="deleteItem(index)">
                <span class="pi pi-trash"></span>
              </button>
            </template>
          </Panel>
        </div>
        <div v-else style="margin-bottom: 1rem">
          <span style="font-weight: bold">추가된 항목이 없습니다.</span>
        </div>
        <div style="display:flex; justify-content:center;">
          <Button icon="pi pi-book" label="할 일 추가" @click="visible = true"></Button>
        </div>
      </template>
    </Card>

    <Toast position="top-center" group="br" />

    <Dialog v-model:visible="visible" modal header="추가할 항목" :style="{ width: '25rem' }">
      <div style="margin-bottom: 1rem">
        <label style="margin-right:1rem">제목 :</label>
        <InputText id="title" v-model="itemHeader" />
      </div>
      <div style="margin-bottom: 1rem">
        <label style="margin-right:1rem">내용 :</label>
        <InputText id="content" v-model="itemContent"/>
      </div>
      <div style="display: flex; justify-content:end">
        <Button style="margin-right: 1rem" type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="insertTodo"></Button>
      </div>
    </Dialog>


  </div>
</template>

<style lang="sass">
.about
  width: 100vw
  display: flex
  justify-content: center

.main-body
  width: 80%

.card-title
  display: flex
</style>
