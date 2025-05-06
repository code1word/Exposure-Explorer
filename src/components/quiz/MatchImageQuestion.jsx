// src/components/quiz/MatchImageQuestion.jsx
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuizPhotoSlider from "./QuizPhotoSlider";
import { QuizContext } from "../../context/QuizContextMatchImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const sliderValueMap = {
  0.0: 16.0,
  0.1: 14.0,
  0.2: 11.0,
  0.3: 9.0,
  0.4: 8.0,
  0.5: 5.6,
  0.6: 4.0,
  0.7: 2.0,
  0.8: 1.4,
};

function MatchImageQuestion({ info, questionKey, reviewMode = false }) {
  const {
    sliderValues,
    recordSliderValue,
    selectedImages,
    recordSelectedImage,
  } = useContext(QuizContext);

  const initialValue = sliderValues[questionKey] ?? 0.2;
  const [sliderValue, setSliderValue] = useState(initialValue);
  const imageIndex = Math.round(Math.max(0, Math.min(1, sliderValue)) * 10);
  //const currentImage = portraitImageMap[imageIndex];
  const currentImage = info.imageMap[imageIndex.toString()];

  //console.log("sliderValue", sliderValue);
  //console.log("currentImage", currentImage);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue); // Always update local UI

    if (!reviewMode) {
      recordSliderValue(questionKey, newValue);
      const clamped = Math.max(0, Math.min(1, newValue));
      //const newImage = portraitImageMap[Math.round(clamped * 10)];
      const newImage = info.imageMap[Math.round(clamped * 10)];
      recordSelectedImage(questionKey, newImage);
    }
  };

  const getStatus = () => {
    if (!reviewMode) return null;

    const isCorrect = currentImage === info.referenceImage;

    if (isCorrect) {
      return (
        <div className="navy"
          style={{
            fontWeight: "bold",
            backgroundColor: "#d0f0c0",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            marginTop: "1rem",
          }}
        >
          {
            <span
              style={{
                color: "#4CAF50",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              Correct!
            </span>
          }
          <br/>
          Image Matched.
        </div>
      );
    } else {
      const correctKey = Object.entries(info.imageMap).find(
        ([_, img]) => img === info.referenceImage
      )?.[0];
      const correctValue = correctKey
        ? (parseInt(correctKey) / 10).toFixed(1)
        : "?";

      return (
        <div
          className="navy"
          style={{
            backgroundColor: "#f8d7da",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            fontWeight: "bold",
          }}
        >
          <span
            style={{
              color: "#d9534f",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
            Incorrect Image
          </span>
          <br />
          <strong>Correct setting: </strong>f/5.6
        </div>
      );
    }
  };

  return (
    <Container className="">
      <Row className="d-flex align-items-center">
        <Row className="align-items-start">
          {/* Slider section */}
          <Col lg={6} xs={12}>
            <div className="text-muted fst-italic text-center pt-3">
              Adjust aperture using the slider
            </div>
            <QuizPhotoSlider
              title="Aperture"
              description=""
              imageSrcFunction={(val) => {
                const clamped = Math.max(0, Math.min(1, val));
                const imageIndex = Math.round(clamped * 10);
                //return portraitImageMap[imageIndex];
                return info.imageMap[imageIndex];
              }}
              min={0}
              max={0.8}
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
          <Col lg={6} xs={12}>
            <div className="text-muted fst-italic text-center pt-3">
              Reference image
            </div>
            <Container className="text-center py-2">
              <img
                src={info.referenceImage}
                alt="Reference"
                style={{
                  maxWidth: "80%",
                  height: "auto",
                  padding: "none",
                }}
              />
              {reviewMode && (
                <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
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
