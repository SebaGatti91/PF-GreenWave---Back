const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credits: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
};

