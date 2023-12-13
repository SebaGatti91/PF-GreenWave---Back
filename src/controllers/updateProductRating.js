const { Product, Review } = require('../db');

const updateProductRating = async (productId) => {
    try { 
        const productFound = await Product.findByPk(productId, {
            include: {
                model: Review,
                attributes: ['rating', 'deleted'],
            },
        });

        if (!productFound) {
            throw new Error ("Product not found");
        }

        const reviews = productFound.Reviews;

        const validReviews = reviews.filter(review => !review.deleted);

        if (validReviews.length === 0) {
            await Product.update({ rating: 0 }, { where: { id: productId } });
            return 0;
        }

        const totalRating = validReviews.reduce((sum, review) => sum + review.rating, 0);

        const averageRating = totalRating / validReviews.length;

        const roundedAverageRating = averageRating.toFixed(1).toString();

        await Product.update({ rating: roundedAverageRating }, { where: { id: productId } });

        return roundedAverageRating;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateProductRating
};
