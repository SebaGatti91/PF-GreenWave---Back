const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Donation',
    {
      nameMaterial: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     addres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false
    }
  );
};