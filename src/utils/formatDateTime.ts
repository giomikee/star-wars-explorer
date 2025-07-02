import { DATE_TIME_OPTIONS } from './formatDateTime.const'

export const formatDateTime = (dateTime: string): string => {
  const parsedDate = new Date(dateTime)

  return parsedDate.toLocaleDateString(undefined, DATE_TIME_OPTIONS)
}
