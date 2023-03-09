import mongoose from 'mongoose'

//Establecer la conexion a la base

/**
 * 0 = disconected
 * 1 = connected
 * 2 = conecting
 * 3 = disconecting
 */
const mongooConnection = {
  isConnected: 0,
}
export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log('Ya estabamos conectados')
    return
  }
  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState

    if (mongooConnection.isConnected === 1) {
      console.log('usando la conexion')
      return
    }
    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGO_URL || '')
  mongooConnection.isConnected = 1
  console.log('conectado a mongodb',process.env.MONGO_URL)
}

export const disconected = async () => {
  if(process.env.NODE_ENV ==='development') return;
  if (mongooConnection.isConnected === 0) return
  
  await mongoose.disconnect()
  console.log('Desconectado de mongoDb')
}
