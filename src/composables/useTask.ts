import type { Task } from "@/interfaces/task.interface";
import { ref, onMounted } from "vue";

import dayjs from 'dayjs';

export const useTasks = () => {




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


  return {
    // properties
    showNewTask,
    filtroState,
    tasks,

    // methods
    filterTask,
    deleteFinished,
    cancelNewtask,
    addNewTask,
    changeStatus,
    deleteTask,
    toggleNewTask

  }
}
