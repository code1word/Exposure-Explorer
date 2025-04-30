import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuizTwoPhotoSliders from "./QuizTwoPhotoSliders";
import { QuizContext } from "../../context/QuizContextTwoSliders";

// Image imports
import img_010 from "../../data/quiz_images/orderPortrait.png";
import img_01 from "../../data/quiz_images/orderLandscape.png";
import img_02 from "../../data/quiz_images/orderActionShot.png"; // reference
import img_10 from "../../data/quiz_images/orderLandscape.png";
import img_11 from "../../data/quiz_images/orderPortrait.png";
import img_12 from "../../data/quiz_images/orderLandscape.png";
import img_20 from "../../data/quiz_images/orderPortrait.png";
import img_21 from "../../data/quiz_images/orderLandscape.png";
import img_22 from "../../data/quiz_images/orderPortrait.png";

const imageGrid_orig = [
  [img_010, img_01, img_02, img_010, img_01, img_02],
  [img_10, img_11, img_12, img_010, img_01, img_02],
  [img_20, img_21, img_22, img_010, img_01, img_02],
  [img_010, img_01, img_02, img_010, img_01, img_02],
  [img_10, img_11, img_12, img_010, img_01, img_02],
  [img_20, img_21, img_22, img_010, img_01, img_02]
];

const sliderValueMapAperture = {
  0.0: 1.4,
  0.2: 2.8,
  0.4: 5.6,
  0.6: 11.0,
  0.8: 14.0,
  1.0: 16.0
}

const sliderValueMapISO = {
  0.0: 50,
  0.2: 100,
  0.4: 150,
  0.6: 200,
  0.8: 250,
  1.0: 300
}


const displayApertureValue = (val) => {
  const rounded = Math.round(val * 10) / 10;
  const aperture = sliderValueMapAperture[rounded];
  return aperture !== undefined ? aperture.toFixed(1) : "-";
};

const displayISOValue = (val) => {
  const rounded = Math.round(val * 10) / 10;
  const aperture = sliderValueMapISO[rounded];
  return aperture !== undefined ? aperture.toFixed(1) : "-";
};

//const sliderSteps = [0.3, 0.6, 0.9]; // match grid size
const sliderSteps = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];


export default function TwoSlidersQuestion({ info, questionKey = "twoSlidersQ1", reviewMode = false }) {
  const { sliderValues, recordSliderValue, selectedImages, recordSelectedImage } = useContext(QuizContext);

  const initial1 = sliderValues[`${questionKey}_1`] ?? 0.4;
  const initial2 = sliderValues[`${questionKey}_2`] ?? 0.6;
  const [sliderValue1, setSliderValue1] = useState(initial1);
  const [sliderValue2, setSliderValue2] = useState(initial2);

  const getGridIndex = (value) => sliderSteps.indexOf(value);
  const rowIndex = getGridIndex(sliderValue1);
  const colIndex = getGridIndex(sliderValue2);
  const currentImage = info.imageGrid?.[rowIndex]?.[colIndex];
  const referenceImage = info.referenceImage; // correct image

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

      <Row className="align-items-start">
        <Col md={6}>
          <div className="text-muted fst-italic text-center pt-3">
            Adjust aperture and ISO.
          </div>
          <QuizTwoPhotoSliders
            staticImage={currentImage}
            description=""
            slider1Config={{
              value: sliderValue1,
              min: 0.2,
              max: 1.0,
              step: 0.2,
              onChange: handleSlider1Change,
              unitPrefix: "f/",
              leftLabel: "Small aperture",
              rightLabel: "Large aperture",
              displayValue: displayApertureValue,
            }}
            slider2Config={{
              value: sliderValue2,
              min: 0.0,
              max: 1.0,
              step: 0.2,
              onChange: handleSlider2Change,
              leftLabel: "Low ISO",
              rightLabel: "High ISO",
              displayValue: displayISOValue,
            }}
          />
        </Col>

        <Col md={6} >
          <div className="text-muted fst-italic text-center pt-3">
            Reference image
          </div>
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
