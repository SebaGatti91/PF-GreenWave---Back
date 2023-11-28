const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKE || "",
});

const mercadoController = async (req, res) => {
  const producto = req.body;

  try {
    const preference = {
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
    };

    const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.response.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {mercadoController};