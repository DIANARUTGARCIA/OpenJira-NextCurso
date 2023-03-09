import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

//Definición de como debe ser la Data
type Data = { message: string } | IEntry[] | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res)

    default:
      return res.status(400).json({ message: 'Endpoint no existe' })
    case 'POST':
      return postEntries(req, res)
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  //leer la base de datos (GET)
  await db.connect()
  const entries = await Entry.find().sort({ createdAt: 'ascending' })
  await db.disconected()
  return res.status(200).json(entries)
}

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //Crear una nueva entrada
  const { description = '' } = req.body
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })

  try {
    await db.connect()
    await newEntry.save()
    return res.status(201).json(newEntry)

  } catch (error) {
    await db.disconected()
    console.log(error)
    return res.status(400).json({ message: 'Algo salio mal,revisar' })
  }
}
