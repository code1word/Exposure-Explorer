// src/quizQuestions/MultipleChoice.jsx

import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { QuizContext } from "../../context/QuizContextMultipleChoice";

function MultipleChoiceQuestion({ info, questionKey, reviewMode = false }) {
  const { selectedAnswers, recordAnswer } = useContext(QuizContext);
  const selectedAnswer = selectedAnswers[questionKey];

  const getStatusIcon = (option) => {
    if (!reviewMode) return null;

    if (option === info.answer) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "#4CAF50", marginRight: "0.5rem" }} // Bootstrap green
        />
      );
    }

    if (option === selectedAnswer) {
      return (
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{ color: "#d9534f", marginRight: "0.5rem" }} // Bootstrap red
        />
      );
    }

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
              <label
                className="navy"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                <input
                  type="radio"
                  name={`quiz-${info.question_number}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleSelect(option)}
                  disabled={reviewMode} // Prevent changes in review
                  readOnly
                />
                {option} {getStatusIcon(option)}
              </label>
            </div>
          ))}

          <div>
            <br />
          </div>

          {reviewMode && (
            <div className="navy" style={{ marginTop: "1rem" }}>
              {/* Always display the correct answer */}
              {selectedAnswer && selectedAnswer !== info.answer && (
                <p>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "#d9534f", marginRight: "0.5rem" }}
                  />
                  <strong>Incorrect.</strong>
                </p>
              )}
              {!selectedAnswer && (
                <p>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "#d9534f", marginRight: "0.5rem" }}
                  />
                  <strong>Incorrect.</strong>
                </p>
              )}
              {selectedAnswer === info.answer && (
                <p>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#4CAF50", marginRight: "0.5rem" }}
                  />
                  You selected the correct answer!
                </p>
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
