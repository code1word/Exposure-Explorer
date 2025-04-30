import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
// Import necessary components for the back button
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import orderLandscape from "../../data/quiz_images/orderLandscape.png"; // Ensure this path is correct

function LandscapeSettings() {
  // Add useNavigate hook for the back button
  const navigate = useNavigate();

  // Define the static values for landscape settings
  const staticAperture = 11;
  // Note: Original defaultValue=8 maps to '1/30s' mark. Keep value={8}.
  const staticShutterSpeed = 8;
  // Note: Original defaultValue=400 maps to '100' ISO mark. Keep value={400}.
  const staticISO = 400;


  return (
    <Container className="py-4">
      {/* Back Button (Copied from PortraitSettings) */}
      <div className="mb-4" style={{ textAlign: "left" }}>
        <div
          // Update the navigation path if needed, assuming it goes back to the same place
          onClick={() => navigate("/learn/cheatsheet")}
          onMouseEnter={(e) => {
            const circle = e.currentTarget.querySelector(".back-circle");
            circle.style.backgroundColor = "#cdd6e0";
            circle.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            const circle = e.currentTarget.querySelector(".back-circle");
            circle.style.backgroundColor = "#dbe3ee";
            circle.style.transform = "scale(1)";
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "#999",
            lineHeight: 1,
          }}
        >
          <div
            className="back-circle"
            style={{
              backgroundColor: "#dbe3ee",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              transition: "all 0.2s ease",
              transformOrigin: "center",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                fontSize: "20px",
                color: "#1d2a45",
                display: "block",
                lineHeight: "1",
              }}
            />
          </div>
          <span style={{ display: "inline-block" }}>Back</span>
        </div>
      </div>

      {/* Heading with styles from PortraitSettings */}
      <h2
        className="mb-3"
        style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#1d2a45",
        }}
      >
        Landscape Photography Settings
      </h2>
      {/* Paragraph with styles from PortraitSettings */}
      <p className="text-muted" style={{ fontSize: "1.15rem" }}>
        Landscape photography is about capturing the grandeur of a scene with sharp
        detail from front to back. These are the most commonly recommended camera
        settings to create crisp, vivid landscape shots.
      </p>

      <Row className="mt-4">
        {/* Left Column: Settings */}
        <Col md={6}>
          {/* Aperture */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A narrower aperture (e.g., f/8 or higher) increases depth of field,
                  ensuring more of the scene is in focus. Recommended: f/11
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Aperture (f-number)
                </label>
                <Slider
                  min={1.4}
                  max={22}
                  step={0.1}
                  value={staticAperture} // Use value for static display
                  disabled={true} // Disable slider interaction
                  marks={{
                    1.4: "f/1.4",
                    2.8: "f/2.8",
                    5.6: "f/5.6",
                    11: "f/11", // Value 11 points here
                    16: "f/16",
                    22: "f/22",
                  }}
                  tipFormatter={(val) => `f/${val.toFixed(1)}`}
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* Shutter Speed */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Longer shutter speeds (e.g. 1/30s or slower) can help in low light
                  and create artistic motion effects, but a tripod is recommended. Recommended: 1/30s
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Shutter Speed (seconds)
                </label>
                <Slider
                  min={0.0005}
                  max={30}
                  step={0.0005}
                  value={staticShutterSpeed} // Use value for static display
                  disabled={true} // Disable slider interaction
                  marks={{
                    0: "1/2000",
                    2: "1/1000",
                    6: "1/250",
                    8: "1/30", // Value 8 points here
                    12: "1s",
                    20: "15s",
                    30: "30s",
                  }}
                  tipFormatter={(val) =>
                    // Find the mark label for the static value, or format directly
                    val === 8 ? "1/30s" : // Specific override for clarity
                    val >= 1 ? `${val}s` : `1/${Math.round(1 / val)}s`
                  }
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* ISO */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Use the lowest ISO possible (like 100) to minimize noise and maximize detail,
                  especially since you can use a tripod. Recommended: ISO 100
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  ISO
                </label>
                <Slider
                  min={50}
                  max={6400}
                  step={50}
                  value={staticISO} // Use value for static display
                  disabled={true} // Disable slider interaction
                  marks={{
                    50: "50",
                    400: "100", // Value 400 points here
                    800: "400",
                    1200: "800",
                    1600: "1600",
                    3200: "3200",
                    6400: "6400",
                  }}
                  tipFormatter={(val) =>
                     // Find the mark label for the static value, or format directly
                     val === 400 ? "ISO 100" : // Specific override for clarity
                     `ISO ${val}` // Fallback
                  }
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* Italic note styling copied from PortraitSettings */}
          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              color: "#666",
              fontSize: "0.9rem",
            }}
          >
            These are typical starting points—feel free to experiment to suit lighting and creative goals!
          </p>
        </Col>

        {/* Right Column: Landscape Image */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            src={orderLandscape} // Keep the landscape image
            alt="Landscape example"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }} // Style copied from PortraitSettings
          />
        </Col>
      </Row>
    </Container>
  );
}

export default LandscapeSettings;
