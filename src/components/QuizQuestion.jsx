//src/components/QuizQuestion.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { quizQuestionData } from "../data/quizQuestionData";
import MultipleChoiceQuestion from "./quiz/MultipleChoiceQuestion";
import TableFillBlanksQuestion from "./quiz/TableFillBlanksQuestion";
import OrderImagesQuestion from "./quiz/OrderImagesQuestion";

function QuizQuestion() {
  const { type } = useParams();
  const info = quizQuestionData[type];
  const navigate = useNavigate();

  const questionKeys = Object.keys(quizQuestionData);
  const currentIndex = questionKeys.indexOf(type);
  const nextKey = questionKeys[currentIndex + 1];
  const previousKey = questionKeys[currentIndex - 1];

  // State to track the selected answer for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Effect to reset the selected answer when the question changes
  useEffect(() => {
    setSelectedAnswer(null); // Reset the answer when the question changes
  }, [type]);

  const handleNext = () => {
    if (nextKey) {
      navigate(`/learn/practice/${nextKey}${reviewMode ? "?reviewMode=true" : ""}`);
    }
  };
  
  const handlePrevious = () => {
    if (previousKey) {
      navigate(`/learn/practice/${previousKey}${reviewMode ? "?reviewMode=true" : ""}`);
    }
  };
  
  const handleFinish = () => {
    navigate(`/learn/practice/results`);
  };

  const renderNavigationButtons = () => {
    if (previousKey && nextKey) {
      return (
        <div>
          <button onClick={handlePrevious} style={{ marginTop: "1.5rem" }}>
            ← Previous
          </button>
          <button onClick={handleNext} style={{ marginTop: "1.5rem" }}>
            Next →
          </button>
        </div>
      );
    } else if (nextKey) {
      return (
        <div>
          <button onClick={handleNext} style={{ marginTop: "1.5rem" }}>
            Next →
          </button>
        </div>
      );
    } else if (previousKey) {
      return (
        <div>
          <button onClick={handlePrevious} style={{ marginTop: "1.5rem" }}>
            ← Previous
          </button>
          <button onClick={handleFinish} style={{ marginTop: "1.5rem" }}>
            Finish →
          </button>
        </div>
      );
    }
  
    return null;
  };

  const [searchParams] = useSearchParams();
  const reviewMode = searchParams.get("reviewMode") === "true";
  const renderQuestionContent = (info) => {
    switch (info.format) {
      case "multiple_choice":
        return <MultipleChoiceQuestion info={info} questionKey={type} reviewMode={reviewMode}/>;
      case "table_fill_blanks":
        return <TableFillBlanksQuestion info={info} questionKey={type} reviewMode={reviewMode} />;
      case "order_images":
        return <OrderImagesQuestion info={info} questionKey={type} reviewMode={reviewMode} />;
        default:
        return <p>Unsupported question format.</p>;
    }
  };

  if (!info) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Not Found</h2>
        <p>This quiz question doesn't exist.</p>
        <Link to="/practice">
          <button>← Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Question {currentIndex+1}: {info.question}</h2>

      {renderQuestionContent(info)}
      
      {renderNavigationButtons()}


      
    </div>
  );
}

export default QuizQuestion;