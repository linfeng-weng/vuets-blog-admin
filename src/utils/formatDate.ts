import dayjs from 'dayjs'

export function formatDate(date: string, format: string = 'YYYY-MM-DD') {
  const Date = dayjs(date).format(format)
  return Date
}
