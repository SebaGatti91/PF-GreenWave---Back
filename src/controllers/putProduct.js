const { Product } = require("../db");
const { products } = require("../apis/products.json");

const putProduct = async (req, res) => {
  try {
    const { id, name, image, stock, price, rating, description, materials } = req.body;

    // Verificar si el producto existe en la base de datos
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Actualizar el producto con los nuevos valores
    const modifiedProduct = await existingProduct.update({
      name: name || existingProduct.name,
      image: image || existingProduct.image,
      stock: stock || existingProduct.stock,
      price: price || existingProduct.price,
      rating: rating || existingProduct.rating,
      description: description || existingProduct.description,
      materials: materials || existingProduct.materials,
    });
    return res.status(200).json(modifiedProduct);
    // return res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { putProduct };
