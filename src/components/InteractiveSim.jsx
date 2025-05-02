import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import flowerPhoto from "../assets/flower.jpg";
import dialIcon from "../assets/manual_mode.PNG";

function InteractiveSim() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Container className="py-4">
        <h2
          className="mb-3"
          style={{
            fontSize: "2.25rem",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: "#13275e",
            alignSelf: "flex-start",
          }}
        >
          Interactive Simulator
        </h2>
        <Row>
          {/* Left Column: Title + Image */}
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
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 0 12px 4px #ABE2FB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 0 4px #ABE2FB";
              }}
            >
              <Image
                src={flowerPhoto}
                alt="Flower with blur"
                fluid
                style={{
                  maxHeight: "450px",
                  objectFit: "cover",
                  borderRadius: "inherit",
                  display: "block",
                }}
              />
            </div>
          </Col>

          {/* Right Column: Sliders and Icon */}
          <Col md={6} className="d-flex flex-column justify-content-between">
            <div>
              <p className="text-muted" style={{ fontSize: "1.15rem" }}>
                Adjust the different settings to see how each changes the look
                and exposure of this photo in real time.
              </p>

              {/* Aperture Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div className="d-flex justify-content-between">
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Small Aperture
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textAlign: "right",
                    }}
                  >
                    Large Aperture
                  </div>
                </div>
                <Slider
                  min={1.4}
                  max={22}
                  step={0.1}
                  defaultValue={2.0}
                  marks={{
                    1.4: "f/1.4",
                    2.8: "f/2.8",
                    5.6: "f/5.6",
                    11: "f/11",
                    16: "f/16",
                    22: "f/22",
                  }}
                  tipFormatter={(val) => `f/${val.toFixed(1)}`}
                />
              </div>

              {/* Shutter Speed Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div className="d-flex justify-content-between">
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Slow Shutter
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textAlign: "right",
                    }}
                  >
                    Fast Shutter
                  </div>
                </div>
                <Slider
                  min={0}
                  max={30}
                  step={0.0005}
                  defaultValue={20}
                  marks={{
                    0: "1/2000",
                    2: "1/1000",
                    6: "1/250",
                    8: "1/30",
                    12: "1''",
                    20: "15''",
                    30: "30''",
                  }}
                  tipFormatter={(val) =>
                    val >= 1 ? `${val}s` : `1/${Math.round(1 / val)}s`
                  }
                />
              </div>

              {/* ISO Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div className="d-flex justify-content-between">
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Low ISO
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textAlign: "right",
                    }}
                  >
                    High ISO
                  </div>
                </div>
                <Slider
                  min={50}
                  max={6400}
                  step={50}
                  defaultValue={1600}
                  marks={{
                    50: "50",
                    400: "100",
                    800: "400",
                    1200: "800",
                    1600: "1600",
                    3200: "3200",
                    6400: "6400",
                  }}
                  tipFormatter={(val) => `ISO ${val}`}
                />
              </div>
            </div>

            {/* Dial Icon & Tooltip */}
            <div
              className="d-flex justify-content-end align-items-end"
              style={{ height: "100px", position: "relative" }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  className="manual-tooltip"
                  style={{
                    position: "absolute",
                    right: "115px",
                    bottom: "25px",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "1rem",
                    padding: "0.8rem 1rem",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    whiteSpace: "nowrap",
                    display: "none",
                  }}
                >
                  In <strong>Manual Mode</strong>, you have full control over
                  these settings!
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-10px",
                      marginTop: "-8px",
                      width: "0",
                      height: "0",
                      borderTop: "8px solid transparent",
                      borderBottom: "8px solid transparent",
                      borderLeft: "10px solid #ccc",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-9px",
                      marginTop: "-7px",
                      width: "0",
                      height: "0",
                      borderTop: "7px solid transparent",
                      borderBottom: "7px solid transparent",
                      borderLeft: "9px solid #fff",
                    }}
                  />
                </div>

                <Image
                  src={dialIcon}
                  alt="Manual Mode Dial"
                  style={{ height: "100px", cursor: "pointer" }}
                  onMouseEnter={() => {
                    const tooltip = document.querySelector(".manual-tooltip");
                    if (tooltip) tooltip.style.display = "block";
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.querySelector(".manual-tooltip");
                    if (tooltip) tooltip.style.display = "none";
                  }}
                  rounded
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InteractiveSim;
