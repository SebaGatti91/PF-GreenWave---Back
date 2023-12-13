const { User } = require("../db");

const postUser = async (req, res) => {
  const { email, name, image } = req.body;

  try {
    if (!email) {
      return res.status(400).send("Insufficient data: Email is required");
    }

    // Buscar un usuario con el mismo email
    const [user, userCreated] = await User.findOrCreate({
      where: { email }, // Búsqueda basada en el email
      defaults: {
        username: name,
        image: image,
        email,
        credits: 0,
        status: true
      },
    });
 // 200 = creado o not banned
 // 409 = banned
 // confirmacion sebas para hacer un 400 = usuario ya existente
 
    if (userCreated || user.status === true) {
      return res.status(200).send("User successfully created");
    }

    return res.status(409).send(user.status);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { postUser };