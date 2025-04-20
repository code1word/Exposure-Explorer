// src/components/quiz/QuizResults

import React, { useState, useContext, useEffect, useMemo } from "react";
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
  const { selectedAnswers: selectedAnswersMC, resetQuiz: resetQuizMC } = useContext(QuizContextMultipleChoice);
  const { selectedOrder: selectedOrderImages, resetQuiz: resetQuizORD } = useContext(QuizContextOrderImages);
  
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const questionKeys = useMemo(() => Object.keys(quizQuestionData), []);
  const [questionCorrectness, setQuestionCorrectness] = useState({});


  useEffect(() => {
    let calculatedScore = 0;
    let newCorrectness = {};
  
    questionKeys.forEach((key) => {
      const question = quizQuestionData[key];
      const questionNum = question.question_number;
  
      let isCorrect = false;
  
      if (question.format === "multiple_choice") {
        isCorrect = selectedAnswersMC[key] === question.answer;
      }else if (question.format === "order_images") {
        const userOrder = selectedOrderImages[key];
        isCorrect =
          JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);
      }
  
      newCorrectness[questionNum] = isCorrect;
      if (isCorrect) calculatedScore++;
    });
  
    setQuestionCorrectness(newCorrectness);
    setScore(calculatedScore);
  }, [selectedAnswersMC, selectedOrderImages, questionKeys]);

  const handleStart = () => {
    resetQuizMC();
    resetQuizORD();
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
          const question = quizQuestionData[key];
          const questionNum = question.question_number;
          const isCorrect = questionCorrectness[questionNum];

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