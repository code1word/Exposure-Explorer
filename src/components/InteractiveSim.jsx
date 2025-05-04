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

const apertureSteps = [1, 2, 3, 4, 5, 6];
const shutterSteps = [0.25, 0.5, 1.0, 2.0, 4.0];
const isoSteps = [0.25, 0.5, 1.0, 2.0, 4.0];

// Closest match function
const getClosest = (val, steps) =>
  steps.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );

// Constructs dynamic image path
const getImagePath = (aperture, shutter, iso) => {
  const a = getClosest(aperture, apertureSteps);
  const s = getClosest(shutter, shutterSteps).toFixed(2);
  const i = getClosest(iso, isoSteps).toFixed(2);
  return `/output_images/aperture_${a}_shutter_x${s}_iso_x${i}.jpg`;
};

function InteractiveSim() {
  const [aperture, setAperture] = useState(3);
  const [shutter, setShutter] = useState(1.0);
  const [iso, setISO] = useState(1.0);
  const [showHoverHint, setShowHoverHint] = useState(true);
  const [hasHovered, setHasHovered] = useState(false);

  const imageSrc = getImagePath(aperture, shutter, iso);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
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
          </Col>

          {/* Sliders */}
          <Col
            md={6}
            className="d-flex flex-column justify-content-between px-3"
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
            <div style={{ marginBottom: "2rem", color: "#13275e" }}>
              <div className="d-flex justify-content-between">
                <strong>Small Aperture</strong>
                <strong>Large Aperture</strong>
              </div>
              <Slider
                min={2}
                max={6}
                step={1}
                value={aperture}
                onChange={setAperture}
                marks={{ 2: "f/5", 3: "f/4", 4: "f/3", 5: "f/2", 6: "f/1" }}
                tipFormatter={(val) => `Step ${val}`}
              />
            </div>

            {/* Shutter Speed */}
            <div style={{ marginBottom: "2rem", color: "#13275e" }}>
              <div className="d-flex justify-content-between">
                <strong>Fast Shutter</strong>
                <strong>Slow Shutter</strong>
              </div>
              <Slider
                min={0.25}
                max={4.0}
                step={0.01}
                value={shutter}
                onChange={setShutter}
                marks={{
                  0.25: "1/4s",
                  0.5: "1/2s",
                  1: "1s",
                  2: "2s",
                  4: "4s",
                }}
                tipFormatter={(val) =>
                  val >= 1 ? `${val.toFixed(1)}s` : `1/${Math.round(1 / val)}s`
                }
              />
            </div>

            {/* ISO */}
            <div style={{ marginBottom: "2rem", color: "#13275e" }}>
              <div className="d-flex justify-content-between">
                <strong>Low ISO</strong>
                <strong>High ISO</strong>
              </div>
              <Slider
                min={0.25}
                max={4.0}
                step={0.01}
                value={iso}
                onChange={setISO}
                marks={{
                  0.25: "50",
                  0.5: "100",
                  1: "200",
                  2: "400",
                  4: "800",
                }}
                tipFormatter={(val) => `ISO ${val * 200}`}
              />
            </div>

            {/* Dial Tooltip */}
            <div
              className="d-flex justify-content-end align-items-end"
              style={{ height: "100px", position: "relative" }}
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
