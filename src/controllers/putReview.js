const { Product, Review } = require('../db');
const { updateProductRating } = require('./updateProductRating');

const putReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;

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

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const reviewTime = new Date(review.createdAt).getTime();

    if (currentTime - reviewTime > oneDayInMilliseconds) {
      return res.status(403).json({ message: 'You cannot edit this review after 24 hours' });
    }

    await review.update({
      rating: rating || review.rating,
      comment: comment || review.comment,
    });

    await updateProductRating(productId);

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  putReview,
};