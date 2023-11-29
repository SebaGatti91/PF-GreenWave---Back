const { Product, Material } = require("../db");
const axios = require("axios");
const URL = `https://apimocha.com/greenwave/products`;

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const { products } = response.data;

    const productsFromApi = await Promise.all(products.map((product) => ({
      name: product.name,
      image: product.image,
      stock: product.stock,
      price: product.price,
      description: product.description,
      rating: product.rating,
      materials: product.materials.join(", "),
    })));

    const productsFromDB = await Product.findAll({
      include: [
        {
          model: Material,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const filteredDBProducts = productsFromDB.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image,
      stock: product.stock,
      price: product.price,
      description: product.description,
      rating: product.rating,
      materials: product.Materials.map((material) => material.name).join(", "),
    }));

    let allProducts = [...filteredDBProducts, ...productsFromApi];

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
