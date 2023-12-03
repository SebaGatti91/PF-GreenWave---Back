const { Product, Review } = require('../db');


const addReviews = async (req, res) => {

    try {
        const {  email, productId, message } = req.body;

        // const user = await User.findOne({ where: { email: userId } });

        const product = await Product.findOne({ where: { id: productId } });

        const messages = await Review.create({
            comments: message,
            email: email
        })

        await product.addReviews(messages)
        return res.status(200).json({ message: 'Added review' });

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { 
    addReviews 
};