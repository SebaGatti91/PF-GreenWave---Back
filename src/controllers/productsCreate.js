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
          image:  Array.isArray(product.image) ? product.image : [product.image],
          stock: product.stock,
          price: product.price,
          description: product.description,
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
    return('Products successfully created');
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { productsCreate };
