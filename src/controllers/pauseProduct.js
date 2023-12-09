const { Product } = require('../db');

const pauseProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await Product.findByPk(id);

    if (!productFound) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedStatus = !productFound.paused;

    await productFound.update({ paused: updatedStatus });

    return res.status(200).json({ message: 'Publication successfully changed' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { pauseProduct };