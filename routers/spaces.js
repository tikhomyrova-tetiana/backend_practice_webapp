const express = require("express");
const { Router } = express;
const Space = require("../models").space;
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
    const specificSpace = await Space.findByPk(req.params.id);
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

module.exports = spaceRouter;
