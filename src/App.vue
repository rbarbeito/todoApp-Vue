<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { Task } from './interfaces/task.interface';


import HeaderTaskComponent from "@/components/HeaderTaskComponent.vue";
import StatusComponent from "@/components/StatusComponent.vue";
import NewTaskComponent from "@/components/NewTaskComponent.vue";
import TaskComponent from './components/TaskComponent.vue';
import NoTaskComponent from './components/NoTaskComponent.vue';

import dayjs from 'dayjs';


const tasks = ref<Task[]>([])
const showNewTask = ref<boolean>(false)
const filtroState = ref<string>('all')

const toggleNewTask = (n: boolean) => {
  showNewTask.value = n
}

const cancelNewtask = (showForm: boolean) => {
  toggleNewTask(showForm)
}

const addNewTask = (task: Task, showForm: boolean) => {

  if (!tasks.value) {
    tasks.value = [task]
  } else {
    tasks.value.push(task)
  }

  toggleNewTask(showForm)
  sortTasks()
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const getDataStorage = () => {
  const taskStorage = localStorage.getItem('tasks')
  if (!taskStorage) return

  tasks.value = JSON.parse(taskStorage)
  sortTasks()
}

const changeStatus = (id: string) => {
  const indexTask = tasks.value?.findIndex(el => el.id == id)
  tasks.value![indexTask!].status = tasks.value![indexTask!].status == 'pending'
    ? 'finished'
    : 'pending'

  sortTasks()

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const deleteTask = (id: string) => {
  const indexTask = tasks.value?.findIndex(el => el.id == id)

  if (indexTask! > -1) {
    tasks.value?.splice(indexTask!, 1)
    sortTasks()
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}

const sortTasks = () => {
  tasks.value.sort((a, b) => {
    if (dayjs(a.date) > dayjs(b.date)) {
      return 1;
    }
    if (dayjs(a.date) < dayjs(b.date)) {
      return -1;
    }
    // a must be equal to b
    return 0;
  })
}

const filterTask = (filtro: string) => {
  filtroState.value = filtro
}

const deleteFinished = () => {
  const withoutFinished = tasks.value.filter(el => el.status != 'finished')
  localStorage.setItem('tasks', JSON.stringify(withoutFinished))
  tasks.value = withoutFinished
  filtroState.value = 'all'
}

onMounted(() => {
  getDataStorage()
})

</script>

<template>
  <main class="bg-gray-200 ">

    <div class="w-full lg:w-4/12">
      <h1 class="text-center w- bg-gray-50 p-5 font-bold text-3xl lg:mt-4 lg:rounded-lg">todo App</h1>

      <!-- header task -->
      <HeaderTaskComponent @show-new-task="toggleNewTask" :enable="showNewTask" />


      <!-- new Task -->
      <NewTaskComponent v-show="showNewTask" @add-new-task="addNewTask" @cancel-new-task="cancelNewtask" />


      <!-- Status task -->
      <StatusComponent :tasks="tasks" :filtro="filtroState" @filtrar-task="filterTask"
        @delete-finished="deleteFinished" />



      <!-- Lista de tareas -->
      <TaskComponent :tasks="tasks" :filtro="filtroState" v-show="tasks.length" @change-status="changeStatus"
        @delete-task="deleteTask" />

      <!-- No tasks -->
      <NoTaskComponent v-if="!tasks.length" />
    </div>

  </main>
</template>

<style scoped lang="sass">

main
  width: 100vw
  min-height: 100vh
  display: flex
  justify-content: center


</style>
