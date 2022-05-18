const express = require("express");
const { Router } = express;
const Story = require("../models").story;
const storyRouter = Router();

storyRouter.get("/", async (req, res, next) => {
  try {
    const allStory = await Story.findAll();
    res.send(allStory);
  } catch (error) {
    console.log(error), next(error);
  }
});

module.exports = storyRouter;
