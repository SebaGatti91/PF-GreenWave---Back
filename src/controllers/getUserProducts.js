const { User, Product, UserProduct } = require("../db");

const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await User.findOne({
      where: { email: id },
    });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProducts = await Product.findAll({
      where: {
        userId: userFound.id,
      },
    });

    return res.status(200).json(userProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getUserProducts,
};