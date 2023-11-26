const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Point',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ubication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      materials: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false
    }
  );
};

