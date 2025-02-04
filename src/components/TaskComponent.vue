<template>
  <ul class="px-3 mt-3 lg:h-4/6 lg:overflow-y-auto">
    <li
      class="p-4 my-6 w-full h-34 rounded-lg bg-gray-50 flex flex-col justify-between"
      v-for="task in taskFilter"
      :key="task.id"
    >
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <h4 class="font-bold">{{ task.task }}</h4>
          <h6 class="text-gray-400">{{ task.place }}</h6>
        </div>
        <faIcon
          icon="fa-solid fa-trash"
          class="text-red-500 cursor-pointer"
          @click="deleteTask(task.id)"
        />
      </div>
      <hr class="my-2" />
      <div class="flex justify-between items-center">
        <div class="flex flex-row gap-2">
          <h5 class="font-semibold text-gray-500">{{ formatDate(task.date) }}</h5>
          <h5
            class="font-light text-gray-400"
            v-if="!dayjs(task.date).isBetween(dayjs(), dayjs().add(3, 'days'), null, '[]')"
          >
            {{ dayjs().format('HH:mm') }}
          </h5>
        </div>
        <faIcon
          icon="fa-regular fa-circle-check"
          class="cursor-pointer"
          @click="changeStatus(task.id)"
          :class="task.status == 'pending' ? 'text-gray-300' : 'text-green-500'"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Task } from '@/interfaces/task.interface';
import { computed } from 'vue';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/es';
import { showTask } from '@/composables/showTask';

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);
dayjs.extend(isBetween);
dayjs.locale('es');

const { formatDate } = showTask();

const taskFilter = computed(() => {
  if (props.filtro != 'all') {
    return props.tasks.filter((el) => el.status === props.filtro);
  }

  return props.tasks;
});

interface Props {
  tasks: Task[];
  filtro: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  changeStatus: [id: string];
  deleteTask: [id: string];
}>();

const changeStatus = (id: string) => {
  emit('changeStatus', id);
};

const deleteTask = (id: string) => {
  emit('deleteTask', id);
};
</script>
