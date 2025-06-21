import { format } from 'date-fns';

export function formatDate(timestamp: number) {
  const data = new Date(timestamp);
  return format(data, 'dd/MM/yyyy HH:mm');
}
