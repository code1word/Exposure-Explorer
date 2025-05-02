import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
//import { quizQuestionData } from "../data/quizQuestionData";
import axios from "axios";

import { QuizContext as QuizContextMultipleChoice } from "../context/QuizContextMultipleChoice";
import { QuizContext as QuizContextTableFillBlanks } from "../context/QuizContextTable";
import { QuizContext as QuizContextOrderImages } from "../context/QuizContextOrderImages";
import { QuizContext as QuizContextMatchImage } from "../context/QuizContextMatchImage";
import { QuizContext as QuizContextTwoSliders } from "../context/QuizContextTwoSliders";

function PracticeMode() {
  const navigate = useNavigate();
  const [quizQuestionData, setQuizQuestionData] = useState({});
  //const [loading, setLoading] = useState(true);

  const { resetQuiz: resetQuizMC } = useContext(QuizContextMultipleChoice);
  const { resetQuiz: resetQuizTAB } = useContext(QuizContextTableFillBlanks);
  const { resetQuiz: resetQuizORD } = useContext(QuizContextOrderImages);
  const { resetQuiz: resetQuizMATCH1 } = useContext(QuizContextMatchImage);
  const { resetQuiz: resetQuizMATCH2 } = useContext(QuizContextTwoSliders);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-quiz-questions");
        setQuizQuestionData(res.data);
        //setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleStart = () => {
    resetQuizMC();
    resetQuizTAB();
    resetQuizORD();
    resetQuizMATCH1();
    resetQuizMATCH2();
    const firstQuestionKey = Object.keys(quizQuestionData)[0];
    //console.log("firstQuestionKey", firstQuestionKey);
    navigate(`/learn/quiz/${firstQuestionKey}`);
  };

  return (
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ABE2FB, #ffffff)",
        minHeight: "90vh",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          color: "#13275e",
        }}
      >
        <em>Ready to test your knowledge of the exposure triangle?</em>
      </h2>
      <h3
        style={{
          fontSize: "1.2rem",
          marginTop: "1rem",
          color: "#35476b",
          fontStyle: "italic",
        }}
      >
        This short quiz will challenge what you’ve learned — from recognizing
        settings to applying them in real scenarios. Click Start to begin!
      </h3>
      <br></br>
      <Button size="lg" className="quiz-start-button" onClick={handleStart}>
        Start Quiz
      </Button>
    </Container>
  );
}

export default PracticeMode;
