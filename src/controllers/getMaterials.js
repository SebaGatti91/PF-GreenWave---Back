const { Material, Point } = require("../db");

const getMaterials = async (req, res) => {
  try {
    // Consultar todos los materiales en la base de datos
    let materials = await Material.findAll({
      include: [{ model: Point }], // Incluye la relación con Points
    });

    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      materials = materials.filter((material) =>
        material.name.toLowerCase().startsWith(searchName)
      );
    }

    // Filtro por punto de retiro
    if (req.query.pickupPoint) {
      const pickupPointName = req.query.pickupPoint.toLowerCase();
      materials = materials.filter((material) =>
        material.Points.some(
          (point) => point.name.toLowerCase() === pickupPointName
        )
      );
    }

    // Filtro ascendente
    if (req.query.sort === "asc") {
      materials = materials.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Filtro descendente
    if (req.query.sort === "desc") {
      materials = materials.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Verificar si no se encontraron materiales
    if (materials.length === 0) {
      return res.status(404).json({ message: "No se encontraron materiales" });
    }

    // Responder con los datos de todos los materiales
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getMaterials };
