const { User } = require("../db");

const postUser = async (req, res) => {
  const { name, email, image } = req.body;

  try {
    if (!email) {
      return res.status(400).send("Insufficient data: Email is required");
    }

    // Buscar un usuario con el mismo email
    const [user, userCreated] = await User.findOrCreate({
      where: { email }, // Búsqueda basada en el email
      defaults: {
        email,
        credits: 0,
        status: true
      },
    });

    if (userCreated) {
      return res.status(200).send("User successfully created");
    }

    return res.status(409).send("The user already exists with this email");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { postUser };