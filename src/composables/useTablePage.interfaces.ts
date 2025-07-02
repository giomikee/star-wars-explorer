export interface BaseStoreActions {
  setSearchedName: (searchedName: string) => void
  resetFilters: () => void
}

export type getItemsToDisplayType = () => unknown[]

export type setStoreItemsType = () => Promise<void>
