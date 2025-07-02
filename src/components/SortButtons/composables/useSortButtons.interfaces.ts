import type { SORT_BUTTONS_EVENTS, SORT_OPTIONS } from '../SortButtons.const'
import type { SORT_ICONS } from './useSortButtons.const'

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]

type SortButtonsEventsType = typeof SORT_BUTTONS_EVENTS[keyof typeof SORT_BUTTONS_EVENTS]

export type SortButtonsEmit = (event: SortButtonsEventsType, ...args: unknown[]) => void

export type GetAppendIconReturn =
  typeof SORT_ICONS.date[keyof typeof SORT_ICONS.date]
  | typeof SORT_ICONS.name[keyof typeof SORT_ICONS.name]
  | undefined
