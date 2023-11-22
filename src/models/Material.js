const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo.
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Material', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4
     },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
      credit_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      money_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    }, {
      timestamps: false 
    });
  };

