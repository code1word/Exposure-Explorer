// src/context/QuizContextMatchImage.jsx
import React, { createContext, useContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [sliderValues, setSliderValues] = useState({});
  const [selectedImages, setSelectedImages] = useState({});

  const recordSliderValue = (questionKey, value) => {
    setSliderValues(prev => ({ ...prev, [questionKey]: value }));
  };

  const recordSelectedImage = (questionKey, image) => {
    setSelectedImages(prev => ({ ...prev, [questionKey]: image }));
  };

  const resetQuiz = () => {
    setSelectedImages({});
    setSliderValues({});
  };

  return (
    <QuizContext.Provider
      value={{
        sliderValues,
        selectedImages,
        recordSliderValue,
        recordSelectedImage,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
