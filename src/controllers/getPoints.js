const { Material, Point } = require("../db");
const { points } = require("../apis/points.json")

const getPoints = async (req, res) => {
  try {
    const point = points.map((point) => {
      return {
        name: point.name,
        password: point.password,
        ubication: point.ubication,
      }
    })
    // Consultar todos los point en la base de datos
    let pointsdb = await Point.findAll({
      include: [{ model: Material }], // Incluye la relación con Material
    });

    // Verificar si no se encontraron points
    if (pointsdb.length === 0) {
      await Point.bulkCreate(point)
    }

    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      pointsdb = pointsdb.filter((point) =>
        point.name.toLowerCase().startsWith(searchName)
      )
      if (pointsdb.length===0){
        return res.status(404).json({ message: "Point not found" });
      }
      return res.status(200).json(pointsdb)
      
    }

    // Filtro por material
    if (req.query.material) {
      const materialName = req.query.material.toLowerCase();
      pointsdb = pointsdb.filter((point) =>
        point.Material.some(
          (material) => material.name.toLowerCase() === materialName
        )
      );
    }

    // Filtro ascendente
    if (req.query.sort === "asc") {
      pointsdb = pointsdb.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Filtro descendente
    if (req.query.sort === "desc") {
      pointsdb = pointsdb.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Responder con los datos de todos los puntos de reciclaje
    res.status(200).json(pointsdb);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getPoints };
