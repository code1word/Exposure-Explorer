import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, ProgressBar } from "react-bootstrap";
import PhotoSlider from "./PhotoSlider";

function ISO() {
  const [step, setStep] = useState(() => {
    const saved = parseInt(localStorage.getItem("iso_step"), 10);
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
    const savedStep = parseInt(localStorage.getItem("iso_step"), 10);
    if (!isNaN(savedStep)) {
      setStep(savedStep);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("iso_step", step);

    // Also update progress state
    if (step === 2) {
      localStorage.setItem("progress_iso", "Completed");
    } else if (step >= 0) {
      localStorage.setItem("progress_iso", "In Progress");
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
          backgroundColor: "#13275e",
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

      <h2 style={{ fontWeight: "700" }}>ISO</h2>
      <p>
        <strong>ISO</strong> controls the camera’s sensitivity to light. It’s
        measured in values like 100, 400, 1600, etc. A larger ISO corresponds to
        higher light sensitivity.
      </p>
      <p>
        ISO affects two key properties of the camera: the{" "}
        <strong>exposure</strong> and the amount of <strong>image noise</strong>
        .
      </p>
      {step === 0 && renderDownArrow()}
      <div style={sectionStyle(step >= 1)}>
        <h3 style={{ fontWeight: "700" }}>Exposure</h3>
        <p>
          The <strong>exposure</strong> is the brightness of your photo.
        </p>
        <p>
          A higher ISO indicates higher light sensitivity and thus more exposure
          and a brighter image.
        </p>

        <PhotoSlider
          title="ISO"
          description="Use the slider to see how ISO affects exposure"
          imageSrcFunction={(val) => {
            const clamped = Math.max(100, Math.min(3200, val));
            const stepped = Math.round(clamped / 100) * 100; // Snap to nearest 100
            return `/iso_exposure/scene_iso${stepped.toFixed(0)}.png`;
          }}
          min={100}
          max={3200}
          step={100}
          initialValue={100}
          unitPrefix=""
          leftLabel="Lower ISO"
          leftDescriptions={[
            "Less sensitivity",
            "Less Exposure",
            "Dimmer image",
          ]}
          rightLabel="Higher ISO"
          rightDescriptions={[
            "More sensitivity",
            "More exposure",
            "Brighter image",
          ]}
        />

        {step === 1 && renderDownArrow()}
      </div>
      <div style={sectionStyle(step >= 2)}>
        <h3 style={{ fontWeight: "700" }}>Image Noise</h3>
        <p>
          <strong>Noise</strong> is the graininess or speckling that can appear
          in your photo, especially in low light.
        </p>
        <p>
          A higher ISO increases brightness but also adds more noise to the
          image.
        </p>

        <PhotoSlider
          title="ISO"
          description="Use the slider to see how ISO introduces image noise"
          imageSrcFunction={(val) => {
            const clamped = Math.max(100, Math.min(3200, val));
            const stepped = Math.round(clamped / 100) * 100; // Snap to nearest 100
            return `/iso_noise/scene_iso${stepped.toFixed(0)}.png`;
          }}
          min={100}
          max={3200}
          step={100}
          initialValue={100}
          unitPrefix=""
          leftLabel="Lower ISO"
          leftDescriptions={["Less sensitivity", "Clean image", "Less noise"]}
          rightLabel="Higher ISO"
          rightDescriptions={[
            "More sensitivity",
            "Brighter image",
            "More noise",
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

export default ISO;
