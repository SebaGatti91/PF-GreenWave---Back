const { User } = require("../db");
const { users } = require("../apis/users.json");

const getUsers = async (req, res) => {
  try {
    
    // // Map the information of users from the JSON file
    // const usersJSON = users.map((user) => {
    //   return {
    //     name: user.name,
    //     email: user.email,
    //     password: user.password,
    //     image: user.image,
    //     credits: user.credits,
    //   };
    // });

    // Query all users in the database
    let usersDB = await User.findAll();

    // // Check if no users were found in the database and create them from the JSON
    // if (usersDB.length === 0) {
    //   usersDB = await User.bulkCreate(usersJSON);
    // }

    // Search by email
    if (req.query.email) {
      const searchEmail = req.query.email;
      const foundUser = usersDB.find((user) => user.email === searchEmail);

      if (!foundUser) {
        return res.status(404).json({ message: "Email not found" });
      }

      // // Verify the password
      // if (foundUser.password === req.query.password) {
      //   return res.status(200).json(foundUser);
      // } else {
      //   return res.status(404).json({ message: "Incorrect password" });
      // }
    }

    // Respond with the data of all users
    return res.status(200).json(usersDB);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getUsers };
