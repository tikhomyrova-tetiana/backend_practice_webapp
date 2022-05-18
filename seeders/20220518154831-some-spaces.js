"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Story 1",
          description: "It's a really short story",
          backgroundColor: "#ffffff",
          color: "#000000",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Story 2",
          description: "This is will be another story",
          backgroundColor: "#ffffff",
          color: "#000000",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
