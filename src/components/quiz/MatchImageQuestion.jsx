// src/components/quiz/MatchImageQuestion.jsx
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuizPhotoSlider from "./QuizPhotoSlider"; 
import { QuizContext } from "../../context/QuizContextMatchImage";

//manual labor
import orderPortrait00 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait10 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait20 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait30 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait40 from "../../data/quiz_images/orderActionShot.png"; // reference image
import orderPortrait50 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait60 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait70 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait80 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait90 from "../../data/quiz_images/orderPortrait.png";
import orderPortrait100 from "../../data/quiz_images/orderPortrait.png";

const portraitImageMap = {
  0: orderPortrait00,
  1: orderPortrait10,
  2: orderPortrait20,
  3: orderPortrait30,
  4: orderPortrait40,
  5: orderPortrait50,
  6: orderPortrait60,
  7: orderPortrait70,
  8: orderPortrait80,
  9: orderPortrait90,
  10: orderPortrait100,
};

function MatchImageQuestion({ info, questionKey, reviewMode = false }) {
  const { sliderValues, recordSliderValue, selectedImages, recordSelectedImage } = useContext(QuizContext);

  const initialValue = sliderValues[questionKey] ?? 0.6;
  const [sliderValue, setSliderValue] = useState(initialValue);
  const imageIndex = Math.round(Math.max(0, Math.min(1, sliderValue)) * 10);
  const currentImage = portraitImageMap[imageIndex];
  //console.log("sliderValue", sliderValue);
  //console.log("currentImage", currentImage);



  const handleSliderChange = (newValue) => {
    setSliderValue(newValue); // Always update local UI
  
    if (!reviewMode) {
      recordSliderValue(questionKey, newValue);
      const clamped = Math.max(0, Math.min(1, newValue));
      const newImage = portraitImageMap[Math.round(clamped * 10)];
      recordSelectedImage(questionKey, newImage);
    }
  };

  const getStatus = () => {
    if (!reviewMode) return null;
  
    const isCorrect = currentImage === info.referenceImage;
  
    if (isCorrect) {
      return (
        <div style={{ backgroundColor: "#d0f0c0", padding: "0.5rem", borderRadius: "0.5rem" }}>
          ✅ Correct!<br />
          Image Matched.
        </div>
      );
    } else {
      // Find the correct slider value that maps to the reference image
      const correctEntry = Object.entries(portraitImageMap).find(
        ([_, image]) => image === info.referenceImage
      );
  
      let correctValue = null;
      if (correctEntry) {
        const correctIndex = Number(correctEntry[0]);
        correctValue = (correctIndex / 10).toFixed(2); // convert index back to 0.0–1.0 and format
      }
  
      return (
        <div style={{ backgroundColor: "#f8d7da", padding: "0.5rem", borderRadius: "0.5rem" }}>
          ❌ Incorrect Image<br />
          The correct setting is: f/{correctValue}
        </div>
      );
    }
  };

  return (
    <Container className="">
      <Row className="d-flex align-items-center">

        <Row className="text-center pt-3">
          {/* Setting Description and Reference image title*/}
          <Col md={6} className="text-muted fst-italic" >
            Use the slider to see how the aperture size affects exposure
          </Col>

          <Col className="text-muted fst-italic" md={6} >
            Reference Image
          </Col>

        </Row>
        
        <Row className="align-items-start">
          {/* Slider section */}
          <Col md={6}>
            <QuizPhotoSlider
              title="Aperture"
              description=""
              imageSrcFunction={(val) => {
                const clamped = Math.max(0, Math.min(1, val));
                const imageIndex = Math.round(clamped * 10);
                return portraitImageMap[imageIndex];
              }}
              min={0}
              max={1}
              step={0.1}
              initialValue={sliderValue}
              onChange={handleSliderChange}
              unitPrefix="f/"
              leftLabel="Small aperture"
              leftDescriptions={[]}
              rightLabel="Large aperture"
              rightDescriptions={[]}
            />
          </Col>

          {/* Reference image section */}
          <Col md={6}>
            <Container className="text-center py-2">
              <img
                src={info.referenceImage}
                alt="Reference"
                style={{ 
                  maxWidth: "55%", 
                  height: "auto", 
                  padding: "none",
                  }}
              />
              {reviewMode && (
                <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.1rem" }}>
                  {getStatus()}
                </div>
              )}
            </Container>
          </Col>
        </Row>

        

      </Row>
    </Container>
  );
}

export default MatchImageQuestion;




