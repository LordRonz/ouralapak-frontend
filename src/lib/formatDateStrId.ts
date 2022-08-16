import id from 'date-fns/locale/id';
import { formatInTimeZone } from 'date-fns-tz';

export const formatDateStrId = (
  date: string | number,
  format = 'dd/MM/yyyy HH:mm zzz'
) => {
  return formatInTimeZone(
    typeof date === 'number' ? date * 1000 : date,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    format,
    { locale: id }
  );
};

export default formatDateStrId;
