const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
          isDecimal: true,
        },
      },
      reviewedBy: {
        type: DataTypes.JSONB, 
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
