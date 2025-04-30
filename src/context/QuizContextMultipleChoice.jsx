// src/context/QuizContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [selectedAnswers, setSelectedAnswers] = useState(() => {
      // Get the saved answers from localStorage (if any)
      const savedAnswers = localStorage.getItem("selectedAnswers");
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    });
  
    const recordAnswer = (key, selectedAnswer) => {
      // Save the answer in state
      setSelectedAnswers(prev => {
        const updatedAnswers = {
          ...prev,
          [key]: selectedAnswer,
        };
        
        // Also save it in localStorage for persistence across refreshes
        localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
        
        return updatedAnswers;
      });
    };
  
    const resetQuiz = () => {
      setSelectedAnswers({});
      // Clear the answers from localStorage
      localStorage.removeItem("selectedAnswers");
    };
  
    return (
      <QuizContext.Provider value={{ selectedAnswers, recordAnswer, resetQuiz }}>
        {children}
      </QuizContext.Provider>
    );
  }