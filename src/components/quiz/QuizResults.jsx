// src/components/quiz/QuizResults

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, ProgressBar } from "react-bootstrap";
import { quizQuestionData } from "../../data/quizQuestionData";
import MultipleChoiceQuestion from "../quiz/MultipleChoiceQuestion";
import TableFillBlanksQuestion from "../quiz/TableFillBlanksQuestion";
import OrderImagesQuestion from "../quiz/OrderImagesQuestion";

import { QuizContext as QuizContextMultipleChoice } from "../../context/QuizContextMultipleChoice";
import { QuizContext as QuizContextTableFillBlanks } from "../../context/QuizContextTable";
import { QuizContext as QuizContextOrderImages } from "../../context/QuizContextOrderImages";

function QuizResults() {
  const { selectedAnswers, resetQuiz } = useContext(QuizContextMultipleChoice);
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