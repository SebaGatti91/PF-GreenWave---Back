const { Product} = require("../db");

const getProducts = async (req, res) => {
  try {
    // Consultar todos los productos en la base de datos
    let products = await Product.findAll
   
    // Verificar si se proporciona un nombre de producto
    if (req.query.name) {
      // Filtrar los productos cuyo nombre coincida con el nombre proporcionado en la consulta
      const searchName = req.query.name.toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchName)
      );
    }

    // Verificar si no se encontraron materiales
    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron materiales" });
    }

    // Responder con los datos de todos los materiales
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getProducts };