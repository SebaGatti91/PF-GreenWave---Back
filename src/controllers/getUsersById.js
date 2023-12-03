const { User, Product, UserProduct } = require("../db");

const getUserById = async (req, res) => {
  try {

    const { id } = req.params;
    const userFound = await User.findOne({ where: { email: id } });

    const userProducts = await Product.findAll({
      where: { userId: userFound.id }
    })

    const favoriteProducts = await UserProduct.findAll({
      where: {
        UserId: userFound.id,
        isFavorite: true,
      },
      include: Product
    });

    const purchasedProducts = await UserProduct.findAll({
      where: {
        UserId: userFound.id,
        isPurchase: true,
      },
      include: Product
    });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      ...userFound.dataValues,
      posted: userProducts,
      purchased: purchasedProducts,
      favorites: favoriteProducts
    });

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getUserById,
};