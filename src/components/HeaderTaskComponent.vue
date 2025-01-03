<template>
  <div class="px-3 py-6 flex justify-between items-center">
    <div>
      <h3 class="font-bold text-xl">Today's Task</h3>
      <h4 class="font-medium">{{ dateNow }}</h4>
    </div>
    <button
      @click="buttonClick"
      :disabled="enable"
      class="px-5 py-2 min-w-fit bg-blue-200 text-blue-900 rounded-lg font-semibold cursor-pointer disabled:bg-gray-400 disabled:text-gray-900 disabled:cursor-not-allowed"
    >
      <faIcon icon="fa-solid fa-plus" class="mr-2" />New Task
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';

dayjs.extend(LocalizedFormat);
dayjs.locale('es');

interface Props {
  enable: boolean;
}

defineProps<Props>();

const dateNow = ref<string>(dayjs().format('LL'));
const emit = defineEmits<{
  showNewTask: [status: boolean];
}>();

const buttonClick = () => {
  emit('showNewTask', true);
};
</script>
