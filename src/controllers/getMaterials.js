const { Material, Point } = require("../db");

const getPoints = async (req, res) => {

  try {

    // Consultar todos los materiales en la base de datos
    const points = await Point.findAll({
      include: [{ model: Material }], // Incluye la relación con Points
    });


    // Verificar si se proporciona un nombre de punto de reciclaje
    if (req.query.name) {
      // Filtrar los puntos de reciclaje cuyo nombre coincida con el nombre proporcionado en la consulta
      const searchName = req.query.name.toLowerCase();
      points = points.filter((point) =>
        point.name.toLowerCase().startsWith(searchName)
      );
    }

    // Verificar si no se encontraron puntos de reciclaje
    if (points.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron puntos de reciclaje con ese nombre" });
    }

    // Responder con los datos de todos los puntos de reciclaje
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getPoints};