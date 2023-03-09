import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

interface Props {
  children?: React.ReactNode | undefined
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
  //Función para abrir el menú
  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' })
  }
  //Función para cerrar el menú
  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' })
  }
  //Funcion para el formulario de crear una nueva entrada o entry
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - set isAddingEntry', payload: isAdding })
  }
  //Función para el inicio de onDrop de las listas (permitir tarjetitias en las lsitas )
  const startDragging = () => {
    dispatch({ type: 'UI - Start Dragging' })
  }
  //Función para el final de onDrop de las listas (permitir tarjetitias en las lsitas )
  const endDragging = () => {
    dispatch({ type: 'UI - End Dragging' })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        //Metodos
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,

        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
