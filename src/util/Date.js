import dayjs from 'dayjs';
import 'dayjs/locale/es';

export default function toCustomDate(date) {
  return dayjs(date, { locale: 'es' }).format('DD [de] MMMM [de] YYYY [a las] HH:mm');
}