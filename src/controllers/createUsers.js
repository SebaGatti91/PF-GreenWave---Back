const { User } = require("../db");
const { users } = require("../apis/users.json");

const createUsers = async () => {
  try {
    for (const user of users) {
      const [createdUsers] = await User.findOrCreate({
        where: {
          email: user.email,
        },
        defaults: {
          username: user.username,
          image: user.image,
          credits: user.credits,
        },
      });
    }
    return "Users successfully created";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createUsers };