const { User } = require("../db");
const { users } = require("../apis/users.json");

const getUsers = async (req, res) => {
  try {
    const user = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        credits: user.credits
      };
    });
    // Consultar todos los usuarios en la base de datos
    let userFromDb = await User.findAll();

    // Verificar si no se encontraron usuarios
    if (userFromDb.length === 0) {
      userFromDb = await User.bulkCreate(user);
    }

    // Responder con los datos de todos los usuarios
    return res.status(200).json(userFromDb);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getUsers };