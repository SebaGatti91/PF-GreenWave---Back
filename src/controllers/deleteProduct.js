const { Product } = require('../db');

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await Product.findByPk(id);

    if (!productFound) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await productFound.update({ deleted: true });
    await productFound.update({ paused: true });
    
    return res.status(200).json({ message: 'Product successfully removed' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { deleteProduct };

