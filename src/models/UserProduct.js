const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'UserProduct',
    {
     isPurchase: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
     }
    },
    {
      timestamps: false
    }
  );
};