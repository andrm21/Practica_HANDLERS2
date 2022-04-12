const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmationHTML(customerName, orderNro) {
  return  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE-edge" />
      <meta name="viewport" content="width-device-width, initial-scale-1.0" />
      <title>Documento</title>
      <style>
        .responsive {
          width: 100%;
          height:auto;
        }
      </style>
    </head>
    <body>
      <img
      src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fundacion-affinity.org%2Fperros-gatos-y-personas%2Ftengo-un-animal-de-compania%2Fel-gato-necesita-tener-acceso-al-exterior&psig=AOvVaw2BHXIRhSdpJ1_zxxhhRQjw&ust=1649820118303000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMj8lILJjfcCFQAAAAAdAAAAABAD",
      class=""
      alt=""
    </body>
  </html>`
  ;
}
function getMessage(emailParams) {
  return {
    to: emailParams.toEmail,
    from: 'andrea.munozr@autonoma.edu.co',
    subject: 'Cara de GATO',
    text: `Hola ${emailParams.customerName},Cara de Gato`,
    html: sendEmailConfirmationHTML(
      emailParams.customerName,
      emailParams.orderNro
      ),
    }
  }
async function sendOrder(emailParams) {
  try {
    await sgMail.send(getMessage(emailParams));
    return { message: 'Confirmacion de compra enviada' };
  } catch (err) {
    const message = 'No Aparece la cara de GATO';
    console.error(message);
    console.error(err);
    if (err.response) console.error(err.response.body);
    return { message };
  }
}
module.exports = {
  sendOrder,
};
