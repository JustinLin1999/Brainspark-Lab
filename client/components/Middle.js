import React, { useState } from 'react';
import LogInForm from './LogInForm';
import QuizForm from './QuizForm';
import Quiz from './Quiz';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Middle = () => {
  const [quizObject, setQuizObject] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path='/loginform' element={<LogInForm />}></Route>
        <Route path='/quizform' element={<QuizForm setQuizObject={setQuizObject} />}></Route>
        <Route path='/quiz' element={<Quiz quizObject={quizObject} />}></Route>
      </Routes>
    </Router>
  );
};

export default Middle;