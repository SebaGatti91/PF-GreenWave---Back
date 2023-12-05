const { Product, Review, User } = require('../db');

const postReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        const product = await Product.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username, image } = user;

        const review = await Review.create({
            userId: userId,
            username: username,
            image: image,
            rating: rating,
            comment: comment
        });

        await product.addReview(review);

        return res.status(200).json({ message: 'Review added successfully' });
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    postReview
};
