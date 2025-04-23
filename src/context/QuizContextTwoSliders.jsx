import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [sliderValues, setSliderValues] = useState({});
  const [selectedImages, setSelectedImages] = useState({});

  const recordSliderValue = (key, value) => {
    setSliderValues(prev => ({ ...prev, [key]: value }));
  };

  const recordSelectedImage = (key, image) => {
    setSelectedImages(prev => ({ ...prev, [key]: image }));
  };

  const resetQuiz = () => {
    setSliderValues({});
    setSelectedImages({});
  };

  return (
    <QuizContext.Provider
      value={{
        sliderValues,
        selectedImages,
        recordSliderValue,
        recordSelectedImage,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
