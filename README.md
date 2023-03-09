# Next.js OpenJira App
Para crear localmente se necesita la base de datos

``docker-compose up -d``
*El -d,significa __detached__

MongoDB URL Local:
``mongodb://localhost:27017/entriesdb``

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ 


## Para llenar la bd con datos de prueba (usando postman por ejemplo) 
Llamar:
``http://localhost:3000/api/seed``