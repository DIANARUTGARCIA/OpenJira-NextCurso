import { ChangeEvent, useState, useContext } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const onSave = () => {
    if (inputValue.length === 0) return
    addNewEntry(inputValue) //muestraas las nuevas entradas que se van creando
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            sx={{ marginTop: 2, marginBottom: 1 }}
            value={inputValue}
            onChange={onTextFieldChanges}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => setIsAddingEntry(false)} variant="text">
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  )
}
