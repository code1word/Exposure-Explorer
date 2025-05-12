import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
//import { quizQuestionData } from "../data/quizQuestionData";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { QuizContext as QuizContextMultipleChoice } from "../context/QuizContextMultipleChoice";
import { QuizContext as QuizContextTableFillBlanks } from "../context/QuizContextTable";
import { QuizContext as QuizContextOrderImages } from "../context/QuizContextOrderImages";
import { QuizContext as QuizContextMatchImage } from "../context/QuizContextMatchImage";
import { QuizContext as QuizContextTwoSliders } from "../context/QuizContextTwoSliders";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faQuestionCircle,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";

function PracticeMode() {
  const navigate = useNavigate();
  const [quizQuestionData, setQuizQuestionData] = useState({});
  const [loading, setLoading] = useState(false);

  const { resetQuiz: resetQuizMC } = useContext(QuizContextMultipleChoice);
  const { resetQuiz: resetQuizTAB } = useContext(QuizContextTableFillBlanks);
  const { resetQuiz: resetQuizORD } = useContext(QuizContextOrderImages);
  const { resetQuiz: resetQuizMATCH1 } = useContext(QuizContextMatchImage);
  const { resetQuiz: resetQuizMATCH2 } = useContext(QuizContextTwoSliders);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_API_BASE_URL}/get-quiz-questions`
  //       );
  //       setQuizQuestionData(res.data);
  //     } catch (error) {
  //       console.error("Error fetching quiz questions:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchQuestions();
  // }, []);

  const handleStart = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/get-quiz-questions`
      );
      const data = res.data;
      setQuizQuestionData(data);

      resetQuizMC();
      resetQuizTAB();
      resetQuizORD();
      resetQuizMATCH1();
      resetQuizMATCH2();

      const firstQuestionKey = Object.keys(data)[0];
      navigate(`/quiz/${firstQuestionKey}`, {
        state: { quizQuestionData: data },
      });
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      alert("Failed to load quiz data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "3rem",
      }}
    >
      <div className="camera-thought-wrapper">
        <FontAwesomeIcon icon={faCameraRetro} className="central-camera" />
        <div className="thought-bubble">
          <FontAwesomeIcon icon={faQuestionCircle} className="bubble-icon" />
          <div className="trail-bubbles">
            <span className="bubble bubble1" />
            <span className="bubble bubble2" />
            <span className="bubble bubble3" />
          </div>
        </div>
      </div>

      <h2
        style={{
          fontSize: "2.5rem",
          color: "#13275e",
        }}
      >
        <strong>Ready to test your knowledge of the exposure triangle?</strong>
      </h2>
      <h3
        style={{
          fontSize: "1.2rem",
          marginTop: "1rem",
          color: "#13275e",
          fontStyle: "italic",
        }}
      >
        This short quiz will challenge what you’ve learned — from recognizing
        settings to applying them in real scenarios.
      </h3>
      <br></br>
      <Button
        size="lg"
        className="quiz-start-button"
        onClick={handleStart}
        disabled={loading}
        style={{
          border: "2px solid #13275e",
          // backgroundColor: "#13275e",
          backgroundColor: loading ? "#999" : "#13275e",
          color: "white",
          fontWeight: "bold",
          transition: "all 0.2s ease",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1.5rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#ABE2FB";
          e.currentTarget.style.color = "#13275e";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#13275e";
          e.currentTarget.style.color = "white";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {loading ? (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{ fontSize: "1.25rem" }}
            />
            <span className="ms-2">Loading...</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPlay} />
            <span>Start Quiz</span>
          </>
        )}
      </Button>
    </Container>
  );
}

export default PracticeMode;
