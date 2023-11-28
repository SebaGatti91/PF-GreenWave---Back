const { Product } = require("../db");

const putProduct = async (req, res) => {
  try {
    const { id, name, image, stock, price, rating, description, materials } = req.body;

    const productFound = await Product.findByPk(id);

    if (!productFound) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await productFound.update({
      name: name || productFound.name,
      image: image || productFound.image,
      stock: stock || productFound.stock,
      price: price || productFound.price,
      rating: rating || productFound.rating,
      description: description || productFound.description,
      materials: materials || productFound.materials,
    });
    return res.status(200).json(updatedProduct);
    // return res.status(200).json({ message: 'Product successfully updated' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { putProduct };
