import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuizTwoPhotoSliders from "./QuizTwoPhotoSliders";
import { QuizContext } from "../../context/QuizContextTwoSliders";

// Image imports
import img_00 from "../../data/quiz_images/orderPortrait.png";
import img_01 from "../../data/quiz_images/orderLandscape.png";
import img_02 from "../../data/quiz_images/orderActionShot.png"; // reference
import img_10 from "../../data/quiz_images/orderLandscape.png";
import img_11 from "../../data/quiz_images/orderPortrait.png";
import img_12 from "../../data/quiz_images/orderLandscape.png";
import img_20 from "../../data/quiz_images/orderPortrait.png";
import img_21 from "../../data/quiz_images/orderLandscape.png";
import img_22 from "../../data/quiz_images/orderPortrait.png";

const imageGrid = [
  [img_00, img_01, img_02],
  [img_10, img_11, img_12],
  [img_20, img_21, img_22],
];

const sliderSteps = [0.3, 0.6, 0.9]; // match grid size

const referenceImage = img_02; // correct image

export default function TwoSlidersQuestion({ questionKey = "twoSlidersQ1", reviewMode = false }) {
  const { sliderValues, recordSliderValue, selectedImages, recordSelectedImage } = useContext(QuizContext);

  const initial1 = sliderValues[`${questionKey}_1`] ?? 0.3;
  const initial2 = sliderValues[`${questionKey}_2`] ?? 0.6;
  const [sliderValue1, setSliderValue1] = useState(initial1);
  const [sliderValue2, setSliderValue2] = useState(initial2);

  const getGridIndex = (value) => sliderSteps.indexOf(value);
  const rowIndex = getGridIndex(sliderValue1);
  const colIndex = getGridIndex(sliderValue2);
  const currentImage = imageGrid?.[rowIndex]?.[colIndex];

  const handleSlider1Change = (value) => {
    setSliderValue1(value);
    if (!reviewMode) {
      recordSliderValue(`${questionKey}_1`, value);
    }
  };

  const handleSlider2Change = (value) => {
    setSliderValue2(value);
    if (!reviewMode) {
      recordSliderValue(`${questionKey}_2`, value);
    }
  };

  useEffect(() => {
    if (!reviewMode && currentImage) {
      recordSelectedImage(questionKey, currentImage);
    }
  }, [sliderValue1, sliderValue2]);

  const getStatus = () => {
    if (!reviewMode) return null;
  
    const isCorrect = currentImage === referenceImage;
  
    return (
      <div style={{ 
        backgroundColor: isCorrect ? "#d0f0c0" : "#f8d7da", 
        padding: "0.5rem", 
        borderRadius: "0.5rem",
        fontWeight: "bold",
        marginTop: "1rem"
      }}>
        {isCorrect ? (
          <>
            ✅ Correct!<br />
            Image Matched.
          </>
        ) : (
          <>
            ❌ Incorrect Image<br />
            The correct settings are f/0.30 and 0.90s
          </>
        )}
      </div>
    );
  };

  return (
    <Container>
      <Row className="text-center pt-3">
        <Col md={6} className="text-muted fst-italic">
          Adjust aperture and shutter speed to match the reference image.
        </Col>
        <Col md={6} className="text-muted fst-italic">
          Reference Image
        </Col>
      </Row>

      <Row className="align-items-start">
        <Col md={6}>
          <QuizTwoPhotoSliders
            staticImage={currentImage}
            description=""
            slider1Config={{
              value: sliderValue1,
              min: 0.3,
              max: 0.9,
              step: 0.3,
              onChange: handleSlider1Change,
              unitPrefix: "f/",
              leftLabel: "Small aperture",
              rightLabel: "Large aperture",
            }}
            slider2Config={{
              value: sliderValue2,
              min: 0.3,
              max: 0.9,
              step: 0.3,
              onChange: handleSlider2Change,
              unitSuffix: "s",
              leftLabel: "Fast shutter",
              rightLabel: "Slow shutter",
            }}
          />
        </Col>

        <Col md={6} >
          <Container className="text-center py-2">
            <img
              src={referenceImage}
              alt="Reference"
              style={{ maxWidth: "55%", height: "auto" }}
            />
            {getStatus()}
          </Container> 
        </Col>
      </Row>
    </Container>
  );
}
