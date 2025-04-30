import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, ProgressBar } from "react-bootstrap";
import PhotoSlider from "./PhotoSlider";
import axios from "axios";

function ShutterSpeed() {
  useEffect(() => {
    const start = new Date(); // store full Date object

    return () => {
      const end = new Date();
      const duration = Math.round((end - start) / 1000); // in seconds

      if (duration > 1) {
        axios
          .post("http://localhost:5000/api/log-time", {
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
            style={{ fontSize: "24px", color: "#1d2a45" }}
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

  return (
    <Container className="py-4" style={{ fontSize: "1.25rem" }}>
      <ProgressBar
        className="mb-3"
        style={{
          height: "10px",
          borderRadius: "999px",
          backgroundColor: "#dbe3ee",
          overflow: "hidden",
        }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${progressWidth}%`,
            backgroundColor: "#1d2a45",
            borderRadius: "999px",
            height: "100%",
            transition: "width 0.4s ease",
          }}
        />
      </ProgressBar>

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
                color: "#1d2a45",
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
        slower shutter speed means the shutter is open for longer.
      </p>
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
          imageSrcFunction={(val) => {
            const clamped = Math.max(0, Math.min(1, val)); // Clamp between 0–1
            const stepped = (Math.round(clamped * 20) / 20).toFixed(2); // Snap to nearest 0.05
            return `/dummy_stack/focus_${stepped}.png`;
          }}
          min={0}
          max={1}
          step={0.01}
          initialValue={0.4}
          unitPrefix=""
          leftLabel="Faster shutter"
          leftDescriptions={["Less Exposure", "Dimmer image"]}
          rightLabel="Slower shutter"
          rightDescriptions={["More exposure", "Brighter image"]}
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
          imageSrcFunction={(val) => {
            const clamped = Math.max(0, Math.min(1, val)); // Clamp between 0–1
            const stepped = (Math.round(clamped * 20) / 20).toFixed(2); // Snap to nearest 0.05
            return `/dummy_stack/focus_${stepped}.png`;
          }}
          min={0}
          max={1}
          step={0.01}
          initialValue={0.4}
          unitPrefix=""
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
      </div>
    </Container>
  );
}

export default ShutterSpeed;
