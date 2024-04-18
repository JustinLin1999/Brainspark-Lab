const Record = require('../models/recordModel');
const mongoose = require('mongoose');

quizController = {};

quizController.storeResult = (req, res, next) => {
  const { questionNumber, category, difficulty, questionType, dataArray, answerArray, correctCount } = req.body;
  const user = mongoose.Types.ObjectId.createFromHexString(res.locals.userId);
  console.log(user, questionNumber, category, difficulty, questionType, dataArray, answerArray, correctCount);
  const newRecord = new Record({
    user,
    question_number: questionNumber,
    category,
    difficulty,
    question_type: questionType,
    data_array: JSON.stringify(dataArray),
    answer_array: JSON.stringify(answerArray),
    correct_count: correctCount
  });
  console.log('newRecord:', newRecord);
  newRecord.save()
    .then((newRecord) => {
      console.log(newRecord);
      res.locals.newRecord = newRecord;
      return next();
    })
    .catch((err) => next({
      log:'Express error handler caught storeResult error',
      status: 500,
      message: {err}
    }));
}

// Export
module.exports = quizController;