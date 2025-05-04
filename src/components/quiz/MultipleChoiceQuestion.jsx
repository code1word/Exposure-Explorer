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

        <Col md={12}>
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

          <div><br/></div>

          {reviewMode && (
            <div style={{ marginTop: "1rem" }}>
              {/* Always display the correct answer */}
              {selectedAnswer && selectedAnswer !== info.answer && (
                <p><strong>❌ Incorrect.</strong></p>
              )}
              {!selectedAnswer && (
                <p><strong>❌ Incorrect.</strong></p>
              )}
              {selectedAnswer === info.answer && (
                <p>✅ You selected the correct answer!</p>
              )}
              <p>
                <strong>Correct Answer:</strong> {info.answer}
              </p>
            </div>
          )}

        </Col>

        
        
      </Row>
      
    </div>
  );
}

export default MultipleChoiceQuestion;

