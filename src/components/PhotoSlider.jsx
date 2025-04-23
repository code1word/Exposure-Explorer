import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function PhotoSlider({
  title,
  description,
  imageSrcFunction,
  min,
  max,
  step,
  unitPrefix = "",
  unitSuffix = "",
  initialValue,
  leftLabel,
  leftDescriptions = [],
  rightLabel,
  rightDescriptions = [],
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
  };

  return (
    <Container className="text-center py-4">
      {/* Title and Description */}
      {description && <p className="text-muted fst-italic">{description}</p>}

      {/* Image */}
      {imageSrcFunction && (
        <img
          src={imageSrcFunction(value)}
          alt={`${title} visual`}
          style={{
            maxWidth: "60%",
            height: "auto",
            maxHeight: "500px",
            marginBottom: "1rem",
          }}
        />
      )}

      {/* Slider + Labels */}
      <Row className="align-items-center">
        <Col xs={4} className="text-end pe-3">
          <div className="fw-bold">{leftLabel}</div>
          <div style={{ fontSize: "1rem" }}>
            {leftDescriptions.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </Col>

        <Col xs={4}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="form-range"
            style={{
              background: "#dbe3ee", // fallback background
              WebkitAppearance: "none",
              height: "6px",
              borderRadius: "4px",
              padding: 0,
            }}
          />
          <div className="mt-1 fw-medium">
            {unitPrefix}
            {value.toFixed(2)}
            {unitSuffix}
          </div>
        </Col>

        <Col xs={4} className="text-start ps-3">
          <div className="fw-bold">{rightLabel}</div>
          <div style={{ fontSize: "1rem" }}>
            {rightDescriptions.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </Col>
      </Row>

      {/* Custom slider styling */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #1d2a45;
          cursor: pointer;
          margin-top: -6px;
          border: none;
        }

        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #1d2a45;
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

export default PhotoSlider;
