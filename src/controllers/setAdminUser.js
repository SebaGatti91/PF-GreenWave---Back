const { User } = require('../db');

const setAdminUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedAdmin = !user.admin;

    await User.update({ admin: updatedAdmin }, { where: { id: userId } });

    return res.status(200).json(updatedAdmin);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { 
    setAdminUser
};
