const { Product, Review } = require('../db');

const updateProductRating = async (productId) => {
    try {
        const productFound = await Product.findByPk(productId, {
            include: {
                model: Review,
                attributes: ['rating'],
            },
        });

        if (!productFound) {
            throw new Error ("Product not found");
        }

        const reviews = productFound.Reviews;

        if (reviews.length === 0) {
            await Product.update({ rating: 0 }, { where: { id: productId } });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

        const averageRating = totalRating / reviews.length;

        const roundedAverageRating = Number(averageRating.toFixed(1));

        await Product.update({ rating: roundedAverageRating }, { where: { id: productId } });

        return roundedAverageRating;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateProductRating
};
