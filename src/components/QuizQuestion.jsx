//src/components/QuizQuestion.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { quizQuestionData } from "../data/quizQuestionData";
import MultipleChoiceQuestion from "./quiz/MultipleChoiceQuestion";

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
      navigate(`/learn/practice/${nextKey}`);
    }
  };

  const handlePrevious = () => {
    if (previousKey){
      navigate(`/learn/practice/${previousKey}`);
    }
  };

  const handleFinish = () => {
    navigate(`/learn/practice/results`);
  };

  const renderQuestionContent = (info) => {
    switch (info.format) {
      case "multiple_choice":
        return <MultipleChoiceQuestion info={info} />;
      case "match-image":
        return <MatchImageQuestion info={info} />;
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
      
      {previousKey && nextKey && (
        <div>
          <button onClick={handlePrevious} style={{ marginTop: "1.5rem" }}>
            ← Previous
          </button>
          <button onClick={handleNext} style={{ marginTop: "1.5rem" }}>
            Next →
          </button>
        </div>
      )}
      {nextKey && (
        <div>
          <button onClick={handleNext} style={{ marginTop: "1.5rem" }}>
            Next →
          </button>
        </div>
      )}
      { previousKey && (
        <div>
          <button onClick={handlePrevious} style={{ marginTop: "1.5rem" }}>
            ← Previous
          </button>
          <button onClick={handleFinish} style={{ marginTop: "1.5rem" }}>
              Finish →
            </button>
        </div>
      )}


      <br />
      <Link to="/practice">
        <button style={{ marginTop: "2rem" }}>← Back to Start</button>
      </Link>
    </div>
  );
}

export default QuizQuestion;