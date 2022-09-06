'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 250]
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
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.belongsTo(models.Album, { foreignKey: 'albumId' });
    Image.hasMany(models.Comment, { foreignKey: 'imageId',
    onDelete: 'CASCADE', hooks: true });
  };
  return Image;
};
