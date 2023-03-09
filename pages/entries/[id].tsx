//Pantalla para ditar una entrada
import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { Layout } from '../../components/layouts'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Entry, EntryStatus } from '../../interfaces'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'
import { dateFunctions } from '../../utils'

const validStatus: EntryStatus[] = ['pending', 'i-progress', 'finished']

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }
  //Función memorizada para cuando un campo esta vacio y mandar error que esta vacio
  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [
    inputValue,
    touched,
  ])
//Función que crea una nueva entrada
  const onSave = () => {
    if (inputValue.trim().length === 0) return
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
//Actualiza la entrada
    updateEntry(updatedEntry, true)
  }

  return (
    <Layout title={inputValue.substring(0, 10) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt,
              )}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onInputValueChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAsOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          backgroundColor: 'error.dark',
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }
  //Verifica si el id es valido en moongose
  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    //Si no lo es,retona al path principal sin necesidad de renderizar la pagina
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      entry: entry,
    },
  }
}

export default EntryPage
