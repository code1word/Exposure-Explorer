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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import orderPortrait from "../../data/quiz_images/orderPortrait.png";

function PortraitSettings() {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      {/* Back Button */}
      <div className="mb-4" style={{ textAlign: "left" }}>
        <div
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

      <h2
        className="mb-3"
        style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#1d2a45",
        }}
      >
        Portrait Photography Settings
      </h2>
      <p className="text-muted" style={{ fontSize: "1.15rem" }}>
        Portraits are all about isolating your subject and capturing a
        flattering expression. These are the most commonly recommended camera
        settings to achieve beautiful portraits.
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
                  A wide aperture (e.g., f/2.0) creates a shallow depth of
                  field, making the subject sharp while beautifully blurring the
                  background.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Aperture (f-number)
                </label>
                <Slider
                  disabled={true}
                  min={1.4}
                  max={22}
                  step={0.1}
                  defaultValue={2.8}
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
            </OverlayTrigger>
          </div>

          {/* Shutter Speed */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A fast shutter speed (like 1/250s) helps avoid motion blur
                  from small subject movements or camera shake.
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
                  defaultValue={6}
                  disabled={true}
                  marks={{
                    0: "1/2000",
                    2: "1/1000",
                    6: "1/250",
                    8: "1/30",
                    12: "1s",
                    20: "15s",
                    30: "30s",
                  }}
                  tipFormatter={(val) =>
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
                  A low ISO (like 100–200) gives you clean, noise-free portraits
                  with the most detail.
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
                  disabled={true}
                  defaultValue={400}
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
            </OverlayTrigger>
          </div>

          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              color: "#666",
              fontSize: "0.9rem",
            }}
          >
            These are just some common settings to help anchor you — there are
            no rules, so feel free to explore!
          </p>
        </Col>

        {/* Right Column: Portrait Image */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            src={orderPortrait}
            alt="Portrait example"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default PortraitSettings;
