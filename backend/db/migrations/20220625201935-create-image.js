'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      albumId: {
        type: Sequelize.INTEGER,
        unique: true
      },
      imageUrl: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(150)
      },
      comment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
