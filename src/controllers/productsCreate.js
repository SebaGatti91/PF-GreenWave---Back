const { Product, Material } = require("../db");
const { products } = require("../apis/products.json");

const productsCreate = async () => {
  try {
    for (const product of products) {
      const [createdProduct] = await Product.findOrCreate({
        where: {
          name: product.name,
        },
        defaults: {
          name: product.name,
          image: product.image,
          stock: product.stock,
          price: product.price,
          description: product.description,
          rating: product.rating,
        },
      });

      // Asociar materiales al producto creado
      await Promise.all(
        product.materials.map(async (materialName) => {
          const [material] = await Material.findOrCreate({
            where: { name: materialName },
          });
          await createdProduct.addMaterial(material);
        })
      );
    }  
    return("se crearon todo bien pa")
    // return res.status(200).json({ message: 'Products successfully created' });
  } catch (error) {
    // return res.status(500).send(error.message);
    return ("F")
  }
};

module.exports = { productsCreate };
