const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const geminiController = require("../controllers/geminiController");

router.post(
  '/quizInformation',
  //tokenController.verifyToken,
  geminiController.getQuizInformation,
  (req, res) => res.status(200).json(res.locals.geminiResponse)
)

module.exports = router;