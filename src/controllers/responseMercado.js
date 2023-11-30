const {User, Product} = require("../db");
const {Sequelize}  = require('sequelize');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    ///este cambiooo
});

const responseMercado = async (req, res) => {
    
  const {status, external_reference } = req.query

  const datos =  JSON.parse(external_reference)

  console.log(datos)

  const user = await User.findOne({ where: { id: datos.userId } })
  const product = await Product.findAll({ where: {id: datos.productsId}});

//   await Product.update(
//     { stock: Sequelize.literal(`stock - 1`) }, // Restar la cantidad del stock
//     { where: { id: datos.productsId } }
//   );

  transporter.sendMail({
    from: `GreenWave ${process.env.EMAIL}`,
    to: user.email,
    subject: "Gracias por tu compra",
    html:`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Envio de correo Electronico con NodeJS</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600&display=swap"
          rel="stylesheet" />
        <style>
          html {
            height: 100%;
          }
          body {
            position: absolute;
            bottom: 0;
            right: 0;
            font-family: "Instrument Sans", sans-serif;
          }
          .content {
            top: 0;
            margin: 0 auto;
            width: 90%;
            height: 100vh;
            background-color: #f2f4f8;
          }
          .logo {
            position: absolute;
            bottom: 0;
            right: 0;
            margin: 10px;
            width: 150px;
            margin-right: 50px;
          }
          h1 {
            color: #22b5a0;
            padding: 30px 5px;
          }
          h3 {
            text-align: center;
          }
          section {
            padding: 5px 50px;
          }
          p {
            text-align: justify;
            color: #666 !important;
          }
          hr {
            border: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1 style="text-align: center">
            ¡Gracias por tu compra!
            <hr />
          </h1>
    
          <section>
            <h3>
              Estamos felices de que pienses en el pais como nosotros.
            </h3>
            <p>
              Estamos emocionados de tenerte aquí y esperamos que disfrutes de
              nuestro producto. Pronto expandiremos mas nuestra ventas, te invito cordialmente a
              que estes al tanto de todas nuestras
              actualizaciones y novedades.
            </p>
            <br />
            <h3>¡Gracias por unirte a nosotros!</h3>
          </section>
          
        </div>
      </body>
    </html>`
  })
  
  if (status === "approved") {
    await user.addProduct(product)
    ///este cambioo
  }
  // res.redirect('https://www.elespectador.com/resizer/Y6i1y4O1HnbwKq5W7mTq81n0udU=/525x350/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/PT3GKS2WMRBNLHDLXQWWM63J5U.jpg')

}

module.exports = {
    responseMercado
};