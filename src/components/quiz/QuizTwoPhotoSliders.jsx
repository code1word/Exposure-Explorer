import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function QuizTwoPhotoSliders({
  title,
  description,
  staticImage,
  slider1Config,
  slider2Config,
}) {
  const renderSlider = ({
    value,
    min,
    max,
    step,
    onChange,
    unitPrefix = "",
    unitSuffix = "",
    leftLabel,
    rightLabel,
    displayValue,
    leftDescriptions = [],
    rightDescriptions = [],
  }) => {
    return (
      <Row className="align-items-center my-2">
        <Col xs={4} className="text-end pe-3">
          <div className="fw-bold">{leftLabel}</div>
          {leftDescriptions.map((line, i) => (
            <div key={i} style={{ fontSize: "0.85rem" }}>
              {line}
            </div>
          ))}
        </Col>

        <Col xs={4}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="form-range"
            style={{
              background: "#dbe3ee",
              WebkitAppearance: "none",
              height: "6px",
              borderRadius: "4px",
              padding: 0,
            }}
          />
          <div className="mt-1 fw-medium">
            {unitPrefix}
            {displayValue ? displayValue(value) : value.toFixed(2)}
            {unitSuffix}
          </div>
        </Col>

        <Col xs={4} className="text-start ps-3">
          <div className="fw-bold">{rightLabel}</div>
          {rightDescriptions.map((line, i) => (
            <div key={i} style={{ fontSize: "0.85rem" }}>
              {line}
            </div>
          ))}
        </Col>
      </Row>
    );
  };

  return (
    <Container className="text-center py-2">
      {description && <p className="text-muted fst-italic">{description}</p>}

      {staticImage && (
        <img
          src={staticImage}
          alt="Preview"
          style={{
            maxWidth: "80%",
            height: "auto",
            marginBottom: "1rem",
          }}
        />
      )}

      {renderSlider(slider1Config)}
      {renderSlider(slider2Config)}

      {/* Custom slider styling */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #13275e;
          cursor: pointer;
          margin-top: -6px;
          border: none;
        }

        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #13275e;
          cursor: pointer;
          border: none;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          background: #dbe3ee;
          border-radius: 4px;
          border: none;
          outline: none;
        }

        input[type="range"]::-moz-range-track {
          height: 6px;
          background: #dbe3ee;
          border-radius: 4px;
          border: none;
          outline: none;
        }
      `}</style>
    </Container>
  );
}

export default QuizTwoPhotoSliders;
