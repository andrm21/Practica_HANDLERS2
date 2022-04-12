require('dotenv').config();
const { EmailAddress } = require('@sendgrid/helpers/classes');
/*Importacion librerias*/
const express = require('express');
const mongoose = require('mongoose');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
  /*TWILIO*/
  client.messages
  .create({
     from: 'whatsapp:+14155238886',
     body: 'Hello there!',
     to: 'whatsapp:+573103685160'
   })
  .then(message => console.log(message.sid));
  /*TWILIO*/
  /*SENDGRID*/
  app.use(express.json());
  app.use(express.urlencoded({ extended: false}));

  app.post('/api/email/GATO',async (req, res, next) =>{
    try {
      res.json(await EmailAddress.sendOrder(req.body));
    }catch (error){
      next (error);
    }

  });
  app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });
/*SENDGRID*/

/*Creacion de middleware*/
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

routerApi(app);