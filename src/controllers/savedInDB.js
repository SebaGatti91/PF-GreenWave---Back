const {products} = require('../../products/products.json');
//console.log(products)

const { Products } = require('../db')

module.exports = async(req,res) =>{
    try {
        console.log('running')
            const product = products.map((product) => {
               return {
                 name: product.name,
                 img: product.img,
                 status: product.status,
                 price: product.price,
                 description: product.description,
             }});
             await Products.bulkCreate(product)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}