const { User } = require("../db");

const postUser = async (req, res) => {
  const { name, email, password, image, credits } = req.body;
  try {
    if (!name || !email || !password || credits === undefined) {
      return res.status(400).send("Insufficient data");
    }

    // Buscar un usuario con el mismo email
    const [user, userCreated] = await User.findOrCreate({
      where: { email },// Búsqueda basada en el email
      defaults: {
        name,
        email,
        password,
        credits,
        image,
      },
    });

    if (userCreated) {
      return res.status(200).send("User successfully created");
    }
    return res.status(409).send("The user already exist with this email");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { postUser };