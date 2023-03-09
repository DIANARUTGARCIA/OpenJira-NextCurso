import { FC, DragEvent, useContext } from 'react'
import { Entry } from '../../interfaces'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'
import { dateFunctions } from '../../utils'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  //Función para mover  la card al inicio
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }
  //Función para mover  la card en el final (hasta donde)
  const onDragEnd = (event: DragEvent) => {
    endDragging()
  }
  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}{' '}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
