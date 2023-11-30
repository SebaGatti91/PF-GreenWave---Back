const { User } = require("../db");
const {Product }= require("../db")

const getUserById = async (req, res) => {
  try {
    
    const { id } = req.params;
    const userFound = await User.findByPk(id);
    const productOfUser = await Product.findAll({
      where:{ userId : id}
   }) 

   const productosRelacionados = await userFound.getProducts();
     if (!userFound) {
       return res.status(404).json({ message: "user not found" });
     }
     return res.status(200).json({...userFound.dataValues,
     productsCreados: productOfUser,
     productsComprados: productosRelacionados
   }); 

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getUserById,
};