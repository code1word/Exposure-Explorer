import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  Container,
  Row,
  Col,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import dialIcon from "../assets/manual_mode.png";

// Replace existing arrays
const apertureSteps = [1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11.0, 16.0];
const shutterSteps = [250, 500, 1000, 2000, 3000, 4000, 4500, 5000]; // in ms
const isoSteps = [50, 100, 200, 400, 600, 800, 1200, 1600];

// Closest match function (unchanged)
const getClosest = (val, steps) =>
  steps.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );

// Updated dynamic image path generator
const formatFStop = (num) => {
  const forceDecimal = new Set([2, 4, 8]); // these need ".0"
  return forceDecimal.has(num) ? num.toFixed(1) : num.toString();
};

const getImagePath = (aperture, shutter, iso) => {
  const a = formatFStop(getClosest(aperture, apertureSteps));
  const s = getClosest(shutter, shutterSteps);
  const i = getClosest(iso, isoSteps);
  return `/interactive_sim/statue_f${a}_shutter${s}ms_iso${i}.jpg`;
};

const getExposureDescription = (apertureIdx, shutterIdx, isoIdx) => {
  const apertureVal = apertureSteps[apertureIdx];
  const shutterVal = shutterSteps[shutterIdx];
  const isoVal = isoSteps[isoIdx];

  const normShutter =
    (Math.log2(shutterVal) - Math.log2(shutterSteps[0])) /
    (Math.log2(shutterSteps[shutterSteps.length - 1]) -
      Math.log2(shutterSteps[0]));

  const normISO =
    (Math.log2(isoVal) - Math.log2(isoSteps[0])) /
    (Math.log2(isoSteps[isoSteps.length - 1]) - Math.log2(isoSteps[0]));

  const avgExposure = (normShutter + normISO) / 2;

  let description = "";

  const isMinExposure =
    shutterVal === shutterSteps[0] && isoVal === isoSteps[0];
  const isMaxExposure =
    shutterVal === shutterSteps[shutterSteps.length - 1] &&
    isoVal === isoSteps[isoSteps.length - 1];

  if (avgExposure < 0.35) {
    if (isMinExposure) {
      description +=
        "Exposure is at its minimum, and the image may appear nearly black. ";
    }

    if (apertureVal <= 2.8) {
      description +=
        "A wide aperture improves subject isolation, but overall brightness is still very low.";
    } else if (apertureVal >= 8.0) {
      description +=
        "The scene is dark, and a small aperture limits light intake even further.";
    } else {
      description +=
        "Underexposed, with moderate depth of field and minimal background separation.";
    }
  } else if (avgExposure > 0.65) {
    if (isMaxExposure) {
      description +=
        "Exposure is at its highest. Highlights may be clipped, and finer details can be lost. ";
    }

    if (apertureVal <= 2.8) {
      description +=
        "A wide aperture provides strong background blur, but consider lowering exposure to preserve highlight detail.";
    } else if (apertureVal >= 8.0) {
      description +=
        "Bright and sharp throughout, ideal for well-lit scenes — but some highlight control may be needed.";
    } else {
      description +=
        "Exposure is high, with a mid-range aperture providing a balance of blur and clarity.";
    }
  } else {
    if (apertureVal <= 2.8) {
      description +=
        "Exposure is balanced, and the wide aperture helps focus attention on the subject with background blur.";
    } else if (apertureVal >= 8.0) {
      description +=
        "Well-exposed and sharp across the frame — suitable for detailed or landscape shots.";
    } else {
      description +=
        "A balanced combination of light and focus depth — versatile for general shooting conditions.";
    }
  }

  return description;
};

