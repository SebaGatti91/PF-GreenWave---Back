const { Product, Material } = require("../db");
const { products } = require("../apis/products.json");

const getProducts = async (req, res) => {
  try {
    const product = products.map((product) => {
      return {
        name: product.name,
        image: product.image,
        stock: product.stock,
        price: product.price,
        description: product.description,
        rating: product.rating,
        materials: product.materials.join(", ")
      };
    });

    let productsFromDB = await Product.findAll({
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

    if (productsFromDB.length === 0) {
      productsFromDB = await Product.bulkCreate(product);
    }

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
      allProducts = allProducts.filter((product) =>
        product.materials.toLowerCase().includes(materialName)
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
        // Agregar más casos según sea necesario
      }
    }

    return res.status(200).json(allProducts);
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getProducts };