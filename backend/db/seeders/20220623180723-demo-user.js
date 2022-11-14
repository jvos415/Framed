"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "bobbyboy@user.io",
          username: "BobbyBoy",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "jamesMaddison@user.io",
          username: "jMadzz",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "BatMan@user.io",
          username: "BatMan7000",
          hashedPassword: bcrypt.hashSync("password6"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Users";
    queryInterface.bulkDelete("Albums");
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "BobbyBoy",
            "jMadzz",
            "BatMan7000",
          ],
        },
      },
      {}
    );
  },
};
