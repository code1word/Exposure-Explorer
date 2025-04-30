// src/context/QuizContextMatchImage.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for the quiz
export const QuizContext = createContext();

// Provide context values and logic to children components
export const QuizProvider = ({ children }) => {
  const [sliderValues, setSliderValues] = useState({});
  const [selectedImages, setSelectedImages] = useState({});

  // Load initial data from localStorage/sessionStorage
  useEffect(() => {
    const storedSliderValues = JSON.parse(sessionStorage.getItem("sliderValues"));
    const storedSelectedImages = JSON.parse(sessionStorage.getItem("selectedImages"));

    if (storedSliderValues) {
      setSliderValues(storedSliderValues);
    }

    if (storedSelectedImages) {
      setSelectedImages(storedSelectedImages);
    }
  }, []);

  // Save slider values to sessionStorage whenever they change
  useEffect(() => {
    if (Object.keys(sliderValues).length > 0) {
      sessionStorage.setItem("sliderValues", JSON.stringify(sliderValues));
    }
  }, [sliderValues]);

  // Save selected images to sessionStorage whenever they change
  useEffect(() => {
    if (Object.keys(selectedImages).length > 0) {
      sessionStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    }
  }, [selectedImages]);

  // Function to record slider value
  const recordSliderValue = (questionKey, value) => {
    setSliderValues((prev) => ({ ...prev, [questionKey]: value }));
  };

  // Function to record selected image
  const recordSelectedImage = (questionKey, image) => {
    setSelectedImages((prev) => ({ ...prev, [questionKey]: image }));
  };

  // Function to reset the quiz (clear both slider values and selected images)
  const resetQuiz = () => {
    setSelectedImages({});
    setSliderValues({});
    sessionStorage.removeItem("sliderValues");
    sessionStorage.removeItem("selectedImages");
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