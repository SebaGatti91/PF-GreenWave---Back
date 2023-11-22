const { Point } = reuire("../db");

const postPoint = async (req, res) => {
  const { name, password, image, ubication } = req.body;
  try {
    if (!name || !password || !image|| !ubication) {
      return res.status(400).send("Faltan datos");
    }

    // Buscar un material con el mismo nombre
    const [point, pointCreated] = await Point.findOrCreate({
      where: { name }, // Búsqueda basada en el nombre
      defaults: {
        name,
        password,
        image,
        ubication,
      },
    });

    if (!pointCreated) {
      return res.status(409).send("Ya existe ese punto de reciclaje");
    }
    return res.status(200).send("Punto de reciclaje creado");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postPoint };
