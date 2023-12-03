const { User, Product } = require('../db');

const addFavorites = async (req, res) => {

    try {
     const {userId , productId} = req.body
     const user =  await User.findOne({where: {email: userId} })
     const productFound = await Product.findAll({where: {id: productId}})

     await user.addProduct(productFound, { through: { isFavorite: true } });
     return res.status(200).json({ message: 'Product added to favorites' });
    }catch (error) {
     return res.status(500).send(error.message);
   }
};

module.exports = { 
    addFavorites 
};
