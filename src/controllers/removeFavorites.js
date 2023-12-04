const { User, Product } = require('../db');

const removeFavorites = async (req, res) => {

    try {
        const { userId, productId } = req.body;
        const user = await User.findOne({ where: { email: userId } });
        const product = await Product.findOne({ where: { id: productId } });

        await user.removeProduct(product, { through: { isFavorite: true } });
        return res.status(200).json({ message: 'Product removed from favorites' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { 
    removeFavorites 
};