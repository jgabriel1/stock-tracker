import { format } from 'date-fns'

export default function formatDate(date: Date | number): string {
  return format(date, 'dd/MM/yy')
}
