const { User, Product } = require ("../db")

const addPurchase = async (req, res) => {
    try {
        const {userId , productId} = req.body
        const user =  await User.findOne({where: {email: userId} })
        const productFound = await Product.findAll({where: {id: productId}})

        await user.addProduct(productFound, { through: { isPurchase: true } });
        return res.status(200).json({ message: 'Product added to purchase' });
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = { addPurchase }