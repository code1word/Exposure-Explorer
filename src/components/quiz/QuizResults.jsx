// src/components/quiz/QuizResults

import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Container, ProgressBar } from "react-bootstrap";
//import { quizQuestionData } from "../../data/quizQuestionData";

import { QuizContext as QuizContextMultipleChoice } from "../../context/QuizContextMultipleChoice";
import { QuizContext as QuizContextTableFillBlanks } from "../../context/QuizContextTable";
import { QuizContext as QuizContextOrderImages } from "../../context/QuizContextOrderImages";
import { QuizContext as QuizContextMatchImage } from "../../context/QuizContextMatchImage";
import { QuizContext as QuizContextTwoSliders } from "../../context/QuizContextTwoSliders";

import axios from "axios";

function QuizResults() {
  const { selectedAnswers: selectedAnswersMC, resetQuiz: resetQuizMC } =
    useContext(QuizContextMultipleChoice);
  const { selectedAnswers: selectedAnswersTable, resetQuiz: resetQuizTAB } =
    useContext(QuizContextTableFillBlanks);
  const { selectedOrder: selectedOrderImages, resetQuiz: resetQuizORD } =
    useContext(QuizContextOrderImages);
  const { selectedImages: selectedImageMatch1, resetQuiz: resetQuizMATCH1 } =
    useContext(QuizContextMatchImage);
  const { selectedImages: selectedImageMatch2, resetQuiz: resetQuizMATCH2 } =
    useContext(QuizContextTwoSliders);

  const [quizQuestionData, setQuizQuestionData] = useState({});
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [questionCorrectness, setQuestionCorrectness] = useState({});

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-quiz-questions"
        );
        setQuizQuestionData(response.data); // Update state with fetched data
        //setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuizData();
  }, []);

  const questionKeys = useMemo(
    () => Object.keys(quizQuestionData),
    [quizQuestionData]
  );

  useEffect(() => {
    let calculatedScore = 0;
    let newCorrectness = {};

    questionKeys.forEach((key) => {
      const question = quizQuestionData[key];
      const questionNum = question.question_number;

      let isCorrect = false;

      if (question.format === "multiple_choice") {
        isCorrect = selectedAnswersMC[key] === question.answer;
      } else if (question.format === "table_fill_blanks") {
        const userAnswers = selectedAnswersTable[key] || {};
        const correctAnswers = question.correctAnswers;

        const allMatch = Object.entries(correctAnswers).every(
          ([cellKey, correctVal]) => userAnswers[cellKey] === correctVal
        );

        isCorrect = allMatch;
      } else if (question.format === "order_images") {
        const userOrder = selectedOrderImages[key];
        isCorrect =
          JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);
      } else if (question.format === "match_image") {
        isCorrect = selectedImageMatch1[key] === question.referenceImage;
      } else if (question.format === "two_sliders") {
        isCorrect = selectedImageMatch2[key] === question.referenceImage;
      }

      newCorrectness[questionNum] = isCorrect;
      if (isCorrect) calculatedScore++;
    });

    setQuestionCorrectness(newCorrectness);
    setScore(calculatedScore);
  }, [
    selectedAnswersMC,
    selectedAnswersTable,
    selectedOrderImages,
    selectedImageMatch1,
    selectedImageMatch2,
    questionKeys,
  ]);

  const handleStart = () => {
    resetQuizMC();
    resetQuizTAB();
    resetQuizORD();
    resetQuizMATCH1();
    resetQuizMATCH2();
    navigate(`/quiz/${questionKeys[0]}`);
  };

  return (
    <div className="navy" style={{ padding: "2rem", textAlign: "center" }}>
      <br />
      <h1>
        <em>
          <strong>
            You scored a {score}/{questionKeys.length}!
          </strong>
        </em>
      </h1>

      <h3>
        Feel free to review a topic, explore the simulator at your own pace, or
        get some more practice.
      </h3>
      <br />
      <br />
      <div>
        <h4>Review your answers:</h4>
        <br />

        {questionKeys.map((key, index) => {
          const question = quizQuestionData[key];
          const questionNum = question.question_number;
          const isCorrect = questionCorrectness[questionNum];

          return (
            <div key={key}>
              <Link to={`/quiz/${key}?reviewMode=true`}>
                <button
                  className="hint-button btn"
                  style={{
                    margin: "0.5rem",
                    border: "2px solid #13275e",
                    color: "white",
                    backgroundColor: "#13275e",
                    transition: "all 0.2s ease",
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
                  <FontAwesomeIcon
                    icon={isCorrect ? faCheckCircle : faCircleXmark}
                    style={{
                      color: isCorrect ? "#4CAF50" : "#d9534f",
                      marginRight: "0.5rem",
                    }}
                  />
                  Question {index + 1}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <div
        onClick={handleStart}
        onMouseEnter={(e) => {
          const circle = e.currentTarget.querySelector(".try-again-circle");
          circle.style.backgroundColor = "#cdd6e0";
          circle.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const circle = e.currentTarget.querySelector(".try-again-circle");
          circle.style.backgroundColor = "#dbe3ee";
          circle.style.transform = "scale(1)";
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          fontStyle: "italic",
          fontSize: "1.15rem",
          color: "#999",
          marginTop: "2rem",
        }}
      >
        <div
          className="try-again-circle"
          style={{
            backgroundColor: "#dbe3ee",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            transition: "all 0.2s ease",
          }}
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            style={{ fontSize: "20px", color: "#13275e" }}
          />
        </div>
        <span>Try Again</span>
      </div>
    </div>
  );
}

export default QuizResults;
