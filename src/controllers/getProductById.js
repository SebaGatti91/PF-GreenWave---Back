const { Product, Review } = require("../db");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productFound = await Product.findOne({
      where: {
        id: id
      },
      include: Review
    });

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    const materials = await productFound.getMaterials();

    const productFromDB = productFound.toJSON();

    const materialsString = materials.map(material => material.name).join(", ");

    productFromDB.materials = materialsString;

    return res.status(200).json(productFromDB);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getProductById,
};