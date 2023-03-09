import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
    | { message: string } | IEntry

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;
    //Validación para verificar que el id de la entrada sea valido
    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ message: 'El id no es valido' })
    }
    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);

        default:
            return res.status(400).json({ message: 'El metodo no existe,baboso' })
    }
}

//Función para traer una unica entrada
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryToGet = await Entry.findById(id);
    //Validación para verificar si existe una entrada con ese id
    if (!entryToGet) {
        await db.disconected();
        return res.status(400).json({ message: 'No hay entrada con ese Id:' + id })
    }
    return res.status(200).json(entryToGet)
}

//Función para actualizar una entrada
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
        await db.disconected();
        return res.status(400).json({ message: 'No hay entrada con ese Id:' + id })
    }
    //Variable para actualizar la entrada
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const updateEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconected()
        return res.status(200).json(updateEntry!)
        //Estas lineas tambien hacen la misma funcion de actualizar
        // entryToUpdate.description = description;
        // entryToUpdate.status = status;
        // await entryToUpdate.save();

    } catch (error: any) {
        await db.disconected()
        return res.status(400).json({ message: error.errors.status.message })
    }
}
