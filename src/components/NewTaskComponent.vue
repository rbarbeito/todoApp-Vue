<template>
  <div
    class="my-3 mt-2 mb-6 p-4 bg-gray-50 rounded-md w-11/12 h-fit relative left-1/2 -translate-x-1/2"
  >
    <h4 class="text-center font-bold text-lg">Add Task</h4>
    <div class="flex flex-col justify-between gap-3 mt-2">
      <input
        class="outline-none rounded-md px-4 py-1 bg-gray-200"
        type="text"
        placeholder="Task name"
        name="taskname"
        v-model="taskName"
        id="task"
      />
      <input
        class="outline-none rounded-md px-4 py-1 bg-gray-200"
        type="text"
        placeholder="Place"
        name="place"
        v-model="place"
        id="place"
      />
      <input
        class="outline-none rounded-md px-4 py-1 w-full bg-gray-200"
        type="datetime-local"
        name="datetime"
        v-model="dateTime"
        id="datetime"
      />
      <div class="flex justify-around">
        <button
          @click="cancelTask"
          class="bg-red-400 text-center w-fit px-4 py-1 rounded-md cursor-pointer"
        >
          <faIcon icon="fa-solid fa-cancel" class="me-2" />Cancel
        </button>
        <button
          @click="addTask"
          class="bg-green-300 text-center w-fit px-4 py-1 rounded-md cursor-pointer"
        >
          <faIcon icon="fa-solid fa-save" class="me-2" />Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { v7 as uuidv7 } from 'uuid';
import { toast } from 'vue3-toastify';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import type { Task } from '@/interfaces/task.interface';

dayjs.extend(isSameOrBefore);

const taskName = ref();
const dateTime = ref();
const place = ref();

// const emit = defineEmits(['addNewTask', 'cancelNewTask'])
const emit = defineEmits<{
  cancelNewTask: [showForm: boolean];
  addNewTask: [task: Task, showForm: boolean];
}>();

const cancelTask = () => {
  taskName.value = '';
  dateTime.value = null;
  place.value = '';
  emit('cancelNewTask', false);
};

const addTask = () => {
  if (!taskName.value) {
    return toast.error('Defina el nombre de su tarea');
  } else if (!place.value) {
    return toast.error('Defina el lugar');
  } else if (!dateTime.value) {
    return toast.error('Defina la fecha de su tarea');
  } else if (dayjs(dateTime.value).isSameOrBefore(dayjs())) {
    return toast.error('No puede programar tareas en el pasado');
  }

  const task = <Task>{
    id: uuidv7(),
    task: taskName.value,
    date: dateTime.value,
    place: place.value,
    status: 'pending',
  };

  taskName.value=''
  dateTime.value=''
  place.value =''

  emit('addNewTask', task, false);
};
</script>