function InteractiveSim() {
  const [aperture, setAperture] = useState(3);
  const [shutter, setShutter] = useState(1.0);
  const [iso, setISO] = useState(1.0);
  const [showHoverHint, setShowHoverHint] = useState(true);
  const [hasHovered, setHasHovered] = useState(false);

  const imageSrc = getImagePath(
    apertureSteps[aperture],
    shutterSteps[shutter],
    isoSteps[iso]
  );

  return (
    <div style={{ position: "relative" }}>
      <Container className="py-4">
        <h2
          className="mb-4 text-center"
          style={{ fontSize: "2.25rem", fontWeight: 700, color: "#13275e" }}
        >
          Interactive Simulator
        </h2>

        <Row>
          {/* Image preview */}
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-start"
          >
            <div
              style={{
                padding: "6px",
                backgroundColor: "white",
                borderRadius: "2rem",
                display: "inline-block",
                boxShadow: "0 0 0 4px #ABE2FB",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.01)";
                e.currentTarget.style.boxShadow = "0 0 12px 4px #ABE2FB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 0 4px #ABE2FB";
              }}
            >
              <Image
                src={imageSrc}
                alt="Simulated output"
                fluid
                style={{
                  maxHeight: "450px",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
              />
            </div>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "1.1rem",
                color: "#13275e",
                fontStyle: "italic",
                maxWidth: "90%",
                textAlign: "center",
                // transition: "min-height 0.3s ease",
              }}
            >
              {getExposureDescription(aperture, shutter, iso)}
            </p>
          </Col>

          {/* Sliders */}
          <Col
            md={6}
            className="d-flex flex-column px-3"
            style={{ alignItems: "stretch" }}
          >
            <p
              className="text-muted"
              style={{
                fontSize: "1.25rem",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              Adjust the different settings to see how each changes the look and
              exposure of this photo in real time.
            </p>

            {/* Aperture */}
            <div style={{ marginBottom: "3rem", color: "#13275e" }}>
              <div className="d-flex justify-content-between">
                <strong>Large Aperture</strong>
                <strong>Small Aperture</strong>
              </div>
              <Slider
                min={0}
                max={apertureSteps.length - 1}
                step={1}
                value={aperture}
                onChange={setAperture}
                marks={apertureSteps.reduce((acc, val, idx) => {
                  acc[idx] = `f/${val}`;
                  return acc;
                }, {})}
              />
            </div>

            {/* Shutter Speed */}
            <div style={{ marginBottom: "3rem", color: "#13275e" }}>
              <div className="d-flex justify-content-between">
                <strong>Fast Shutter</strong>
                <strong>Slow Shutter</strong>
              </div>
              <Slider
                min={0}
                max={shutterSteps.length - 1}
                step={1}
                value={shutter}
                onChange={setShutter}
                marks={shutterSteps.reduce((acc, val, idx) => {
                  acc[idx] = val < 1000 ? `${val}ms` : `${val / 1000}s`;
                  return acc;
                }, {})}
              />
            </div>

            {/* ISO */}
            <div style={{ marginBottom: "3rem", color: "#13275e" }}>
              <div className="d-flex justify-content-between">
                <strong>Low ISO</strong>
                <strong>High ISO</strong>
              </div>
              <Slider
                min={0}
                max={isoSteps.length - 1}
                step={1}
                value={iso}
                onChange={setISO}
                marks={isoSteps.reduce((acc, val, idx) => {
                  acc[idx] = `${val}`;
                  return acc;
                }, {})}
              />
            </div>

            {/* Dial Tooltip */}
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "2rem" }}
            >
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip
                    id="manual-tooltip"
                    style={{
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    This is <strong>Manual Mode</strong>. Here, you have full
                    control over the aperture, shutter speed, and ISO, giving
                    you complete control over how your photo is exposed.
                  </Tooltip>
                }
              >
                <div
                  id="mode-dial"
                  onMouseEnter={() => {
                    setShowHoverHint(false);
                    setHasHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (!hasHovered) setShowHoverHint(true);
                  }}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={dialIcon}
                    alt="Manual Mode Dial"
                    style={{
                      height: "100px",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                    rounded
                  />

                  {!hasHovered && showHoverHint && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "-120px",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.9rem",
                        fontStyle: "italic",
                        color: "#aaa",
                        opacity: 0.6,
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        className="pulse-once"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Hover for tip
                        <span style={{ display: "flex", marginLeft: "0.3rem" }}>
                          <i
                            className="fas fa-chevron-right"
                            style={{ fontSize: "0.85rem" }}
                          ></i>
                          <i
                            className="fas fa-chevron-right"
                            style={{
                              fontSize: "0.85rem",
                              marginLeft: "-0.15rem",
                            }}
                          ></i>
                          <i
                            className="fas fa-chevron-right"
                            style={{
                              fontSize: "0.85rem",
                              marginLeft: "-0.15rem",
                            }}
                          ></i>
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InteractiveSim;
