const express = require('express');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const Account = require('./models/accountModel');
const bcrypt = require('bcryptjs');

// uncomment the below for proxy challenge
// const leaderList = [
//   {name: 'Anna', id: 'a0'},
//   {name: 'Ben', id: 'b0'},
//   {name: 'Clara', id: 'c0'},
//   {name: 'David', id: 'd0'},
// ];
const PORT = 3000;
const app = express();
const mongoURL = 'mongodb://localhost/brainspark-lab';
mongoose.connect(mongoURL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(cors());
// to set cookie
app.use(cors({ origin: true, credentials: true }))
//app.use('/client', express.static(path.resolve(__dirname, '../client')));

const corsEnable = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

console.log(app.settings.env);
app.get('/bundle.js', (req, res) =>{
  console.log('bundle request')
  return res.status(200).sendFile(path.join(__dirname, './../dist/bundle.js'));
})
app.get('/*',(req,res)=> {
  console.log('reuest recieved')
  return res.status(200).sendFile(path.join(__dirname, './../dist/index.html'));
});

// app.get('/api/leaders', (req, res) => {
//   return res.status(200).send(leaderList);
// });

app.post('/signUp', (req, res, next) => {
  const {username, password} = req.body;
  console.log(username, password);
  const newAccount = new Account({username, password});
  newAccount.save()
    .then((account) => {
      console.log(account);
      res.cookie('user', account.username);
      return res.status(200).json(account);
    })
    .catch((err) => next({
      log:'Express error handler caught signUp error',
      status: 500,
      message: {err}
  }));
})

app.post('/signIn', (req, res, next) => {
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
          res.cookie('user', account.username, {maxAge: 9000000000, httpOnly: true });
          return res.status(200).json(account);
        } else return res.status(400).json({ result: 'Not Found'});
      });
    })
    .catch((err) => next({
      log:'Express error handler caught signIn error',
      status: 500,
      message: {err}
  }));
})

app.post('/getQuiz', (req, res, next) => {
  const {apiString} = req.body;
  console.log(apiString);
  newAccount.save()
    .then((account) => {
      console.log(account);
      return res.status(200).json(account);
    })
    .catch((err) => next({
      log:'Express error handler caught signUp error',
      status: 500,
      message: {err}
  }));
})

//testing
app.get('/testing', (req, res) => {
  Account.find({})
    .exec()
    .then((data) => {
      return res.status(200).json(data);
    })
});

app.use('*', (req,res) => res.status(404).send('Not Found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultObj = {
    log:'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'}
  }
  const errObj = Object.assign({}, defaultObj, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

//listens on port 3000 -> http://localhost:3000/
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`);});

