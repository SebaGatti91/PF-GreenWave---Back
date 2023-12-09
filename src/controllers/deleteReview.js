const { Product, Review } = require('../db');
const { updateProductRating } = require('./updateProductRating');

const deleteReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.params;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = await Review.findOne({
            where: { id: reviewId, ProductId: productId, deleted: false },
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found or removed' });
        }

        await review.update({ deleted: true });

        await updateProductRating(productId);

        return res.status(200).json({ message: 'Review successfully removed' });

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    deleteReview
};
