const { Point, Material } = require("../db");
const { points } = require("../apis/points.json")

const getPoints = async (req, res) => {
  try {
    const point = points.map((point) => {
      return {
        name: point.name,
        password: point.password,
        ubication: point.ubication,
        materials: point.materials.join(", ")
      }
    })
    // Consultar todos los point en la base de datos
    let pointsFromDB = await Point.findAll();

    // Verificar si no se encontraron points
    if (pointsFromDB.length === 0) {
      pointsFromDB = await Point.bulkCreate(point);
    }

    // Filtro por nombre
    if (req.query.name) {
      const searchName = req.query.name.toLowerCase();
      pointsFromDB = pointsFromDB.filter((point) =>
        point.name.toLowerCase().startsWith(searchName)
      )
      if (pointsFromDB.length === 0) {
        return res.status(404).json({ message: "Point not found" });
      }
      return res.status(200).json(pointsFromDB)
    }

    // Filtro por material
    if (req.query.material) {
      const materialName = req.query.material.toLowerCase();
      pointsFromDB = pointsFromDB.filter((product) =>
        product.materials.toLowerCase().includes(materialName)
      );
      if (pointsFromDB.length === 0) {
        return res.status(404).json({ message: "Point not found" });
      }
      return res.status(200).json(pointsFromDB)
    }

    // Filtro ascendente
    if (req.query.sort === "asc") {
      pointsFromDB = pointsFromDB.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Filtro descendente
    if (req.query.sort === "desc") {
      pointsFromDB = pointsFromDB.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Responder con los datos de todos los puntos de reciclaje
    return res.status(200).json(pointsFromDB);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getPoints };
