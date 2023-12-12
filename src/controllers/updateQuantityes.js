const { Material } = require("../db");

const updateQuantityes = async (req, res) => {

  const { idMaterial, materialToAdd } = req.params; 

  try {
    // Buscar el material por su ID
    const material = await Material.findOne({
      where: { id: idMaterial },
    });

    // Verificar si el material existe
    if (material) {
      // Sumar la cantidad de materiales
      const newQuantityMaterials = material.quantity + parseInt(materialToAdd, 10);
      
      // Actualizar el campo 'quantity'
      await Material.update(
        { quantity: newQuantityMaterials },
        { where: { id: idMaterial } }
      );

      return res.status(200).json({ mensaje: 'Cantidad de material actualizado exitosamente' });
    } else {
     
      return res.status(404).json({ mensaje: 'Material no encontrado' });
    }
  } catch (error) {
    
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { updateQuantityes };

