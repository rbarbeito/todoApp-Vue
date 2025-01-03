<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-evenly">
      <div class="flex items-center" @click="filtrarTasks('all')" :class="[
        tasks.length ? 'cursor-pointer' : '',
        filtro == 'all' ? 'text-blue-500' : ' text-gray-400'
      ]">All <span class="w-fit ms-1  px-2 rounded-full flex justify-center items-center text-white " :class="[
        tasks.length ? '' : 'hidden',
        filtro == 'all' ? 'bg-blue-500' : ' bg-gray-400'
      ]">{{ tasks.length }}</span>
      </div>
      <div class="flex items-center" @click="taskPending() != 0 ? filtrarTasks('pending') : null" :class="[taskPending() != 0 ? 'cursor-pointer' : '',
      filtro == 'pending' ? 'text-blue-500' : ' text-gray-400'
      ]">Pending <span class="w-fit ms-1  px-2 rounded-full flex justify-center items-center text-white " :class="[taskPending() != 0 ? '' : 'hidden',
      filtro == 'pending' ? 'bg-blue-500' : ' bg-gray-400'
      ]">{{
        taskPending() }}</span>
      </div>
      <div class="flex items-center " @click="taskFinished() != 0 ? filtrarTasks('finished') : null" :class="[taskFinished() != 0 ? 'cursor-pointer' : '',
      filtro == 'finished' ? 'text-blue-500' : ' text-gray-400'
      ]">Finished <span class="w-fit ms-1  px-2 rounded-full flex justify-center items-center text-white  " :class="[
        taskFinished() != 0 ? '' : 'hidden',
        filtro == 'finished' ? 'bg-blue-500' : ' bg-gray-400'
      ]
        ">{{
          taskFinished() }}</span>
      </div>
    </div>
    <div class="grid place-items-center" :class="[taskFinished() != 0 && filtro == 'finished' ? '' : 'hidden']"
      @click="deleteFinished">
      <button class="w-fit py-2 px-5 bg-red-400 rounded-lg">
        <faIcon icon="fa-solid fa-trash" class="me-2" />Delete Finished
      </button>
    </div>
  </div>
</template>




<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '@/interfaces/task.interface';


interface Props {
  tasks: Task[],
  filtro: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  deleteFinished:[],
  filtrarTask:[filtro:string]
}>()



const deleteFinished = () => {
  emit('deleteFinished')
}

const taskPending = () => {
  const pendingTasks = computed(() => {
    return props.tasks.filter(task => task.status === 'pending')
  })

  return pendingTasks.value.length
}

const taskFinished = () => {
  const pendingTasks = computed(() => {
    return props.tasks.filter(task => task.status === 'finished')
  })

  return pendingTasks.value.length
}


const filtrarTasks = (filtro: string) => {
  emit('filtrarTask', filtro)
}
</script>
