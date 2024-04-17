import React from 'react';
import LogInForm from './LogInForm';
import QuizForm from './QuizForm';
import Quiz from './Quiz';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Middle = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogInForm />}></Route>
        <Route path='/quizform' element={<QuizForm />}></Route>
        <Route path='/quiz' element={<Quiz />}></Route>
      </Routes>
    </Router>
  );
};

export default Middle;