const { UserProduct, Product } = require("../db");

const getSoldProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchasedProducts = await UserProduct.findAll({
        where: { createdByUser: userId  },
        include: Product});
    return res.status(200).send(purchasedProducts)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getSoldProducts,
};
  