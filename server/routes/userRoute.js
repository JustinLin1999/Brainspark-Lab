const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

router.post(
  '/signUp',
  userController.createUser,
  tokenController.issueToken,
  (req, res) => res.status(200).json(res.locals.newUser)
)

router.post(
  '/signIn',
  userController.verifyUser,
  tokenController.issueToken,
  (req, res) => res.status(200).json(res.locals.loggedInUser)
)

module.exports = router;