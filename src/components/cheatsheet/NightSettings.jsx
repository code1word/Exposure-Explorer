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
import nightPhoto from "../../data/quiz_images/orderNightPhotography.png"; // Ensure this path is correct

function NightSettings() {
  // Add useNavigate hook for the back button
  const navigate = useNavigate();

  // Define the static values for night settings
  // Note: Original defaultValue=2.0 maps between f/1.4 and f/2.8 marks. Keep value={2.0}.
  const staticAperture = 2.0;
  // Note: Original defaultValue=20 maps to the '15s' mark. Keep value={20}.
  const staticShutterSpeed = 20;
  // Note: Original defaultValue=1600 maps to the '1600' ISO mark. Keep value={1600}.
  const staticISO = 1600;


  return (
    <Container className="py-4">
      {/* Back Button (Copied from previous examples) */}
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

      {/* Heading with styles from previous examples */}
      <h2
        className="mb-3"
        style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#1d2a45",
        }}
      >
        Night Photography Settings
      </h2>
      {/* Paragraph with styles from previous examples */}
      <p className="text-muted" style={{ fontSize: "1.15rem" }}>
        Night photography requires letting in as much light as possible while avoiding
        excessive noise or blur. These settings are a great place to start for capturing
        scenes after dark.
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
                  A wide aperture like f/2.0 helps gather more light in dark conditions. Recommended: f/2.0
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
                    2.8: "f/2.8", // Value 2.0 is between 1.4 and 2.8
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
                  Longer shutter speeds (e.g., 15s) allow more light to hit the sensor—use a tripod! Recommended: 15s
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
                  value={staticShutterSpeed} // Use value for static display (points to 15s mark)
                  disabled={true} // Disable slider interaction
                  marks={{
                    0: "1/2000",
                    2: "1/1000",
                    6: "1/250",
                    8: "1/30",
                    12: "1s",
                    20: "15s", // Value 20 points here
                    30: "30s",
                  }}
                  tipFormatter={(val) =>
                    // Find the mark label for the static value, or format directly
                    val === 20 ? "15s" : // Specific override for clarity
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
                  Higher ISO values (e.g., 1600) boost brightness but increase noise—find a balance. Recommended: ISO 1600
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
                  value={staticISO} // Use value for static display (points to ISO 1600 mark)
                  disabled={true} // Disable slider interaction
                  marks={{
                    50: "50",
                    400: "100",
                    800: "400",
                    1200: "800",
                    1600: "1600", // Value 1600 points here
                    3200: "3200",
                    6400: "6400",
                  }}
                  tipFormatter={(val) =>
                     // Find the mark label for the static value, or format directly
                     val === 1600 ? "ISO 1600" : // Specific override for clarity
                     `ISO ${val}` // Fallback
                  }
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* Italic note styling copied from previous examples */}
          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              color: "#666",
              fontSize: "0.9rem",
            }}
          >
            Use a tripod whenever possible and experiment with white balance for dramatic effects. A remote shutter or timer can also prevent camera shake.
          </p>
        </Col>

        {/* Right Column: Night Image */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            src={nightPhoto} // Keep the night image
            alt="Night scene example"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }} // Style copied from previous examples
          />
        </Col>
      </Row>
    </Container>
  );
}

export default NightSettings;
