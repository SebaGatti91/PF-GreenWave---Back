const {MercadoPagoConfig, Preference} = require("mercadopago");
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN
 });

const payment = new Preference(client)

const mercadoController = async (req, res) => {

  //Se mapea lo que le llega por body para generar un array de objetos como items para mercado pago.

  const {item, userId, productId} = req.body;

   const items = item.map((producto)=>({
      title: producto.title,
      unit_price: producto.unit_price,
      currency_id: producto.currency_id,
      quantity: producto.quantity,
   }))
   
  try {
    const preference = {
      body:{
      external_reference: {userId : userId}, // aqui podemos mandar el id del producto para generar cambios en la DB.
      items: items,
      back_urls: {
        // success: "https://pf-green-wave-front.vercel.app/successfully",
        // failure: "https://pf-green-wave-front.vercel.app/feedback",
        success: "https://greenwave-henry.vercel.app/successfully",
        failure: "http://localhost:3001/failMp",
      },

      auto_return: "approved",
    }
    };

    const respuesta = await payment.create(preference);
    res.status(200).json(respuesta.init_point);

  } catch (error) {
    res.status(500).json(error.message);
  }
};


module.exports = {mercadoController};