// src/quizQuestions/MultipleChoice.jsx

import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import { QuizContext } from "../../context/QuizContextMultipleChoice";


function MultipleChoiceQuestion({ info, questionKey, reviewMode = false }) {
  const { selectedAnswers, recordAnswer } = useContext(QuizContext);
  const selectedAnswer = selectedAnswers[questionKey];

  const getStatusEmoji = (option) => {
    if (!reviewMode) return null;
    if (option === info.answer) return "✅";
    if (option === selectedAnswer) return "❌";
    return null;
  };

  const handleSelect = (option) => {
    recordAnswer(questionKey, option);
  };

  return (
    <div>
      <Row>
        <Col md={1}></Col>

        <Col md={6}>
          {info.options.map((option, i) => (
            <div key={i}>
              <label style={{
                fontSize: "1.5rem"
              }}>
                <input
                  type="radio"
                  name={`quiz-${info.question_number}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleSelect(option)}
                  disabled={reviewMode} // Prevent changes in review
                  readOnly
                />
                {option} {getStatusEmoji(option)}
              </label>
            </div>
          ))}

          {reviewMode && selectedAnswer && (
            <p style={{ marginTop: "1rem" }}>
              {selectedAnswer === info.answer
                ? "✅ Correct!"
                : `❌ Incorrect. Correct answer: ${info.answer}`}
            </p>
          )}
        </Col>

        
        
      </Row>
      
    </div>
  );
}

export default MultipleChoiceQuestion;

