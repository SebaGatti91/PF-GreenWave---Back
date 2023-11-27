const { Product, Material } = require("../db");
const { products } = require("../apis/products.json");

const getProducts = async (req, res) => {
  try {
    const product = products.map((product) => {
      return {
        name: product.name,
        image: product.image,
        status: product.status,
        price: product.price,
        description: product.description,
        rating: product.rating,
        materials: product.materials.join(", ")
      };
    });
    // Consultar todos los productos en la base de datos
    let productsFromDB = await Product.findAll();

    // Verificar si no se encontraron productos
    if (productsFromDB.length === 0) {
      productsFromDB = await Product.bulkCreate(product);
    }

    let filteredProducts = [...productsFromDB]; // Crear una copia para no modificar el array original

    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(searchName)
      );
    }

    // Filtro por material
    if (req.query.material) {
      const materialName = req.query.material.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
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
      filteredProducts = filteredProducts.filter(
        (product) => product.rating == req.query.filter
      );
    }

    // Ordenamiento
    if (req.query.sort) {
      switch (req.query.sort) {
        case "nameAsc":
          filteredProducts = filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "nameDesc":
          filteredProducts = filteredProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        case "priceAsc":
          filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "priceDesc":
          filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
          break;
        // Agregar más casos según sea necesario
      }
    }

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getProducts };
