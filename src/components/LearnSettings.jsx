import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faBolt,
  faGears,
  faCheck,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

function LearnSettings() {
  const [progress, setProgress] = useState({
    aperture: "Not started",
    shutter: "Not started",
    iso: "Not started",
  });

  useEffect(() => {
    const aperture =
      sessionStorage.getItem("progress_aperture") || "Not started";
    const shutter = sessionStorage.getItem("progress_shutter") || "Not started";
    const iso = sessionStorage.getItem("progress_iso") || "Not started";
    setProgress({ aperture, shutter, iso });
  }, []);

  const statusStyle = {
    fontSize: "1.1rem",
    color: "#888",
    marginTop: "0.25rem",
    fontStyle: "italic",
  };

  const renderIconBox = (label, route, icon, statusKey) => {
    const isCompleted = progress[statusKey] === "Completed";

    return (
      <div
        style={{
          textAlign: "center",
          position: "relative",
          transition: "transform 0.1s ease, opacity 0.1s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.opacity = "1";
        }}
      >
        <Link
          to={route}
          style={{
            textDecoration: "none",
            border: "2.5px solid #1d2a45",
            borderRadius: "20px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "190px",
            height: "190px",
            backgroundColor: "#dbe3ee",
            opacity: isCompleted ? 0.5 : 1,
            transition: "all 0.2s ease",
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ fontSize: "5rem", color: "#1d2a45" }}
          />
          <div
            style={{
              marginTop: "0.65rem",
              fontWeight: "600",
              color: "#1d2a45",
              fontSize: "22px",
            }}
          >
            {label}
          </div>
        </Link>

        {isCompleted && (
          <div
            style={{
              position: "absolute",
              top: -9,
              left: -9,
              background: "#1d2a45",
              color: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}

        <div style={statusStyle}>
          {isCompleted
            ? "Completed"
            : progress[statusKey] === "In Progress"
            ? "In Progress"
            : "Not Opened"}
        </div>
      </div>
    );
  };

  return (
    <Container className="py-4 text-center">
      <h2 className="mb-3">
        A camera’s <span className="fst-italic">aperture</span>,{" "}
        <span className="fst-italic">shutter speed</span>, and{" "}
        <span className="fst-italic">ISO</span> make up the{" "}
        <span>exposure triangle</span>.
      </h2>
      <p className="text-muted fst-italic" style={{ fontSize: "1.25rem" }}>
        Click on each one to see how it impacts your photo
      </p>

      {/* Triangle layout with responsive collapse */}
      <div className="mt-5 d-flex flex-column align-items-center">
        {/* Top icon: Shutter Speed */}
        <div className="mb-5">
          {renderIconBox("Shutter Speed", "/learn/shutter", faBolt, "shutter")}
        </div>

        {/* Bottom two icons in a flex row on md+, column on smaller screens */}
        <div
          className="d-flex flex-column flex-md-row align-items-center"
          style={{
            gap: "1.5rem", // vertical spacing on small screens
          }}
        >
          <div className="mb-4 mb-md-0 me-md-5">
            {renderIconBox(
              "Aperture",
              "/learn/aperture",
              faCameraRetro,
              "aperture"
            )}
          </div>
          <div>{renderIconBox("ISO", "/learn/iso", faSun, "iso")}</div>
        </div>
      </div>

      {/* Settings Cheat Sheet Section */}
      <Row className="align-items-center mt-5 pt-5 border-top">
        {/* Left column: text content */}
        <Col md={8} className="text-start text-center mt-4 mt-md-0">
          <h2 className="mb-4">Want quick tips for real-world situations?</h2>
          <p
            style={{
              marginBottom: "1rem",
              fontSize: "1.35rem",
              fontStyle: "italic",
            }}
          >
            Check out the{" "}
            <a
              href="/learn/cheatsheet"
              style={{
                textDecoration: "none",
                color: "#1d2a45",
                fontWeight: "600",
              }}
            >
              Settings Cheat Sheet
            </a>{" "}
            to learn which setting combinations work best for portraits,
            landscapes, nighttime scenes, and action photography!
          </p>
        </Col>

        {/* Right column: icon card */}
        <Col md={4} className="text-center mt-4 mt-md-0">
          <Link
            to="/learn/cheatsheet"
            style={{
              textDecoration: "none",
              border: "2.5px solid #1d2a45",
              borderRadius: "1rem",
              padding: "1.25rem",
              display: "inline-block",
              width: "200px",
              height: "auto",
              backgroundColor: "#dbe3ee",
              color: "#1d2a45",
              transition: "transform 0.1s ease, opacity 0.1s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "1";
            }}
          >
            <FontAwesomeIcon
              icon={faGears}
              style={{
                fontSize: "6rem",
                paddingBottom: "0.5rem",
                marginBottom: "0.5rem",
              }}
            />
            <div
              style={{
                marginTop: "0.65rem",
                fontWeight: "600",
                color: "#1d2a45",
                fontSize: "22px",
              }}
            >
              Settings Cheat Sheet
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LearnSettings;
