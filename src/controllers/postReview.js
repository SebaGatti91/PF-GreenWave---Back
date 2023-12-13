const { Product, Review, User } = require('../db');
const { updateProductRating } = require('./updateProductRating');

const postReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        const product = await Product.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.reviewedBy && product.reviewedBy.includes(userId)) {
            return res.status(400).json({ message: 'You have already performed a review for this product' });
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

        const updatedReviewedBy = product.reviewedBy ? [...product.reviewedBy, userId] : [userId];
        await Product.update({ reviewedBy: updatedReviewedBy }, { where: { id: productId } });

        await product.addReview(review);

        await updateProductRating(productId);

        return res.status(200).json({ message: 'Review added successfully' });

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    postReview
};
