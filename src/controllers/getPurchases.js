const { User, Product, UserProduct } = require("../db");

const getPurchases = async (req, res) => {
  try {
    const { id } = req.params;
    
    const userFound = await User.findByPk(id);
    
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const purchasedProducts = await UserProduct.findAll({
      where: {
        UserId: userFound.id,
        isPurchase: true,
      },
      include: Product
    });
    
    const onlyProducts = purchasedProducts.map((userProduct) => ({
      ...userProduct.Product.dataValues,
    }));

    return res.status(200).json(onlyProducts);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getPurchases,
};
