// src/context/QuizContextOrderImages.jsx

import React, { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [selectedOrder, setSelectedOrder] = useState({});

  // Load saved order from localStorage when the component mounts
  useEffect(() => {
    const savedOrder = localStorage.getItem("selectedOrder");
    if (savedOrder) {
      setSelectedOrder(JSON.parse(savedOrder));
    }
  }, []);

  // Save selected order to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(selectedOrder).length > 0) {
      localStorage.setItem("selectedOrder", JSON.stringify(selectedOrder));
    }
  }, [selectedOrder]);

  const recordOrder = (key, orderArray) => {
    setSelectedOrder((prev) => {
      const newOrder = { ...prev, [key]: orderArray };
      return newOrder;
    });
  };

  const resetQuiz = () => {
    setSelectedOrder({});
    localStorage.removeItem("selectedOrder");  // Optionally clear localStorage when resetting the quiz
  };

  return (
    <QuizContext.Provider value={{ selectedOrder, recordOrder, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}
