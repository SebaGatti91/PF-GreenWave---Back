const { Product } = require("../db");

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, stock, price, description, materials } = req.body;

    const productFound = await Product.findByPk(id);

    if (!productFound) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await productFound.update({ // Realizar la actualización del producto y pausarlo;
      name: name || productFound.name,
      image: image || productFound.image,
      stock: stock || productFound.stock,
      price: price || productFound.price,
      description: description || productFound.description,
      materials: materials || productFound.materials,
      paused: true,
    });
    return res.status(200).json({ message: 'Publication successfully modified pending review' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { putProduct };
