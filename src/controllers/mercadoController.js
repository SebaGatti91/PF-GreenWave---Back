const {MercadoPagoConfig, Preference} = require("mercadopago");
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN
 });

const payment = new Preference(client)

const mercadoController = async (req, res) => {

  // const productos = req.body;
  // const items = productos.map((producto)=>({
  //   title: producto.title,
  //   unit_price: producto.price,
  //   currency_id: "ARS",
  //   quantity: producto.quantity,
  // }))

  try {
    const preference = {
      body:{
      external_reference: {id :1999},
      items: [
        {
          title: "PCcc gamer",
          unit_price: 2000,
          currency_id: "ARS",
          quantity: 1,
        },
      ],

      back_urls: {
        success: "http://localhost:5173/",
        failure: "http://localhost:3000/fallo",
      },

      auto_return: "approved",
    }
    };

    const respuesta = await payment.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {mercadoController};