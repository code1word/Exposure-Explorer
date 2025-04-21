//src/components/QuizQuestion.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { quizQuestionData } from "../data/quizQuestionData";
import MultipleChoiceQuestion from "./quiz/MultipleChoiceQuestion";
import TableFillBlanksQuestion from "./quiz/TableFillBlanksQuestion";
import OrderImagesQuestion from "./quiz/OrderImagesQuestion";
import MatchImageQuestion from "./quiz/MatchImageQuestion";

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

  // Hints state
  const [hintsLeft, setHintsLeft] = useState(2);
  const [usedHints, setUsedHints] = useState(new Set());

  const [showHint, setShowHint] = useState(false);
  const [modalContent, setModalContent] = useState("");


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

  const renderNavigationButtons = () => {

    if (!reviewMode){
      if (nextKey){
        return (
          <div>
            <button onClick={handleNext} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
              Next →
            </button>
          </div>
        );
      } else if (previousKey){
        return (
          <button onClick={handleFinish} style={{ 
            marginTop: "1.5rem",
            fontSize: "1.5rem" }}>
            See Results
          </button>
        )
      }
    }
    else{
      if (previousKey && nextKey) {
      
        return (
          <div>
            <div>
              <button onClick={handlePrevious} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                ← Previous
              </button>
              <button onClick={handleNext} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                Next →
              </button>
            </div>
            
            <div>
              <button onClick={handleFinish} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                See Results
              </button>
            </div>
          </div>
        );
      } else if (nextKey) {
        return (
          <div>
            <div>
              <button onClick={handleNext} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                Next →
              </button>
            </div>
            <div>
              <button onClick={handleFinish} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                  See Results
              </button>
            </div>
            
          </div>
        );
      } else if (previousKey) {
        return (
          <div>
            <div>
              <button onClick={handlePrevious} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                ← Previous
              </button>
            </div>
            
            <div>
              <button onClick={handleFinish} style={{ 
              marginTop: "1.5rem",
              fontSize: "1.5rem" }}>
                See Results
              </button>
            </div>
            
          </div>
        );
      }
    }
  
    return null;
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
  const [show, setShow] = useState(false);
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


  return (
    <div style={{ padding: "2rem" }}>
      <Container className="py-4">
        <Row style={{ 
          height: "75px", 
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
      </Container>

      <Container className="py-4">
        <Row style={{ 
          height: "400px", 
          overflowY: "auto" 
          }}>

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
        
      </Container>

      
      
      

    </div>

    
  );
}

export default QuizQuestion;