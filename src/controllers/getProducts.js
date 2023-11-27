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
    // Consultar todos los productos en la base de datos
    let productsFromDB = await Product.findAll();

    // Verificar si no se encontraron productos
    if (productsFromDB.length === 0) {
      productsFromDB = await Product.bulkCreate(product);
    }

    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      productsFromDB = productsFromDB.filter((product) =>
        product.name.toLowerCase().startsWith(searchName)
      );
      if (productsFromDB.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(productsFromDB);
    }

    // Filtro por material
    if (req.query.material) {
      const materialName = req.query.material.toLowerCase();
      productsFromDB = productsFromDB.filter((product) =>
        product.materials.toLowerCase().includes(materialName)
      );
      if (productsFromDB.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(productsFromDB);
    }

    // Ordenamiento alfabetico ascendente
    if (req.query.sort === "nameAsc") {
      productsFromDB = productsFromDB.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    // Ordenamiento alfabetico descendente
    if (req.query.sort === "nameDesc") {
      productsFromDB = productsFromDB.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    // Ordenamiento por precio ascendente
    if (req.query.sort === "priceAsc") {
      productsFromDB = productsFromDB.sort((a, b) => a.price - b.price);
    }

    // Ordenamiento por precio descendente
    if (req.query.sort === "priceDesc") {
      productsFromDB = productsFromDB.sort((a, b) => b.price - a.price);
    }

    //Filtrado por rating
    if (
      req.query.filter === "1" ||
      req.query.filter === "2" ||
      req.query.filter === "3" ||
      req.query.filter === "4" ||
      req.query.filter === "5"
    ) {
      productsFromDB = productsFromDB.filter(
        (product) => product.rating == req.query.filter
      );
    }
    // Responder con los datos de todos los productos
    return res.status(200).json(productsFromDB);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getProducts };
