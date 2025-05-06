import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import PhotoSlider from "./PhotoSlider";
import axios from "axios";
import dialIcon from "../assets/shutter_mode.png";

function ShutterSpeed() {
  useEffect(() => {
    const start = new Date(); // store full Date object

    return () => {
      const end = new Date();
      const duration = Math.round((end - start) / 1000); // in seconds

      if (duration > 1) {
        axios
          .post("http://localhost:3000/api/log-time", {
            page: "learn/shutter",
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            duration,
          })
          .catch((err) => {
            console.error("Logging failed:", err);
          });
      }
    };
  }, []);

  const [step, setStep] = useState(() => {
    const saved = parseInt(localStorage.getItem("shutter_step"), 10);
    return !isNaN(saved) ? saved : 0;
  });
  const navigate = useNavigate();

  const handleAdvance = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdvance();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  useEffect(() => {
    const savedStep = parseInt(localStorage.getItem("shutter_step"), 10);
    if (!isNaN(savedStep)) {
      setStep(savedStep);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shutter_step", step);

    // Also update progress state
    if (step === 2) {
      localStorage.setItem("progress_shutter", "Completed");
    } else if (step >= 0) {
      localStorage.setItem("progress_shutter", "In Progress");
    }
  }, [step]);

  const sectionStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    maxHeight: visible ? "fit-content" : "0px",
    transition: "opacity 1.5s ease, max-height 2s ease",
    marginTop: visible ? "2rem" : "0",
    overflow: "hidden",
  });

  const progressWidth = ((step + 1) / 3) * 100;

  const renderDownArrow = () => (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <div
        onClick={handleAdvance}
        onMouseEnter={(e) => {
          const circle = e.currentTarget.querySelector(".arrow-circle");
          circle.style.backgroundColor = "#cdd6e0";
          circle.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const circle = e.currentTarget.querySelector(".arrow-circle");
          circle.style.backgroundColor = "#dbe3ee";
          circle.style.transform = "scale(1)";
        }}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        <div
          className="arrow-circle"
          style={{
            backgroundColor: "#dbe3ee",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            transition: "all 0.2s ease",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowDown}
            style={{ fontSize: "24px", color: "#13275e" }}
          />
        </div>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "1rem",
            color: "#999",
            fontStyle: "italic",
          }}
        >
          Click or press enter
        </p>
      </div>
    </div>
  );

  const shutterValues = [1, 2, 5, 10, 20, 50, 100, 250, 500, 1000];
  const [isDialHovered, setIsDialHovered] = useState(false);

  return (
    <Container className="py-4" style={{ fontSize: "1.25rem" }}>
      <ProgressBar
        now={progressWidth}
        className="rounded-pill my-progress-bar"
        style={{
          height: "10px",
          backgroundColor: "transparent",
          border: "2px solid #abe2fb",
          overflow: "hidden",
        }}
      />

      {/* Back Button */}
      <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        <div
          onClick={() => navigate("/learn")}
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
                color: "#13275e",
                display: "block",
                lineHeight: "1",
              }}
            />
          </div>
          <span style={{ display: "inline-block" }}>Back</span>
        </div>
      </div>

      <h2 style={{ fontWeight: "700" }}>Shutter Speed</h2>
      <p>
        <strong>Shutter speed</strong> controls how long the camera's sensor is
        exposed to the light of the scene, measured in fractions of a second. A
        slower shutter speed means the shutter is open for longer. Modern
        cameras typically have a dial like the one below that lets you adjust
        the shutter speed directly.
      </p>

      {/* Manual Mode Dial (centered) */}
      <div
        className="d-flex justify-content-end justify-content-md-center align-items-center"
        style={{
          height: "100px",
          position: "relative",
          marginTop: "0.75rem",
          marginBottom: "0.75rem",
        }}
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
              In <strong>Shutter Priority Mode</strong>, you control the shutter
              speed, and the camera dynamically adjusts the aperture to maintain
              proper exposure.
            </Tooltip>
          }
        >
          <div
            id="mode-dial"
            onMouseEnter={() => setIsDialHovered(true)}
            onMouseLeave={() => setIsDialHovered(false)}
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

            <div
              className="text-muted"
              style={{
                position: "absolute",
                top: "50%",
                left: "-193px",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 500,
                fontSize: "1.15rem",
                fontStyle: "italic",
                pointerEvents: "none",
                opacity: isDialHovered ? 0 : 0.8,
                transition: "opacity 0.5s ease",
              }}
            >
              Shutter Priority Mode
              <span style={{ marginLeft: "7px" }}>
                <i
                  className="fas fa-caret-right"
                  style={{ fontSize: "1.15rem" }}
                ></i>
              </span>
            </div>
          </div>
        </OverlayTrigger>
      </div>
      <p>
        Shutter speed affects two key properties of the camera: the{" "}
        <strong>exposure</strong> and <strong>motion blur</strong>.
      </p>
      {step === 0 && renderDownArrow()}
      <div style={sectionStyle(step >= 1)}>
        <h3 style={{ fontWeight: "700" }}>Exposure</h3>
        <p>
          The <strong>exposure</strong> is the brightness of your photo.
        </p>
        <p>
          A slower shutter speed lets in more light and thus makes the image
          brighter.
        </p>

        <PhotoSlider
          title="Shutter Speed"
          description="Use the slider to see how shutter speed affects exposure"
          imageSrcFunction={(index) => {
            const shutter = shutterValues[index];
            return `/shutter_exposure/scene_shutter${shutter}ms.jpg`;
          }}
          min={0}
          max={shutterValues.length - 1}
          step={1}
          initialValue={3} // Index for 10ms
          unitSuffix={`ms`}
          getDisplayValue={(index) => `${shutterValues[index]}ms`}
          leftLabel="Faster shutter"
          leftDescriptions={["Less Exposure", "Darker image"]}
          rightLabel="Slower shutter"
          rightDescriptions={["More Exposure", "Brighter image"]}
        />

        {step === 1 && renderDownArrow()}
      </div>
      <div style={sectionStyle(step >= 2)}>
        <h3 style={{ fontWeight: "700" }}>Motion Blur</h3>
        <p>
          <strong>Motion blur</strong> refers to how movement appears in your
          photo.
        </p>
        <p>
          A faster shutter speed freezes motion, while a slower shutter speed
          can cause moving subjects to appear blurred.
        </p>

        <PhotoSlider
          title="Shutter Speed"
          description="Use the slider to see how shutter speed affects motion blur"
          imageSrcFunction={(index) => {
            const shutter = shutterValues[index];
            return `/shutter_motion_blur/car_shutter${shutter}ms.jpg`;
          }}
          min={0}
          max={shutterValues.length - 1}
          step={1}
          initialValue={3} // Index for 10ms
          unitSuffix={`ms`}
          getDisplayValue={(index) => `${shutterValues[index]}ms`}
          leftLabel="Faster shutter"
          leftDescriptions={["Freezes motion", "Sharp image"]}
          rightLabel="Slower shutter"
          rightDescriptions={["Motion blur", "Sense of movement"]}
        />

        <p
          style={{
            marginTop: "2rem",
            fontStyle: "italic",
            color: "#888",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          You've reached the end of this section!
        </p>
        {step === 2 && (
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              onMouseEnter={(e) => {
                const circle = e.currentTarget.querySelector(".top-circle");
                circle.style.backgroundColor = "#cdd6e0";
                circle.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const circle = e.currentTarget.querySelector(".top-circle");
                circle.style.backgroundColor = "#dbe3ee";
                circle.style.transform = "scale(1)";
              }}
              style={{
                display: "inline-block",
                cursor: "pointer",
                animation: "bounce 1.5s infinite",
              }}
            >
              <div
                className="top-circle"
                style={{
                  backgroundColor: "#dbe3ee",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  transition: "all 0.2s ease",
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ fontSize: "24px", color: "#13275e" }}
                />
              </div>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "1rem",
                  color: "#999",
                  fontStyle: "italic",
                }}
              >
                Back to Top
              </p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default ShutterSpeed;
