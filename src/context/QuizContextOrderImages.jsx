// src/context/QuizContextOrderImages.jsx

import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [selectedOrder, setSelectedOrder] = useState({});

  const recordOrder = (key, orderArray) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [key]: orderArray,
    }));
  };

  const resetQuiz = () => {
    setSelectedOrder({});
  };

  return (
    <QuizContext.Provider value={{ selectedOrder, recordOrder, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}
