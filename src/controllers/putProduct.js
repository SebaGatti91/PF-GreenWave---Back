const { Product } = require("../db");

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, stock, price, rating, description, materials } = req.body;

    const productFound = await Product.findByPk(id);

    if (!productFound) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (productFound.paused) { // Verificar si el producto está marcado como pausado;
      await productFound.update({ // Restaurar el producto y aplicar las modificaciones;
        name: name || productFound.name,
        image: image || productFound.image,
        stock: stock || productFound.stock,
        price: price || productFound.price,
        rating: rating || productFound.rating,
        description: description || productFound.description,
        materials: materials || productFound.materials,
        paused: false,
      });

      return res.status(200).json({ message: 'Publication successfully restored' });       
    }

    await productFound.update({ // Si el producto no está marcado como pausado, realizar la actualización normal;
      name: name || productFound.name,
      image: image || productFound.image,
      stock: stock || productFound.stock,
      price: price || productFound.price,
      rating: rating || productFound.rating,
      description: description || productFound.description,
      materials: materials || productFound.materials,
    });
    return res.status(200).json({ message: 'Product successfully modified' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { putProduct };
