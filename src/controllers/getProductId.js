const { Product } = require("../db");

const getProductsId = async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await Product.findByPk(id);

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productFound);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProductsId,
};
