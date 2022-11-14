'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Comments";
   return queryInterface.bulkInsert('Comments', [
    {
     userId: 1,
     imageId: 3,
     comment: "This photo is the bestest photo evvvvaaa!",
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    userId: 1,
    imageId: 5,
    comment: "This photo is not my favorite ;)",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    imageId: 12,
    comment: "Leaving a comment because I can",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageId: 9,
    comment: "This rules! Keep up the good work!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageId: 9,
    comment: "This rules! Keep up the good work!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    imageId: 9,
    comment: "Great stuff!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    imageId: 7,
    comment: "Love it!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageId: 7,
    comment: "Love it more!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageId: 16,
    comment: "This is incredible! Nice shot!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageId: 17,
    comment: "Woooohhhhooooooo!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    imageId: 10,
    comment: "This is a comment, a real live comment",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Comments";
   return queryInterface.bulkDelete(options, null, {});
  }
};
