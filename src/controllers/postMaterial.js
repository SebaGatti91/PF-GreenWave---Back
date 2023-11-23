const { Material } = require("../db");

const postMaterial = async (req, res) => {
  const { name, credit_value, money_value } = req.body;
  try {
    if (!name || !credit_value || !money_value) {
      return res.status(400).send("Faltan datos");
    }

    // Buscar un material con el mismo nombre
    const [material, materialCreated] = await Dog.findOrCreate({
      where: { name }, // Búsqueda basada en el nombre
      defaults: {
        name,
        credit_value,
        money_value,
      },
    });

    if (!materialCreated) {
      return res.status(409).send("Ya existe ese material");
    }
    return res.status(200).send("Material creado");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postMaterial};
