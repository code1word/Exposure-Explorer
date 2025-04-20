// src/components/PracticeMode.jsx

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, ProgressBar } from "react-bootstrap";
import { quizQuestionData } from "../data/quizQuestionData";
import { Button } from "react-bootstrap";
import MultipleChoiceQuestion from "./quiz/MultipleChoiceQuestion";
import MatchImageQuestion from "./quiz/MatchImageQuestion";
import { QuizContext } from "../context/QuizContext"; 


function PracticeMode() {

  const navigate = useNavigate();
  const { resetQuiz } = useContext(QuizContext);

  const handleStart = () => {
    resetQuiz();
    const firstQuestionKey = Object.keys(quizQuestionData)[0];
    navigate(`/learn/practice/${firstQuestionKey}`);
  };


  return (
    <div style={{ padding: "2rem", textAlign: "center", marginLeft: "2rem", marginRight: "2rem" }}>
      <h2>
        <em>Ready to test your knowledge of the exposure triangle?</em>
      </h2>
      <h3>This short quiz will challenge what you’ve learned — from recognizing settings to applying them in real scenarios. Click Start to begin!</h3>
      
      <button
        variant="primary"
        size="lg"
        style={{ marginTop: "2rem" }}
        onClick={handleStart}
      >
        Start Quiz
      </button>

    </div>
  );
}



export default PracticeMode;
