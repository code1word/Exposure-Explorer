// src/context/QuizContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const QuizContext = createContext();

// Create a provider component
export function QuizProvider_old({ children }) {
  const [score, setScore] = useState(0); // Correct answers counter
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track which were answered
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  // Function to record whether a question was correct
  const recordAnswer = (key, selectedAnswer, isCorrect) => {
    if (!answeredQuestions[key]) { // Prevent double answers
        setAnsweredQuestions(prev => ({
          ...prev,
          [key]: { selectedAnswer, isCorrect } // Store selected answer and correctness
        }));
        if (isCorrect) setScore(prevScore => prevScore + 1);
    }
  };

  // Optionally, you could add a reset function here
  const resetQuiz = () => {
    setScore(0);
    setAnsweredQuestions({});
    setSelectedAnswers({});
  };

  const handleSelectAnswer = (key, selectedAnswer) => {
    setSelectedAnswers(prev => ({ ...prev, [key]: selectedAnswer }));
  };

  return (
    <QuizContext.Provider value={{
        score,
        answeredQuestions,
        selectedAnswers,
        recordAnswer,
        handleSelectAnswer,
        resetQuiz,
     }}>
      {children}
    </QuizContext.Provider>
  );
}

export function QuizProvider({ children }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
  
    const recordAnswer = (key, selectedAnswer) => {
      setSelectedAnswers(prev => ({
        ...prev,
        [key]: selectedAnswer,
      }));
    };
  
    const resetQuiz = () => {
      setSelectedAnswers({});
    };
  
    return (
      <QuizContext.Provider value={{ selectedAnswers, recordAnswer, resetQuiz }}>
        {children}
      </QuizContext.Provider>
    );
  }