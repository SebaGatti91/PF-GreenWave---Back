const { Product, Reviews } = require("../db");
const axios = require("axios");
const URL = `https://ef38b114681e413e99d0dc06bc056b46.api.mockbin.io/`;

const getProductsId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(URL);
    const { products } = response.data;

    if (id.length > 5) {
      const productFound = await Product.findOne({where: {
        id
       },
        include: Reviews
      });

      if (productFound) {
        const materials = await productFound.getMaterials();

        const productFromDb = productFound.toJSON();

        const materialsString = materials.map(material => material.name).join(", ");

        productFromDb.materials = materialsString;

        return res.status(200).json(productFromDb);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    }

    const productFromApi = products.find((product) => product.id === parseInt(id, 10));

    if (!productFromApi) {
      return res.status(404).json({ message: "Product not found" });
    }

    const materialsString = productFromApi.materials.join(", ");

    productFromApi.materials = materialsString;

    res.status(200).json(productFromApi);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getProductsId,
};