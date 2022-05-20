const express = require("express");
const { Router } = express;
const Space = require("../models").space;
const Story = require("../models").story;
const spaceRouter = Router();

spaceRouter.get("/", async (req, res, next) => {
  try {
    const allSpaces = await Space.findAll();
    res.send(allSpaces);
  } catch (error) {
    console.log(error), next(error);
  }
});

spaceRouter.get("/:id", async (req, res, next) => {
  try {
    const specificSpace = await Space.findByPk(req.params.id, {
      include: [{ model: Story }],
      order: [[Story, "createdAt", "DESC"]],
    });
    if (!specificSpace) {
      res.status(404).send(`No space with id ${req.params.id}`);
      return;
    } else {
      res.send(specificSpace);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

spaceRouter.delete("/story/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const storyToDelete = await Story.findByPk(id);

    if (!storyToDelete) return res.status(404).send("no story found");

    await storyToDelete.destroy();
    // const deletedStory = storyToDelete.destroy({ where: { id: id } });

    // look at delete status
    // should we send something?
    res.send({ message: "story deleted!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

spaceRouter.post("/story", async (req, res, next) => {
  try {
    const { name, content, imageUrl, spaceId } = req.body;
    const space = await Space.findByPk(spaceId);
    if (!space) {
      res.status(404).send(`No space with id ${spaceId}`);
      return;
    } else {
      if (!name || !content || !imageUrl || !spaceId) {
        res.status(400).send("Not enough information provided");
        return;
      }
    }
    const newStory = await Story.create({ name, content, imageUrl, spaceId });
    res.send(newStory);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = spaceRouter;
