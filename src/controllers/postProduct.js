const { Product, Material } = require("../db");

const postProduct = async (req, res) => {
  const { name, image, stock, price, description, materials, userId } =
    req.body;
  try {
    if (
      !name ||
      !image ||
      !stock ||
      !price ||
      !description ||
      !materials
    ) {
      return res.status(400).send("Insufficient data");
    }

    const materialsArray = materials.split(", ").map((material) => material.trim());

    const productCreated = await Product.create({
      name,
      userId,
      image,
      stock,
      price,
      description, 
      userId
    });

    const materialsRecords = await Material.findAll({ // Verificar si existen los materiales en la base de datos;
      where: {
        name: materialsArray,
      },
    });

    await productCreated.setMaterials(materialsRecords); // Relacionar los materiales encontrados con el nuevo producto;

    const productWithMaterials = await Product.findOne({
      where: { id: productCreated.id },
      include: [
        {
          model: Material,
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({
      userId: productWithMaterials.userId,
      id: productWithMaterials.id,
      name: productWithMaterials.name,
      image: productWithMaterials.image,
      stock: productWithMaterials.stock,
      price: productWithMaterials.price,
      description: productWithMaterials.description,
      rating: productWithMaterials.rating,
      materials: productWithMaterials.Materials.map((material) => material.name).join(", "),
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postProduct };
