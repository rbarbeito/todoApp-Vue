
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



  const formatDate = (fecha: string) => {

    return dayjs(fecha).isBetween(dayjs(), dayjs().add(3, 'days'), 'days', '[]')
      ? dayjs(fecha).fromNow()
      : dayjs(fecha).format('LL')
  }




  return {
    formatDate,
  }
}
