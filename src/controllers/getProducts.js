const { Product, Material } = require("../db");
const { products } = require("../apis/products.json");
const { getMaterials } = require("../controllers/getMaterials")

const getProducts = async (req, res) => {
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

    // Consultar productos desde la base de datos con relaciones
    let productWithoutMaterials = await Product.findAll({
      include: [
        {
          model: Material,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      where: {
        paused: false, // Filtrar productos pausados;
        deleted: false, // Filtrar productos eliminados;
      },
    });

    const productsFromDB = productWithoutMaterials.map((product) => ({
      ...product.toJSON(),
      Materials: product.Materials.map((material) => material.name).join(", "),
    }));

    let allProducts = [...productsFromDB];
    
    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      allProducts = allProducts.filter((product) =>
        product.name.toLowerCase().startsWith(searchName)
      );
    }
    
    // Filtro por material 
    if (req.query.material) {
      const materialName = req.query.material.toLowerCase();
    
      // Usar Promise.all para cargar todos los materiales de una vez
      const productsWithMaterials = await Promise.all(
        allProducts.map(async (product) => {
          // Forzar la carga de la relación Materials
          const materials = await product.getMaterials();
    
          return {
            ...product,
            Materials: materials.map((material) => material.name).join(", "),
          };
        })
      );
    
      // Filtrar los productos basados en el nombre del material
      allProducts = productsWithMaterials.filter((product) =>
        product.Materials.toLowerCase().includes(materialName)
      );
    }
    
    // Filtro por rating
    if (
      req.query.filter === "1" ||
      req.query.filter === "2" ||
      req.query.filter === "3" ||
      req.query.filter === "4" ||
      req.query.filter === "5"
    ) {
      allProducts = allProducts.filter(
        (product) => product.rating == req.query.filter
      );
    }
    
    // Ordenamiento
    if (req.query.sort) {
      switch (req.query.sort) {
        case "nameAsc":
          allProducts = allProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "nameDesc":
          allProducts = allProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        case "priceAsc":
          allProducts = allProducts.sort((a, b) => a.price - b.price);
          break;
        case "priceDesc":
          allProducts = allProducts.sort((a, b) => b.price - a.price);
          break;
      }
    }

    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getProducts };



   