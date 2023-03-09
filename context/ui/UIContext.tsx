import { createContext } from 'react'

interface ContexProps {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging:boolean

  openSideMenu: () => void
  closeSideMenu: () => void
  setIsAddingEntry: (isAdding: boolean) => void

  startDragging: () => void
  endDragging: () => void
}

export const UIContext = createContext({} as ContexProps)
