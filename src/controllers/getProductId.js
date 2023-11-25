const { Product } = require("../db");

const getProductsId = async (req, res) => {
    try {
        let productsFromDB = await Product.findAll();

        if (req.params.id) {
            const searchId = req.params.id;
            const foundProduct = productsFromDB.find(
              (product) => product.id === searchId
            );
      
            if (!foundProduct) {
              return res.status(404).json({ message: "Product not found" });
            }
      
            return res.status(200).json(foundProduct);
          }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getProductsId
}