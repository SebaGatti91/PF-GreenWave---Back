const { Product, Material } = require("../db");

const getProducts = async (req, res) => {
  try {
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
      const searchMaterial = req.query.material.toLowerCase();
      allProducts = allProducts.filter((product) =>
        product.Materials.toLowerCase().includes(searchMaterial)
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

    // if (req.query.filter === "1-2") {
    //   allProducts = allProducts.filter((product) => product.rating >= 1 && product.rating <= 2);
    // } else if (req.query.filter === "2-3") {
    //   allProducts = allProducts.filter((product) => product.rating >= 2 && product.rating <= 3);
    // } else if (req.query.filter === "3-4") {
    //   allProducts = allProducts.filter((product) => product.rating >= 3 && product.rating <= 4);
    // } else if (req.query.filter === "4-5") {
    //   allProducts = allProducts.filter((product) => product.rating >= 4 && product.rating <= 5);
    // }
    
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



   