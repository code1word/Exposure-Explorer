import React, { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Initialize state with values from localStorage if available
  const [sliderValues, setSliderValues] = useState(() => {
    const savedSliderValues = localStorage.getItem("sliderValues");
    return savedSliderValues ? JSON.parse(savedSliderValues) : {};
  });

  const [selectedImages, setSelectedImages] = useState(() => {
    const savedSelectedImages = localStorage.getItem("selectedImages");
    return savedSelectedImages ? JSON.parse(savedSelectedImages) : {};
  });

  // Save slider values to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(sliderValues).length > 0) {
      localStorage.setItem("sliderValues", JSON.stringify(sliderValues));
    }
  }, [sliderValues]);

  // Save selected images to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(selectedImages).length > 0) {
      localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    }
  }, [selectedImages]);

  // Function to record slider value
  const recordSliderValue = (key, value) => {
    setSliderValues((prev) => ({ ...prev, [key]: value }));
  };

  // Function to record selected image
  const recordSelectedImage = (key, image) => {
    setSelectedImages((prev) => ({ ...prev, [key]: image }));
  };

  // Function to reset the quiz (clear both slider values and selected images)
  const resetQuiz = () => {
    setSelectedImages({});
    setSliderValues({});
    localStorage.removeItem("sliderValues");
    localStorage.removeItem("selectedImages");
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