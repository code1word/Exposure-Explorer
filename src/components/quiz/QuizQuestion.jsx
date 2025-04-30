//src/components/QuizQuestion.jsx

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
//import { quizQuestionData } from "../../data/quizQuestionData";
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
import { ProgressBar } from "react-bootstrap";


import axios from 'axios';

const NavButton = ({ label, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      marginTop: "1.5rem",
      fontSize: "1.5rem",
      ...style,
    }}
  >
    {label}
  </button>
);

function QuizQuestion() {
  const { type } = useParams();
  //const info = quizQuestionData[type];

  const [quizQuestionData, setQuizQuestionData] = useState({});
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-quiz-questions");
        setQuizQuestionData(res.data);
        //setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    fetchQuestions();
  }, []);
  const info = quizQuestionData[type];



  const navigate = useNavigate();

  const questionKeys = Object.keys(quizQuestionData);
  const currentIndex = questionKeys.indexOf(type);
  const nextKey = questionKeys[currentIndex + 1];
  const previousKey = questionKeys[currentIndex - 1];

  // State to track the selected answer for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Hints state
  const [hintsLeft, setHintsLeft] = useState(2);
  const [usedHints, setUsedHints] = useState(new Set());

  const [showHint, setShowHint] = useState(false);
  const [modalContent, setModalContent] = useState("");

  //User's quiz answer data
  const { selectedAnswers: selectedAnswersMC } = useContext(QuizContextMultipleChoice);
  const { selectedAnswers: selectedAnswersTable } = useContext(QuizContextTableFillBlanks);
  const { selectedOrder: selectedOrderImages } = useContext(QuizContextOrderImages);
  const { selectedImages: selectedImageMatch1 } = useContext(QuizContextMatchImage);
  const { selectedImages: selectedImageMatch2 } = useContext(QuizContextTwoSliders);

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
  
  const submitQuiz = async () => {
    const questionKeys = Object.keys(quizQuestionData);
    let score = 0;
  
    questionKeys.forEach((key) => {
      const question = quizQuestionData[key];
      const format = question.format;
      const correctAnswer = question.answer;
      let isCorrect = false;
  
      if (format === "multiple_choice") {
        isCorrect = selectedAnswersMC[key] === correctAnswer;
      } 
      else if (format === "table_fill_blanks") {
        const userAnswers = selectedAnswersTable[key] || {};
        const correctAnswers = question.correctAnswers;
        isCorrect = Object.entries(correctAnswers).every(
          ([cellKey, correctVal]) => userAnswers[cellKey] === correctVal
        );
      } 
      else if (format === "order_images") {
        isCorrect = JSON.stringify(selectedOrderImages[key]) === JSON.stringify(question.correctOrder);
      } 
      else if (format === "match_image") {
        isCorrect = selectedImageMatch1[key] === question.referenceImage;
      }
      else if (format === "two_sliders") {
        isCorrect = selectedImageMatch2[key] === question.referenceImage;
      }
  
      if (isCorrect) score++;
    });
  
    try {
      await axios.post("http://localhost:5000/submit-quiz", {
        score,
        total: questionKeys.length,
        answers: {
          ...selectedAnswersMC,
          ...selectedAnswersTable,
          ...selectedOrderImages,
          ...selectedImageMatch1,
          ...selectedImageMatch2
        }
      });
    } catch (error) {
      console.error("Error sending quiz data:", error);
    }
  
    navigate(`/learn/practice/results`);
  };

  const renderNavigationButtons = () => {
    const nextBtn = nextKey && (
      <NavButton type="button" class="btn btn-primary" label="Next →" onClick={handleNext} />
    );
    const prevBtn = previousKey && (
      <NavButton label="← Previous" onClick={handlePrevious} />
    );
    const finishBtn = (
      reviewMode ?
        <NavButton label="See Results" onClick={handleFinish} />
      :
        <NavButton label={"Finish"} onClick={submitQuiz} />
      
    );
  
    if (reviewMode) {
      return (
        <div>
          {prevBtn}
          {nextBtn}
          {finishBtn}
        </div>
      );
    }
  
    //return nextKey ? nextBtn : finishBtn;
    return (
      (nextKey) ?
        <div>
          {prevBtn}
          {nextBtn}
        </div>
      :
        <div>
          {prevBtn}
          {finishBtn}
        </div>
    );
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
      case "match_image":
        return <MatchImageQuestion info={info} questionKey={type} reviewMode={reviewMode} />;
      case "two_sliders":
        return <TwoSlidersQuestion info={info} questionKey={type} reviewMode={reviewMode} />;
      
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

  // In your component:
  //const [show, setShow] = useState(false);
  const handleShow = () => {
    if (hintsLeft > 0) {
      if (!usedHints.has(type)) {
        setHintsLeft(prev => prev - 1);
        setUsedHints(prev => new Set(prev).add(type));
      }
      setModalContent(info.hint ?? "No hint provided for this question.");
    } else {
      setModalContent("🚫 No more hints available.");
    }

    setShowHint(true);
  };

  const handleClose = () => setShowHint(false);


  //progress bar tracking
  const totalQuestions = questionKeys.length;
  const progress = reviewMode ? 100 : Math.round(((currentIndex + 1) / totalQuestions) * 100);


  return (
    <div style={{ padding: "2rem" }}>

      <Container className="py-2">
        <ProgressBar 
          now={progress} 
          variant="info" 
          style={{ height: '20px', fontSize: '1rem' }} 
        />
      </Container>

      <Container className="py-4" style={{ 
        height: "120px", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: "0 1 auto"}}>
          <Row style={{ 
          minHeight: "100px",
          overflowY: "auto" 
          }}>
          <Col md={1}></Col>
          <Col md={9}>
            <h2>Question {currentIndex+1}: {info.question}</h2>
          </Col>
          <Col md={1}>
            {!reviewMode && (
              <Button 
                variant="secondary" 
                size="md" 
                onClick={handleShow}>
                  
                Hint <br />
                ({hintsLeft} left)
              </Button>
            )}
            
          </Col>
          <Col md={1}></Col>

          <Modal show={showHint} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Hint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalContent}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>
        </Row>
          </div>
        
      </Container>

      <Container className="py-4">
        <div style={{ flex: "1 1 auto" }}>

          <Row>

          <Col md={1}></Col>

          <Col md={10}>
            {renderQuestionContent(info)}
          </Col>

          <Col md={1}></Col>
          </Row>

          <Row className="text-end pt-0">
          <Col md={1}></Col>

          <Col md={7}></Col>

          <Col md={3}>
            {renderNavigationButtons()}
          </Col>


          <Col md={1}></Col>

          </Row>
        </div>
        
        
      </Container>

      
      
      

    </div>

    
  );
}

export default QuizQuestion;