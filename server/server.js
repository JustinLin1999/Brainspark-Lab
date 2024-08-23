require("dotenv").config();

const express = require('express');
const next = require("next");
const path = require('node:path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const quizRoute = require('./routes/quizRoute');
const geminiRoute = require('./routes/geminiRoute');

const PORT = 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  server.use(cors(corsOptions));
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  console.log(server.settings.env);

  // gemini
  server.use('/gemini', geminiRoute);

  // server side routing
  server.use('/user', userRoute);
  server.use('/quiz', quizRoute);

  // testing connection
  server.get('/testing', (req, res) => res.status(200).send('connected'));

  server.get('*', (req,res) => {return handle(req, res);});

  // Global error handler
  server.use((err, req, res, next) => {
    const defaultObj = {
      log:'Express error handler caught unknown middleware error',
      status: 500,
      message: {err: 'An error occurred'}
    }
    const errObj = Object.assign({}, defaultObj, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
  });

  server.listen(PORT, () => {
    console.log(`🚀 Server launching on http://localhost:${PORT}`);
  });
});