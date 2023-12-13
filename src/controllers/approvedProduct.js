
const { Product } = require("../db");

const approvedProduct = async (req, res) => {
try {
const { id } = req.params;
const productFound = await Product.findByPk(id);

if (!productFound) {
  return res.status(404).json({ error: "Product not found" });
}

const updateValue = !productFound.approved;

await productFound.update({ approved: updateValue });
await productFound.update({ paused: !updateValue });
return res
  .status(200)
  .json({ message: "Publication successfully changed" });
} catch (error) {
return res.status(500).send(error.message);
}
};

module.exports = { approvedProduct };