// src/components/QuizQuestion.jsx

import React, { useState, useEffect, useContext } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TableFillBlanksQuestion from "./TableFillBlanksQuestion";
import OrderImagesQuestion from "./OrderImagesQuestion";
import MatchImageQuestion from "./MatchImageQuestion";
import TwoSlidersQuestion from "./TwoSlidersQuestion";

import { QuizContext as QuizContextMultipleChoice } from "../../context/QuizContextMultipleChoice";
import { QuizContext as QuizContextTableFillBlanks } from "../../context/QuizContextTable";
import { QuizContext as QuizContextOrderImages } from "../../context/QuizContextOrderImages";
import { QuizContext as QuizContextMatchImage } from "../../context/QuizContextMatchImage";
import { QuizContext as QuizContextTwoSliders } from "../../context/QuizContextTwoSliders";

import axios from "axios";

function QuizQuestion() {
  const { type } = useParams();
  const [quizQuestionData, setQuizQuestionData] = useState({});
  const [searchParams] = useSearchParams();
  const reviewMode = searchParams.get("reviewMode") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-quiz-questions");
        setQuizQuestionData(res.data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const info = quizQuestionData[type];
  const questionKeys = Object.keys(quizQuestionData);
  const currentIndex = questionKeys.indexOf(type);
  const nextKey = questionKeys[currentIndex + 1];
  const previousKey = questionKeys[currentIndex - 1];

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hintsLeft, setHintsLeft] = useState(2);
  //const [usedHints, setUsedHints] = useState(new Set());
  const usedHintsRef = React.useRef(new Set());

  const [showHint, setShowHint] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const { selectedAnswers: selectedAnswersMC } = useContext(
    QuizContextMultipleChoice
  );
  const { selectedAnswers: selectedAnswersTable } = useContext(
    QuizContextTableFillBlanks
  );
  const { selectedOrder: selectedOrderImages } = useContext(
    QuizContextOrderImages
  );
  const { selectedImages: selectedImageMatch1 } = useContext(
    QuizContextMatchImage
  );
  const { selectedImages: selectedImageMatch2 } = useContext(
    QuizContextTwoSliders
  );

  useEffect(() => {
    setSelectedAnswer(null);
    setShowHint(false);
  }, [type]);

  const progress = reviewMode
    ? 100
    : Math.round(((currentIndex + 1) / questionKeys.length) * 100);

  const handleShowHint = () => {
    const alreadyUsed = usedHintsRef.current.has(type);
  
    if (!alreadyUsed && hintsLeft === 0) {
      setModalContent("🚫 No more hints available.");
      setShowHint(true);
      return;
    }
  
    if (!alreadyUsed && hintsLeft > 0) {
      setHintsLeft((prev) => prev - 1);
      usedHintsRef.current.add(type);
    }
  
    setModalContent(info.hint ?? "No hint provided for this question.");
    setShowHint(true);
  };

  const handleCloseHint = () => setShowHint(false);

  const handleNext = () => {
    if (nextKey) {
      navigate(`/quiz/${nextKey}${reviewMode ? "?reviewMode=true" : ""}`);
    }
  };

  const handlePrevious = () => {
    if (previousKey) {
      navigate(
        `/quiz/${previousKey}${reviewMode ? "?reviewMode=true" : ""}`
      );
    }
  };

  const handleFinish = () => {
    navigate(`/quiz/results`);
  };

  const submitQuiz = async () => {
    let calculatedScore = 0;
    const sanitizedResults = {};
    const questionKeys = Object.keys(quizQuestionData);
  
    questionKeys.forEach((key) => {
      const question = quizQuestionData[key];
      const format = question.format;
      const questionNum = question.question_number;
  
      let isCorrect = false;
      let userResponse = null;
  
      if (format === "multiple_choice") {
        userResponse = selectedAnswersMC[key] ?? "LEFT_BLANK";
        isCorrect = userResponse === question.answer;
      }
      else if (format === "table_fill_blanks") {
        const userAnswers = selectedAnswersTable[key] || {};
        const correctAnswers = question.correctAnswers;
        const allMatch = Object.entries(correctAnswers).every(
          ([cellKey, correctVal]) => userAnswers[cellKey] === correctVal
        );
        isCorrect = allMatch;
        userResponse = Object.keys(correctAnswers).reduce((acc, cellKey) => {
          acc[cellKey] = userAnswers[cellKey] ?? "LEFT_BLANK";
          return acc;
        }, {});
      }
      else if (format === "order_images") {
        const userOrder = selectedOrderImages[key] ?? "LEFT_BLANK";
        isCorrect = JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);
        userResponse = userOrder;
      }
      else if (format === "match_image") {
        userResponse = selectedImageMatch1[key] ?? "LEFT_BLANK";
        isCorrect = userResponse === question.referenceImage;
      }
      else if (format === "two_sliders") {
        userResponse = selectedImageMatch2[key] ?? "LEFT_BLANK";
        isCorrect = userResponse === question.referenceImage;
      }
  
      if (isCorrect) calculatedScore++;
  
      sanitizedResults[key] = {
        question_number: questionNum,
        format,
        response: userResponse,
        correct: isCorrect,
      };
    });

    try {
      await axios.post("http://localhost:3000/submit-quiz", {
        score: calculatedScore,
        total: questionKeys.length,
        answers: sanitizedResults,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }

    navigate(`/quiz/results`);
  };

  const renderNavigationButtons = () => {
    const makeButton = (label, icon, onClick, reverse = false) => (
      <div
        onClick={onClick}
        onMouseEnter={(e) => {
          const circle = e.currentTarget.querySelector(".circle");
          circle.style.backgroundColor = "#cdd6e0";
          circle.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const circle = e.currentTarget.querySelector(".circle");
          circle.style.backgroundColor = "#dbe3ee";
          circle.style.transform = "scale(1)";
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          fontStyle: "italic",
          fontSize: "1.15rem",
          color: "#999",
        }}
      >
        {reverse ? (
          <>
            <span>{label}</span>
            <div
              className="circle"
              style={{
                backgroundColor: "#dbe3ee",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                style={{ fontSize: "20px", color: "#13275e" }}
              />
            </div>
          </>
        ) : (
          <>
            <div
              className="circle"
              style={{
                backgroundColor: "#dbe3ee",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                style={{ fontSize: "20px", color: "#13275e" }}
              />
            </div>
            <span>{label}</span>
          </>
        )}
      </div>
    );
    

    return (
      <div>
        <Row className="align-items-center mt-4">
          <Col xs="auto">
            {previousKey && makeButton("Back", faArrowLeft, handlePrevious)}
          </Col>
          <Col className="text-end">
          {nextKey && makeButton(
            "Next", 
            faArrowRight, 
            handleNext, 
            true)}
          {!nextKey && reviewMode && makeButton(
            "See Results", 
            faArrowRight, 
            handleFinish, 
            true)}
          {!nextKey && !reviewMode && makeButton(
            "Finish", 
            faArrowRight, 
            submitQuiz, 
            true)}
          </Col>
        </Row>
        <br/>
        <Row>
          <Col className="text-end">
            {nextKey && reviewMode && makeButton(
              "See Results", 
              faArrowRight, 
              handleFinish, 
              true)}
          </Col>
        </Row>
      </div>
      
      
    );
  };

  const renderQuestionContent = (info) => {
    switch (info.format) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            info={info}
            questionKey={type}
            reviewMode={reviewMode}
          />
        );
      case "table_fill_blanks":
        return (
          <TableFillBlanksQuestion
            info={info}
            questionKey={type}
            reviewMode={reviewMode}
          />
        );
      case "order_images":
        return (
          <OrderImagesQuestion
            info={info}
            questionKey={type}
            reviewMode={reviewMode}
          />
        );
      case "match_image":
        return (
          <MatchImageQuestion
            info={info}
            questionKey={type}
            reviewMode={reviewMode}
          />
        );
      case "two_sliders":
        return (
          <TwoSlidersQuestion
            info={info}
            questionKey={type}
            reviewMode={reviewMode}
          />
        );
      default:
        return <p>Unsupported question format.</p>;
    }
  };

  if (!info) {
    return (
      <Container style={{ padding: "2rem" }}>
        <h2>Not Found.</h2>
        <h4>This quiz question doesn't exist.</h4>
        <br/>
        <Link to="/quiz">
          <button className="hint-button" style={{
            height: "50px",
            width: "100px",
            borderRadius: "999px",
          }}>← Back</button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ fontSize: "1.25rem" }}>
      <ProgressBar
        className="mb-3"
        style={{
          height: "10px",
          borderRadius: "999px",
          backgroundColor: "transparent",
          overflow: "hidden",
          border: "2px solid #abe2fb"
        }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: "#13275e",
            borderRadius: "999px",
            height: "100%",
            transition: "width 0.4s ease",
            boxShadow: "none",
          }}
        />
      </ProgressBar>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontWeight: "700", color: "#13275e" }}>
          Question {currentIndex + 1}: {info.question}
        </h2>
        {!reviewMode && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                id="hint-tooltip"
                style={{ fontSize: "0.9rem", fontStyle: "italic" }}
              >
                Reveal a hint
              </Tooltip>
            }
          >
            <div
              onClick={handleShowHint}
              onMouseEnter={(e) => {
                const circle = e.currentTarget.querySelector(".circle");
                circle.style.backgroundColor = "#cdd6e0";
                circle.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const circle = e.currentTarget.querySelector(".circle");
                circle.style.backgroundColor = "#dbe3ee";
                circle.style.transform = "scale(1)";
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#999",
              }}
            >
              <div
                className="circle"
                style={{
                  backgroundColor: "#dbe3ee",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <FontAwesomeIcon
                  icon={faLightbulb}
                  style={{ fontSize: "20px", color: "#13275e" }}
                />
              </div>
              <span style={{whiteSpace: "nowrap"}}>
                {usedHintsRef.current.has(type) ? `See hint` : `Hint (${hintsLeft})`}
              </span>
            </div>
          </OverlayTrigger>
        )}
      </div>

      {renderQuestionContent(info)}

      <div className="mt-4">{renderNavigationButtons()}</div>

      <Modal show={showHint} onHide={handleCloseHint}>
        <Modal.Header closeButton style={{ backgroundColor: "#f5f8fa" }}>
          <Modal.Title style={{ fontWeight: "700", color: "#13275e" }}>
            Hint
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHint}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default QuizQuestion;
