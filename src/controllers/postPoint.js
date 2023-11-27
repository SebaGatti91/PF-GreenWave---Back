const { Point } = require("../db");

const postPoint = async (req, res) => {
  const { name, password, ubication } = req.body;
  try {
    if (!name || !password || !ubication) {
      return res.status(400).send("Insufficient data");
    }

    // Buscar un punto con el mismo nombre
    const [point, pointCreated] = await Point.findOrCreate({
      where: { name }, // Búsqueda basada en el nombre
      defaults: {
        name,
        password,
        ubication,
      },
    });

    if (pointCreated) {
      return res.status(200).send("Recycling point successfully created");
    }
    return res.status(409).send("The recycling point already exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postPoint };
