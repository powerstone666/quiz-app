import React, { useState, useEffect } from "react";
import Home from "./home";
import Quiz from "./quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // Initialize from localStorage or default to an empty array
  const [questions, setQuestions] = useState(() => {
    const stored = localStorage.getItem("questions");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
    console.log("Updated questions in App:", questions);
  }, [questions]);

  return (
    <>
      <nav className="w-full h-12 bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl">Quiz App</h1>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Home setQuestions={setQuestions} />} />
          <Route path="/quiz" element={<Quiz questions={questions} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;