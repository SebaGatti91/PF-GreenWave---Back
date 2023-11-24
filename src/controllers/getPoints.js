const { Material, Point } = require("../db");
const { points } = require ("../apis/points.json")

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
    const pointsdb = await Point.findAll({
      include: [{ model: Material }], // Incluye la relación con PMaterial
    });

    // Verificar si no se encontraron points
    if (pointsdb.length === 0) {
      await Point.bulkCreate(point)
    }

    // Verificar si se proporciona un nombre de punto de reciclaje
    if (req.query.name) {
      // Filtrar los puntos de reciclaje cuyo nombre coincida con el nombre proporcionado en la consulta
      const searchName = req.query.name.toLowerCase();
      pointsdb = points.filter((point) =>
        point.name.toLowerCase().startsWith(searchName)
      ) 
        return res.status(404).json({
        message: "Point not found",
      });
    }

    // Filtro por material
    if (req.query.material) {
      const materialName = req.query.material.toLowerCase();
      pointsdb= pointsdb.filter((point) =>
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

    // Verificar si no se encontraron puntos de reciclaje
    // if (points.length === 0) {
    //   return res.status(404).json({
    //     message: "No se encontraron puntos de reciclaje",
    //   });
    // }

    // Responder con los datos de todos los puntos de reciclaje
    res.status(200).json(pointsdb);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getPoints };
