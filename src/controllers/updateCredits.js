const { User } = require("../db");

const updateCredits = async (req, res) => {

  const { idUser, creditsToAdd } = req.params; 

  try {
    // Buscar el usuario por su ID
    const user = await User.findOne({
      where: { id: idUser },
    });

    // Verificar si el usuario existe
    if (user) {
      // Sumar el valor proporcionado al campo 'credits'
      const newValueCredits = user.credits + parseFloat(creditsToAdd);
      
      // Actualizar el campo 'credits'
      await User.update(
        { credits: newValueCredits },
        { where: { id: idUser } }
      );

      return res.status(200).json({ mensaje: 'Créditos actualizados exitosamente' });
    } else {
     
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { updateCredits };

