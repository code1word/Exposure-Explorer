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
    fontSize: "0.9rem",
    color: "#888",
    marginTop: "0.25rem",
    fontStyle: "italic",
  };

  const renderIconBox = (label, route, icon, statusKey) => (
    <div style={{ textAlign: "center", position: "relative" }}>
      <Link
        to={route}
        style={{
          textDecoration: "none",
          border: "2.5px solid #1d2a45",
          borderRadius: "20px",
          padding: "1rem",
          display: "inline-block",
          width: "150px",
          height: "150px",
          backgroundColor: "#dbe3ee",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: "3rem", color: "#1d2a45" }}
        />
        <div
          style={{
            marginTop: "0.5rem",
            fontWeight: "600",
            color: "#1d2a45",
            fontSize: "1.2rem",
          }}
        >
          {label}
        </div>
      </Link>

      {progress[statusKey] === "Completed" && (
        <div
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            background: "#1d2a45",
            color: "white",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            fontSize: "0.75rem",
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
        {progress[statusKey] === "Completed"
          ? "Completed"
          : progress[statusKey] === "In Progress"
          ? "In Progress"
          : "Not Opened"}
      </div>
    </div>
  );

  return (
    <Container className="py-4 text-center">
      <h4 className="mb-3">
        A camera’s <strong>aperture</strong>, <strong>shutter speed</strong>,
        and <strong>ISO</strong> make up the <strong>exposure triangle</strong>.
      </h4>
      <p className="text-muted">
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
      <Row className="align-items-center mt-5 pt-4 border-top">
        {/* Left column: text content */}
        <Col md={8} className="text-start text-center mt-4 mt-md-0">
          <h4 style={{ fontWeight: "700" }}>
            Want quick tips for real-world situations?
          </h4>
          <p style={{ marginBottom: 0, fontSize: "1.15rem" }}>
            Check out the{" "}
            <a
              href="/learn/cheatsheet"
              style={{
                textDecoration: "none",
                color: "#1d2a45",
                fontWeight: "700",
              }}
            >
              Cheat Sheet
            </a>{" "}
            to learn which setting combinations work best for portraits, night
            scenes, and more!
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
              width: "150px",
              height: "150px",
              backgroundColor: "#dbe3ee",
              color: "#1d2a45",
            }}
          >
            <FontAwesomeIcon
              icon={faGears}
              style={{ fontSize: "3rem", marginBottom: "0.5rem" }}
            />
            <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
              Cheat Sheet
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LearnSettings;
