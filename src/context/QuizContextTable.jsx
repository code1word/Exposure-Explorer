// src/context/QuizContextTable.jsx
import React, { createContext, useState } from "react";

// Create the context
export const QuizContext = createContext();

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