// src/quizQuestions/MultipleChoice.jsx

import React, { useState, useContext } from "react";
import { QuizContext } from "../../context/QuizContext";

function MultipleChoiceQuestion_old({info}){
    return (
      <div>
        {info.options.map((option, i) => (
          <div key={i}>
            <label>
              <input type="radio" name="quiz" />
              {option}
            </label>
          </div>
        ))}
      </div>
    
    );
}

function MultipleChoiceQuestion({ info }) {
  const [answered, setAnswered] = useState(false);
  const { selectedAnswers, handleSelectAnswer, recordAnswer } = useContext(QuizContext);

  // Get the current selected answer for this question from the context
  const selectedAnswer = selectedAnswers[info.question_number];

  const handleSelect = (option) => {
    {/*setSelected(option);
    if (!answered) {
      const isCorrect = option === info.answer;
      recordAnswer(info.question_number, isCorrect); // track the result
      setAnswered(true);
    }*/}

    
    handleSelectAnswer(info.question_number, option);// Save the selected answer in the global context
    const isCorrect = option === info.answer; // Check if the answer is correct
    recordAnswer(info.question_number, option, isCorrect); // Record the answer (correct/incorrect)
    setAnswered(true); // Mark the question as answered
  };

  return (
    <div>
      {info.options.map((option, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              name={`quiz-${info.question_number}`}
              value={option}
              checked={selectedAnswer === option} // Check if this option is selected
              onChange={() => handleSelect(option)} // Handle selection
            />
            {option}
          </label>
        </div>
      ))}
      {selectedAnswer && (
        <p style={{ marginTop: "1rem" }}>
          {selectedAnswer === info.answer
            ? "✅ Correct!"
            : `❌ Incorrect. Correct answer: ${info.answer}`}
        </p>
      )}
    </div>
  );
}

export default MultipleChoiceQuestion;

