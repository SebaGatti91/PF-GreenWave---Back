const { User, Product, UserProduct } = require("../db");

const getFavs = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await User.findByPk(id);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteProducts = await UserProduct.findAll({
      where: {
        UserId: userFound.id,
        isFavorite: true,
      },
      include: Product
    });

    const onlyProducts = favoriteProducts.map((userProduct) => ({
      ...userProduct.Product.dataValues,
    }));

    return res.status(200).json(onlyProducts);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getFavs,
};
