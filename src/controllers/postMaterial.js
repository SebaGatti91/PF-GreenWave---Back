const { Material } = require("../db");

const postMaterial = async (req, res) => {
  const { name, quantity, credit_value, money_value } = req.body;
  try {
    if (!name || !quantity || !credit_value || !money_value) {
      return res.status(400).send("Insufficient data");
    }

    // Buscar un material con el mismo nombre
    const [material, materialCreated] = await Material.findOrCreate({
      where: { name }, // Búsqueda basada en el nombre
      defaults: {
        name,
        quantity,
        credit_value,
        money_value,
      },
    });

    if (materialCreated) {
      return res.status(200).send("Material successfully created");
    }
    return res.status(409).send("The material already exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postMaterial };
