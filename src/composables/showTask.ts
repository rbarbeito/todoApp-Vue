import { computed } from "vue"
import type { Task } from "@/interfaces/task.interface"

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/es'


dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat)
dayjs.extend(isBetween);
dayjs.locale('es')

export const showTask = () => {


  const taskFilter = computed(() => {
    if (props.filtro != 'all') {
      return props.tasks.filter(el => el.status === props.filtro)
    }

    return props.tasks
  })

  interface Props {
    tasks: Task[]
    filtro: string
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    changeStatus: [id: string],
    deleteTask: [id: string]
  }>()

  const formatDate = (fecha: string) => {

    return dayjs(fecha).isBetween(dayjs(), dayjs().add(3, 'days'), 'days', '[]')
      ? dayjs(fecha).fromNow()
      : dayjs(fecha).format('LL')
  }

  const changeStatus = (id: string) => {
    emit('changeStatus', id)

  }

  const deleteTask = (id: string) => {
    emit('deleteTask', id)
  }


  return {
    taskFilter,
    formatDate,
    changeStatus,
    deleteTask
  }
}
