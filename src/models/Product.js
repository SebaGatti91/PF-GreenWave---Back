const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Product', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4
     },
     userId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type:DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false 
    });
  };
