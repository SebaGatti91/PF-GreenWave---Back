const { Material, Point } = require("../db");

const getMaterials = async (req, res) => {
  try {
    // Consultar todos los materiales en la base de datos
    let materials = await Material.findAll({
      include: [{ model: Point }], // Incluye la relación con Points
    });

    // Verificar si se proporciona un nombre de material
    if (req.query.name) {
      // Filtrar los materiales cuyo nombre coincida con el nombre proporcionado en la consulta
      const searchName = req.query.name.toLowerCase();
      materials = materials.filter((material) =>
        material.name.toLowerCase().startsWith(searchName)
      );
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
