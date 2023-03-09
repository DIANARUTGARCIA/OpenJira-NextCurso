import { FC, useReducer, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { entriesApi } from '../../apis'
import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
  entries: Entry[]
}
const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}
interface Props {
  children?: React.ReactNode | undefined
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar()
  //Función para crear una entrada nueva
  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description: description,
      })
      dispatch({ type: '[Entry] Add-Entry', payload: data })
      enqueueSnackbar('Entrada actualizada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  //Función para editar una entrada
  const updateEntry = async ({ _id, description, status }: Entry,showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })
      dispatch({ type: '[Entry] Entry-updated', payload: data })
      if(showSnackbar){
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })

      }
    } catch (error) {
      console.log(error)
    }
  }
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] Refresh-data', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
