const { User } = require('../db');

const putUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, image } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      username: username || user.username,
      image: image || user.image,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  putUser,
};
