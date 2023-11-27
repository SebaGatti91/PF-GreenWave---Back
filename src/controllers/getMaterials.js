const { Material, Point } = require("../db");
const { materials } = require('../apis/materials.json');

const getMaterials = async (req, res) => {
  try {
    const material = materials.map((material) => {
      return {
        name: material.name,
        quantity: material.quantity,
        credit_value: material.credit_value,
        money_value: material.money_value,
      }
    })
    // Consultar todos los materiales en la base de datos
    let recyclableMaterials = await Material.findAll();

    // Verificar si no se encontraron materiales
    if (recyclableMaterials.length === 0) {
      recyclableMaterials = await Material.bulkCreate(material);
    }

    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      recyclableMaterials = recyclableMaterials.filter((material) =>
        material.name.toLowerCase().startsWith(searchName)
      )
      if (recyclableMaterials.length === 0) {
        return res.status(404).json({ message: "Material not found" });
      }
      return res.status(200).json(recyclableMaterials)
    }

    // Filtro por punto de retiro
    // if (req.query.pickupPoint) {
    //   const pickupPointName = req.query.pickupPoint.toLowerCase();
    //   recyclableMaterials = recyclableMaterials.filter((material) =>
    //     material.Points.some(
    //       (point) => point.name.toLowerCase() === pickupPointName
    //     )
    //   );
    // }

    // Filtro ascendente
    if (req.query.sort === "asc") {
      recyclableMaterials = recyclableMaterials.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Filtro descendente
    if (req.query.sort === "desc") {
      recyclableMaterials = recyclableMaterials.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Responder con los datos de todos los materiales
    return res.status(200).json(recyclableMaterials);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getMaterials };
