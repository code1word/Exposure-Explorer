import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, ProgressBar } from "react-bootstrap";
import PhotoSlider from "./PhotoSlider";
import axios from "axios";

function Aperture() {
  useEffect(() => {
    const start = new Date(); // store full Date object

    return () => {
      const end = new Date();
      const duration = Math.round((end - start) / 1000); // in seconds

      if (duration > 1) {
        axios
          .post("http://localhost:3000/api/log-time", {
            page: "learn/aperture",
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
    const saved = parseInt(localStorage.getItem("aperture_step"), 10);
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
    const savedStep = parseInt(localStorage.getItem("aperture_step"), 10);
    if (!isNaN(savedStep)) {
      setStep(savedStep);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("aperture_step", step);

    // Also update progress state
    if (step === 2) {
      localStorage.setItem("progress_aperture", "Completed");
    } else if (step >= 0) {
      localStorage.setItem("progress_aperture", "In Progress");
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
          backgroundColor: "#1d2a45",
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

      <h2 style={{ fontWeight: "700" }}>Aperture</h2>
      <p>
        The <strong>aperture</strong> controls how wide the lens opens to let in
        light. It's measured in <strong>f-stops</strong>. A larger aperture
        corresponds to a smaller f-stop (e.g., f/1.4), while a smaller aperture
        corresponds to a larger f-stop (e.g., f/16).
      </p>
      <p>
        Aperture changes two key properties of the camera: the{" "}
        <strong>exposure</strong> and the <strong>depth of field</strong>.
      </p>
      {step === 0 && renderDownArrow()}
      <div style={sectionStyle(step >= 1)}>
        <h3 style={{ fontWeight: "700" }}>Exposure</h3>
        <p>
          The <strong>exposure</strong> is the brightness of your photo.
        </p>
        <p>A wider aperture lets in more light, making the image brighter.</p>

        <PhotoSlider
          title="Aperture"
          description="Use the slider to see how the aperture size affects exposure"
          imageSrcFunction={(val) => {
            const clamped = Math.max(0, Math.min(1, val)); // Clamp between 0–1
            const stepped = (Math.round(clamped * 20) / 20).toFixed(2); // Snap to nearest 0.05
            return `/dummy_stack/focus_${stepped}.png`;
          }}
          min={0}
          max={1}
          step={0.01}
          initialValue={0.4}
          unitPrefix="f/"
          leftLabel="Small aperture"
          leftDescriptions={["Large f-stop", "Less Exposure", "Dimmer image"]}
          rightLabel="Large aperture"
          rightDescriptions={[
            "Small f-stop",
            "More exposure",
            "Brighter image",
          ]}
        />

        {step === 1 && renderDownArrow()}
      </div>
      <div style={sectionStyle(step >= 2)}>
        <h3 style={{ fontWeight: "700" }}>Depth of Field</h3>
        <p>
          The <strong>depth of field (DoF)</strong> is the range of distance in
          a photo that appears sharp (not blurry).
        </p>
        <p>
          The smaller the aperture, the deeper the DoF, and the more of the
          background will be in focus.
        </p>

        <PhotoSlider
          title="Aperture"
          description="Use the slider to see how the aperture size affects depth of field"
          imageSrcFunction={(val) => {
            const fStops = [
              1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0,
            ];

            // Find the closest f-stop to the current slider value
            const closest = fStops.reduce((prev, curr) =>
              Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
            );

            return `/aperture_dof/squirrel_f${closest.toFixed(1)}.png`;
          }}
          min={1.4}
          max={16}
          step={0.1}
          initialValue={1.4}
          unitPrefix="f/"
          leftLabel="Large aperture"
          leftDescriptions={[
            "Shallow DoF",
            "Blurry background",
            "Isolated subject",
          ]}
          rightLabel="Small aperture"
          rightDescriptions={[
            "Deep DoF",
            "Sharp background",
            "Everything focused",
          ]}
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

export default Aperture;
