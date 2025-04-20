// src/components/quiz/QuizResults

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, ProgressBar } from "react-bootstrap";
import { quizQuestionData } from "../../data/quizQuestionData";
import MultipleChoiceQuestion from "../quiz/MultipleChoiceQuestion";
import MatchImageQuestion from "../quiz/MatchImageQuestion";

import { QuizContext } from "../../context/QuizContext";


function QuizResults_old() {

  const { score, selectedAnswers, resetQuiz } = useContext(QuizContext);
  {/*const [score, setScore] = useState(0);*/}
  const navigate = useNavigate();
  const questionKeys = Object.keys(quizQuestionData);

  const handleStart = () => {
    resetQuiz();
    const firstQuestionKey = Object.keys(quizQuestionData)[0];
    navigate(`/learn/practice/${firstQuestionKey}`);
  };

  {/*useEffect(() => {
    let calculatedScore = 0;
    Object.keys(selectedAnswers).forEach(key => {
      const selected = selectedAnswers[key];
      const correct = quizQuestionData[key].answer;
      if (selected === correct) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
  }, [selectedAnswers]);*/}


  return (
    <div style={{ padding: "2rem", textAlign: "center", marginLeft: "2rem", marginRight: "2rem" }}>
      <h2>
        <em>You scored a {score}/{questionKeys.length}!</em>
      </h2>
      <p>Feel free to review a topic, explore the simulator at your own pace, or get some more practice.</p>
      
      <button
        variant="primary"
        size="lg"
        style={{ marginTop: "2rem" }}
        onClick={handleStart}
      >
        Try Again
      </button>

    </div>
  );
}

function QuizResults() {
  const { selectedAnswers, resetQuiz } = useContext(QuizContext);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const questionKeys = Object.keys(quizQuestionData);

  useEffect(() => {
    console.log("selectedAnswers", selectedAnswers); // See what's inside

    let calculatedScore = 0;
    questionKeys.forEach(key => {
      const selected = selectedAnswers[key];
      console.log("selectedAnswer", selected)
      const correct = quizQuestionData[key].answer;
      console.log("quizQuestionData answer", correct)
      if (selected === correct) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    console.log("calculated score", calculatedScore);
    console.log("score", score);
  }, [selectedAnswers, questionKeys]);

  const handleStart = () => {
    resetQuiz();
    navigate(`/learn/practice/${questionKeys[0]}`);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>
        <em>You scored a {score}/{questionKeys.length}!</em>
      </h2>
      
      <h3>
        Feel free to review a topic, explore the simulator at your own pace, or get some more practice.
      </h3>
      <br />
      <br />
      <div>
        <h4>Review your answers:</h4>
        {questionKeys.map((key, index) => {
          const isCorrect = selectedAnswers[key] === quizQuestionData[key].answer;
          return (
            <div key={key}>
              <Link to={`/learn/practice/${key}?reviewMode=true`}>
                <button style={{ margin: "0.5rem" }}>
                  {isCorrect ? "✅" : "❌"} Question {index + 1}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <button onClick={handleStart} style={{ marginTop: "2rem" }}>
        Try Again
      </button>
    </div>
  );
}



export default QuizResults;