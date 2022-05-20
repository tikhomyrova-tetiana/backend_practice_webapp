const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Space = require("../models").space;
const Story = require("../models").story;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }
    // The space is stored in the redux store in the frontend include:
    const user = await User.findOne({
      where: { email },
      include: [{ model: Space, include: [Story] }],
    });
    //another way of adding space
    // const space = await Space.findOne({where: {userId: user.id}})

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, user: user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });
    // create a space for newUser
    const newSpace = await Space.create({
      title: `${newUser.name}'s Space`,
      description: null,
      backgroundColor: "#ffffff",
      color: "#000000",
      userId: newUser.id,
    });
    //and create a new query for getting data
    const user = await User.findByPk(newUser.id, {
      where: { email },
      include: [{ model: Space, include: [Story] }],
    });

    delete user.dataValues["password"]; // don't send back the password hash, change to user(not newUser)

    const token = toJWT({ userId: newUser.id });
    // The space is sent in the response of `/signup` together with the new user newSpace
    //and a new key for space, we can check it in sighnup on frontend by console log it
    res.status(201).json({ token, user: newUser.dataValues, space: newSpace });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  //We added it to see space that we created and also need to add "space" in request status
  const space = await Space.findOne({
    where: { userId: req.user.id },
    include: [Story],
  });
  //it goes somewhere from the middelware
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues, space });
});

module.exports = router;
