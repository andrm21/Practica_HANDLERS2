require('dotenv').config();
/*Importacion librerias*/
const express = require('express');
const mongoose = require('mongoose');
const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handlers');

/*Importacion rutas del proyecto*/
const routerApi = require('./src/routes');
const port = process.env.PORT;
const app = express();
/*Activacion del puerto por el cual correra el proyecto*/
app.listen(port, console.log('Port active', port));

/*Conectamos con la base de datos*/
mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection with MONGODB'))
  .catch((err) => console.error(err));
/*Creacion de middleware*/
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

routerApi(app);