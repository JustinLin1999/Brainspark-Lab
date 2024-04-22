require("dotenv").config();

const express = require('express');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const quizRoute = require('./routes/quizRoute');

const PORT = 3000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: true, credentials: true }))

console.log(app.settings.env);
app.get('/bundle.js', (req, res) =>{
  console.log('bundle request');
  return res.status(200).sendFile(path.join(__dirname, './../dist/bundle.js'));
});
app.get('/*',(req,res)=> {
  console.log('reuest recieved');
  return res.status(200).sendFile(path.join(__dirname, './../dist/index.html'));
});

// server side routing
app.use('/user', userRoute);
app.use('/quiz', quizRoute);

// testing connection
app.get('/testing', (req, res) => res.status(200).send('connected'));

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

