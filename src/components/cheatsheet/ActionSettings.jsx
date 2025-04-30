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
import actionPhoto from "../../data/quiz_images/orderActionShot.png"; // Ensure this path is correct

function ActionSettings() {
  // Add useNavigate hook for the back button
  const navigate = useNavigate();

  // Define the static values for action settings
  const staticAperture = 2.8;
  // Note: Original defaultValue=1 maps between '1/2000' and '1/1000'.
  // Setting value=2 to point to the '1/1000s' mark as recommended.
  const staticShutterSpeed = 2;
  // Note: Original defaultValue=800 maps to the '400' ISO mark.
  // Setting value=800 to point to the 'ISO 400' mark.
  const staticISO = 800;

  return (
    <Container className="py-4">
      {/* Back Button (Copied from Portrait/LandscapeSettings) */}
      <div className="mb-4" style={{ textAlign: "left" }}>
        <div
          // Update the navigation path if needed
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

      {/* Heading with styles from Portrait/LandscapeSettings */}
      <h2
        className="mb-3"
        style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#1d2a45",
        }}
      >
        Action Photography Settings
      </h2>
      {/* Paragraph with styles from Portrait/LandscapeSettings */}
      <p className="text-muted" style={{ fontSize: "1.15rem" }}>
        Action photography is all about freezing motion clearly. These settings
        help you capture sharp images of fast-moving subjects.
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
                  A wide aperture like f/2.8 lets in more light, allowing for
                  faster shutter speeds. Recommended: f/2.8
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Aperture (f-stop)
                </label>
                <Slider
                  min={1.4}
                  max={22}
                  step={0.1}
                  value={staticAperture} // Use value for static display
                  disabled={true} // Disable slider interaction
                  marks={{
                    1.4: "f/1.4",
                    2.8: "f/2.8", // Value 2.8 points here
                    5.6: "f/5.6",
                    11: "f/11",
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
                  Use a very fast shutter speed like 1/1000s or faster to freeze
                  motion without blur. Recommended: 1/1000s
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Shutter Speed (seconds)
                </label>
                <Slider
                  min={0.0}
                  max={30}
                  step={0.0005}
                  value={staticShutterSpeed} // Use value for static display (points to 1/1000s mark)
                  disabled={true} // Disable slider interaction
                  marks={{
                    0: "1/2000",
                    2: "1/1000", // Value 2 points here
                    6: "1/250",
                    8: "1/30",
                    12: "1s",
                    20: "15s",
                    30: "30s",
                  }}
                  tipFormatter={(val) =>
                    // Find the mark label for the static value, or format directly
                    val === 2
                      ? "1/1000s" // Specific override for clarity
                      : val >= 1
                      ? `${val}s`
                      : `1/${Math.round(1 / val)}s`
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
                  Increase ISO as needed (e.g., 400 or higher) to compensate for
                  fast shutter speeds, especially if not in bright light.
                  Recommended: ISO 400
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
                  value={staticISO} // Use value for static display (points to ISO 400 mark)
                  disabled={true} // Disable slider interaction
                  marks={{
                    50: "50",
                    400: "100",
                    800: "400", // Value 800 points here
                    1200: "800",
                    1600: "1600",
                    3200: "3200",
                    6400: "6400",
                  }}
                  tipFormatter={
                    (val) =>
                      // Find the mark label for the static value, or format directly
                      val === 800
                        ? "ISO 400" // Specific override for clarity
                        : `ISO ${val}` // Fallback
                  }
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* Italic note styling copied from Portrait/LandscapeSettings */}
          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              color: "#666",
              fontSize: "1rem",
            }}
          >
            Continuous autofocus (AF-C) and burst mode are your best friends
            when tracking motion.
          </p>
        </Col>

        {/* Right Column: Action Image */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            style={{
              padding: "6px", // Inner white frame
              backgroundColor: "white",
              borderRadius: "2rem", // Match to image
              display: "inline-block",
              boxShadow: "0 0 0 4px #ABE2FB", // Outer blue ring
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
              src={actionPhoto}
              alt="Action shot example"
              fluid
              style={{
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "inherit",
                display: "block",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ActionSettings;
