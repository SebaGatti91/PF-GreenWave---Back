const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Review',
    {
     comments: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
      timestamps: false
    }
  );
};