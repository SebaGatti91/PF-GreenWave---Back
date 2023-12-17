const { User, Product, UserProduct } = require("../db");

const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await User.findByPk(id);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProducts = await Product.findAll({
      where: {
        userId: id,
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
