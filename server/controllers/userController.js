const bcrypt = require("bcryptjs");
const Account = require("../models/accountModel.js");

userController = {};

userController.verifyUser = (req, res, next) => {
  console.log('start backend sign in');
  const {username, password} = req.body;
  Account.findOne({username})
    .then((account) => {
      console.log(account);
      bcrypt.compare(password, account.password, function (err, isMatch) {
        if (err) return next({
          log: 'Express error handler caught error in signIn comparing password function',
          status: 500,
          message: {err},
        });
        if (isMatch) {
          res.locals.userId = account.id;
          res.locals.username = account.username;
          res.locals.account = account;
          return next();
        } else return res.status(400).json({ result: 'Not Found'});
      });
    })
    .catch((err) => next({
      log:'Express error handler caught signIn error',
      status: 500,
      message: {err}
  }));
}

userController.createUser = (req, res, next) => {
  const {username, password} = req.body;
  console.log(username, password);
  const newAccount = new Account({username, password});
  newAccount.save()
    .then((newAccount) => {
      console.log(newAccount);
      res.locals.userId = newAccount.id;
      res.locals.username = newAccount.username;
      res.locals.newAccount = newAccount;
      return next();
    })
    .catch((err) => next({
      log:'Express error handler caught signUp error',
      status: 500,
      message: {err}
  }));
}

// Export
module.exports = userController;