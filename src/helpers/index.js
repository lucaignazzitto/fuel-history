import 'dayjs/locale/it'

import dayjs from "dayjs";

dayjs.locale('it')

export const formatDate = (date = '', format = 'DD/MM/YYYY')  => {
  return dayjs(date).format(format)
}
