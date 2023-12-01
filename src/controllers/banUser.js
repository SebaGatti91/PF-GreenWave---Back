const { User } = require('../db');

const banUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedStatus = !user.status;

    await User.update({ status: updatedStatus }, { where: { id: userId } });

    return res.status(200).json(user.status);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { 
    banUser 
};
