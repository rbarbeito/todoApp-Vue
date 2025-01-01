<template>

  <div class="my-3 mt-2 mb-6 p-4 bg-gray-50 rounded-md w-11/12 h-fit relative left-1/2 -translate-x-1/2 ">
    <h4 class="text-center font-bold text-lg">Add Task</h4>
    <div class="flex flex-col justify-between gap-3 mt-2 ">
      <input class="outline-none rounded-md px-4 py-1  bg-gray-200" type="text" placeholder="Task name" name="taskname"
        v-model="taskName" id="task" />
      <input class="outline-none rounded-md px-4 py-1  bg-gray-200" type="text" placeholder="Place" name="place"
        v-model="place" id="place" />
      <input class="outline-none rounded-md px-4 py-1 w-full bg-gray-200 " type="datetime-local" name="datetime"
        v-model="dateTime" id="datetime" />
      <button @click="addTask"
        class="bg-green-400 text-center w-fit px-4 py-1 rounded-md relative left-1/2 -translate-x-1/2 cursor-pointer">
        <faIcon icon="fa-solid fa-save" class="me-2" />Save
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

import { v7 as uuidv7 } from 'uuid';
import { toast } from 'vue3-toastify';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import type { Task } from '@/interfaces/task.interface';


dayjs.extend(isSameOrBefore);

const emit = defineEmits(['addNewTask'])

const taskName = ref()
const dateTime = ref()
const place = ref()


const addTask = () => {

  if (!taskName.value) {
    return toast.error('Defina el nombre de su tarea')
  } else if (!place.value) {
    return toast.error('Defina el lugar')
  } else if (!dateTime.value) {
    return toast.error('Defina la fecha de su tarea')
  } else if (dayjs(dateTime.value).isSameOrBefore(dayjs())) {
    return toast.error('No puede programar tareas en el pasado')
  }

  const task = <Task>{
    id: uuidv7(),
    task: taskName.value,
    date: dateTime.value,
    place: place.value,
    status: 'pending'

  }

  emit('addNewTask', task, false)

};

</script>