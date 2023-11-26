const { Product } = require("../db");

const postProduct = async (req, res) => {
  const { name, image, status, price, description } = req.body;
  try {
    if (!name || !image || !status || !price || !description) {
      return res.status(400).send("Insufficient data");
    }

    // Buscar un producto con el mismo nombre
    const [product, productCreated] = await Product.findOrCreate({
      where: { name }, // Búsqueda basada en el nombre
      defaults: {
        name,
        image,
        status,
        price,
        description,
      },
    });

    if (productCreated) {
      return res.status(200).send("Product successfully created");
    }
    return res.status(409).send("The product already exists");    
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postProduct };
