const { Product, Review } = require("../db");

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const productFound = await Product.findByPk(productId, {
      include: [{ model: Review, as: 'Reviews' }],
    });

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = productFound.Reviews;

    let allReviews = [...reviews]

    if (req.query.filter && (parseInt(req.query.filter) >= 1 && parseInt(req.query.filter) <= 5)) {
      allReviews = allReviews.filter(
        (review) => review.rating === parseInt(req.query.filter)
      );
    }

    return res.status(200).json(allReviews);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getReviews,
};
