const { products } = require('../apis/products.json');

const { Product } = require('../db');

module.exports = async (req, res) => {
    try {
        const product = products.map((product) => {
            return {
                name: product.name,
                img: product.img,
                status: product.status,
                price: product.price,
                description: product.description,
            }
        });
        await Product.bulkCreate(product)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}