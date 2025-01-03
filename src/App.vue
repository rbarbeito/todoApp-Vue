<script setup lang="ts">
import HeaderTaskComponent from '@/components/HeaderTaskComponent.vue';
import StatusComponent from '@/components/StatusComponent.vue';
import NewTaskComponent from '@/components/NewTaskComponent.vue';
import TaskComponent from './components/TaskComponent.vue';
import NoTaskComponent from './components/NoTaskComponent.vue';
import { useTasks } from './composables/useTask';

const {
  tasks,
  filtroState,
  showNewTask,
  toggleNewTask,
  addNewTask,
  cancelNewtask,
  filterTask,
  deleteFinished,
  deleteTask,
  changeStatus,
} = useTasks();
</script>

<template>
  <main class="bg-gray-200">
    <div class="w-full lg:w-4/12">
      <h1 class="text-center w- bg-gray-50 p-5 font-bold text-3xl lg:mt-4 lg:rounded-lg">
        todo App
      </h1>

      <!-- header task -->
      <HeaderTaskComponent @show-new-task="toggleNewTask" :enable="showNewTask" />

      <!-- new Task -->
      <NewTaskComponent
        v-show="showNewTask"
        @add-new-task="addNewTask"
        @cancel-new-task="cancelNewtask"
      />

      <!-- Status task -->
      <StatusComponent
        :tasks="tasks"
        :filtro="filtroState"
        @filtrar-task="filterTask"
        @delete-finished="deleteFinished"
      />

      <!-- Lista de tareas -->
      <TaskComponent
        :tasks="tasks"
        :filtro="filtroState"
        v-show="tasks.length"
        @change-status="changeStatus"
        @delete-task="deleteTask"
      />

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
