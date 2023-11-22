const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Point', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4
     },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ubication: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      timestamps: false 
    });
  };

