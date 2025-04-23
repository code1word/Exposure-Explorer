import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { quizQuestionData } from "../data/quizQuestionData";
import { QuizContext } from "../context/QuizContextMultipleChoice";

function PracticeMode() {
  const navigate = useNavigate();
  const { resetQuiz } = useContext(QuizContext);

  const handleStart = () => {
    resetQuiz();
    const firstQuestionKey = Object.keys(quizQuestionData)[0];
    navigate(`/learn/practice/${firstQuestionKey}`);
  };

  return (
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #dbe3ee, #ffffff)",
        minHeight: "90vh"
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          color: "#1d2a45",
        }}
      >
        <em>Ready to test your knowledge of the exposure triangle?</em>
      </h2>
      <h3
        style={{
          fontSize: "1.2rem",
          marginTop: "1rem",
          color: "#35476b",
          fontStyle: "italic",
        }}
      >
        This short quiz will challenge what you’ve learned — from recognizing settings to applying them in real scenarios. Click Start to begin!
      </h3>
        <br></br>
      <Button
        size="lg"
        className="quiz-start-button"
        onClick={handleStart}
      >
        Start Quiz
      </Button>
    </Container>
  );
}

export default PracticeMode;
