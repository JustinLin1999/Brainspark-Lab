const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const tokenController = require("../controllers/tokenController");

router.post(
  '/storeResult',
  tokenController.verifyToken,
  quizController.storeResult,
  (req, res) => res.status(200).json(res.locals.newRecord)
)

module.exports = router;