const { User } = require('../db');

const getDonation = async (req, res) => {
    try {
     const {id} = req.params
     const userFound = await User.findOne({ where: { id: id } });

     if (!userFound) {
       return res.status(404).json({ message: 'Usuario no encontrado' });
     }

     const userDonations = await userFound.getDonations();
     return res.status(200).json({ userDonations });
    
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getDonation
};