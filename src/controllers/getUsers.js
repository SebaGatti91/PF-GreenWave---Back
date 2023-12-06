const { User } = require("../db");
const { users } = require("../apis/users.json");

const getUsers = async (req, res) => {
  try {
    
    const usersJSON = users.map((user) => {
      return {
        username: user.username,
        email: user.email,
        password: user.password,
        image: user.image,
        credits: user.credits,
        status: user.status
      };
    });

    let usersDB = await User.findAll();

    if (usersDB.length === 0) {
      usersDB = await User.bulkCreate(usersJSON);
    }

    if (req.query.email) {
      const searchEmail = req.query.email;
      const foundUser = usersDB.find((user) => user.email === searchEmail);

      if (!foundUser) {
        return res.status(404).json({ message: "Email not found" });
      }
    }

    return res.status(200).json(usersDB);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getUsers };
