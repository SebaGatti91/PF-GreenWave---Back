const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Material',
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
      // quantity: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   default: 0,
      // },
      // credit_value: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // },
      // money_value: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // }
    },
    {
      timestamps: false
    }
  );
};

