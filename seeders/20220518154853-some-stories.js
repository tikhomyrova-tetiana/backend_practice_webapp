"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Story 1",
          content:
            "Once upon a time, in a desert far away, there was a rose who was so proud of her beautiful looks. Her only complaint was growing next to an ugly cactus.",
          imageUrl: "https://inlnk.ru/poe0Zv",
          spaceId: 1,
          createdAt: "2022-05-18T19:53:44.580Z",
          updatedAt: new Date(),
        },
        {
          name: "Story 2",
          content:
            "Once, there was a boy who became bored when he watched over the village sheep grazing on the hillside. To entertain himself, he sang out, “Wolf! Wolf! The wolf is chasing the sheep!”",
          imageUrl:
            "https://cdn.tinybuddha.com/wp-content/uploads/2015/04/Fairy-Tale.png",
          spaceId: 2,
          createdAt: "2022-05-15T19:53:44.580Z",
          updatedAt: new Date(),
        },
        {
          name: "Story 3",
          content:
            "One day, Molly the milkmaid had filled her pails with milk. Her job was to milk the cows, and then bring the milk to the market to sell. Molly loved to think about what to spend her money on.",
          imageUrl:
            "https://www.pandotrip.com/wp-content/uploads/2014/09/Top-Castles-Mont-Saint-Michel-980x735.jpg",
          spaceId: 2,
          createdAt: "2022-05-18T19:53:44.580Z",
          updatedAt: new Date(),
        },
        {
          name: "Story 4",
          content:
            "The magic of travelling alone is often hidden, underlying. I realised it only after the initial fear was gone and I explored this city, learned all its secrets, heard all that it had to whisper to me - only to me. You can’t not fall in love with it.",
          imageUrl:
            "https://www.esn.org/blog/sites/default/files/travelling_alone_all_across_the_globe.jpg",
          spaceId: 1,
          createdAt: "2022-03-18T19:53:44.580Z",
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
