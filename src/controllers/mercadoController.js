const {MercadoPagoConfig, Preference} = require("mercadopago");
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN
 });

const payment = new Preference(client)

const mercadoController = async (req, res) => {

  //Se mapea lo que le llega por body para generar un array de objetos como items para mercado pago.

  const productos = req.body;
   const items = productos.map((producto)=>({
      title: producto.title,
      unit_price: producto.unit_price,
      currency_id: producto.currency_id,
      quantity: producto.quantity,
   }))

  try {
    const preference = {
      body:{
      // external_reference: {userId : "590e71ba-987a-4551-8fdc-5b351aabaf95", productsId: "78363843-9488-461d-b3c1-510dc97465f5", email: "emermontes15@gmail.com"}, // aqui podemos mandar el id del producto para generar cambios en la DB.
      items: items,
      back_urls: {
        success: "http://localhost:3001/feedback",
        failure: "http://localhost:3000/fallo",
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