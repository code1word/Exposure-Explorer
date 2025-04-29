// src/components/quiz/MatchImageQuestion.jsx
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuizPhotoSlider from "./QuizPhotoSlider"; 
import { QuizContext } from "../../context/QuizContextMatchImage";

//manual labor
import cat_f14 from "../../data/quiz_images/q5_images/cat_f1.4.png";
import cat_f20 from "../../data/quiz_images/q5_images/cat_f2.0.png";
import cat_f28 from "../../data/quiz_images/q5_images/cat_f2.8.png";
import cat_f40 from "../../data/quiz_images/q5_images/cat_f4.0.png";
import cat_f56 from "../../data/quiz_images/q5_images/cat_f5.6.png"; // reference image
import cat_f80 from "../../data/quiz_images/q5_images/cat_f8.0.png";
import cat_f90 from "../../data/quiz_images/q5_images/cat_f9.0.png";
import cat_f110 from "../../data/quiz_images/q5_images/cat_f11.0.png";
import cat_f140 from "../../data/quiz_images/q5_images/cat_f14.0.png";
import cat_f160 from "../../data/quiz_images/q5_images/cat_f16.0.png";


const portraitImageMap = {
  0: cat_f14,
  1: cat_f20,
  2: cat_f28,
  3: cat_f40,
  4: cat_f56,
  5: cat_f80,
  6: cat_f90,
  7: cat_f110,
  8: cat_f140,
  9: cat_f160,
};

const sliderValueMap = {
  0.0: 1.4,
  0.1: 2.0,
  0.2: 2.8,
  0.3: 4.0,
  0.4: 5.6,
  0.5: 8.0,
  0.6: 9.0,
  0.7: 11.0,
  0.8: 14.0,
  0.9: 16.0,
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
              max={0.9}
              step={0.1}
              initialValue={sliderValue}
              displayValue={(val) => {
                const rounded = Math.round(val * 10) / 10;
                const aperture = sliderValueMap[rounded];
                return aperture !== undefined ? aperture.toFixed(1) : "-";
              }}
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




