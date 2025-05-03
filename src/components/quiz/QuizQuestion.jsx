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
  const [usedHints, setUsedHints] = useState(new Set());
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
    if (hintsLeft > 0 && !usedHints.has(type)) {
      setHintsLeft((prev) => prev - 1);
      setUsedHints((prev) => new Set(prev).add(type));
      setModalContent(info?.hint ?? "No hint provided.");
    } else {
      setModalContent("🚫 No more hints available.");
    }
    setShowHint(true);
  };

  const handleCloseHint = () => setShowHint(false);

  const handleNext = () => {
    if (nextKey) {
      navigate(`/learn/quiz/${nextKey}${reviewMode ? "?reviewMode=true" : ""}`);
    }
  };

  const handlePrevious = () => {
    if (previousKey) {
      navigate(
        `/learn/quiz/${previousKey}${reviewMode ? "?reviewMode=true" : ""}`
      );
    }
  };

  const handleFinish = () => {
    navigate(`/learn/quiz/results`);
  };

  const submitQuiz = async () => {
    let score = 0;
    questionKeys.forEach((key) => {
      const question = quizQuestionData[key];
      const format = question.format;
      const correctAnswer = question.answer;
      let isCorrect = false;

      if (format === "multiple_choice") {
        isCorrect = selectedAnswersMC[key] === correctAnswer;
      } else if (format === "table_fill_blanks") {
        const userAnswers = selectedAnswersTable[key] || {};
        const correctAnswers = question.correctAnswers;
        isCorrect = Object.entries(correctAnswers).every(
          ([cellKey, correctVal]) => userAnswers[cellKey] === correctVal
        );
      } else if (format === "order_images") {
        isCorrect =
          JSON.stringify(selectedOrderImages[key]) ===
          JSON.stringify(question.correctOrder);
      } else if (format === "match_image") {
        isCorrect = selectedImageMatch1[key] === question.referenceImage;
      } else if (format === "two_sliders") {
        isCorrect = selectedImageMatch2[key] === question.referenceImage;
      }

      if (isCorrect) score++;
    });

    try {
      await axios.post("http://localhost:3000/submit-quiz", {
        score,
        total: questionKeys.length,
        answers: {
          ...selectedAnswersMC,
          ...selectedAnswersTable,
          ...selectedOrderImages,
          ...selectedImageMatch1,
          ...selectedImageMatch2,
        },
      });
    } catch (error) {
      console.error("Error sending quiz data:", error);
    }

    navigate(`/learn/quiz/results`);
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
      <Row className="align-items-center mt-4">
        <Col xs="auto">
          {previousKey && makeButton("Back", faArrowLeft, handlePrevious)}
        </Col>
        <Col className="text-end">
          {nextKey
            ? makeButton("Next", faArrowRight, handleNext, true)
            : makeButton(
                "Finish",
                faArrowRight,
                reviewMode ? handleFinish : submitQuiz,
                true
              )}
        </Col>
      </Row>
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
        <h2>Not Found</h2>
        <p>This quiz question doesn't exist.</p>
        <Link to="/quiz">
          <button>← Back</button>
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
              <span>Hint ({hintsLeft})</span>
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
