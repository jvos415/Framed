'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 150]
      }
    },
    comment: DataTypes.TEXT
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
