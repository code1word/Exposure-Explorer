// src/quizQuestions/MatchImageQuestion.jsx

import React from "react";

function MatchImageQuestion({info}){
    return (
        <div style={{ padding: "2rem" }}>
          <h2>Question {info.question_number}: {info.question}</h2>
    
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
        </div>
    
    );
}

export default MatchImageQuestion;

