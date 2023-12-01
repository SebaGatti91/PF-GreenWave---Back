const { DataTypes, STRING } = require('sequelize');

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
      status: {
        type: DataTypes.STRING,
        allowNull:true
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

