const { Product, Review } = require('../models'); // Ajusta la ruta según la estructura de tu proyecto

const ratingProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const productFound = await Product.findByPk(productId, {
            include: {
                model: Review,
                attributes: ['rating'],
            },
        });

        if (!productFound) {
            return res.status(404).json({ message: "Product not found" });
        }

        const reviews = productFound.Reviews;

        if (reviews.length === 0) {
            return res.status(200).json({ averageRating: 0, updatedRating: Product.rating });
        }

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        await Product.update({ rating: averageRating });

        return res.status(200).json({ averageRating });

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

module.exports = {
    ratingProduct
};