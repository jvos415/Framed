'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 200]
      }
    },
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
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.belongsTo(models.Album, { foreignKey: 'albumId' });
    Image.hasMany(models.Comment, { foreignKey: 'imageId' });
  };
  return Image;
};
