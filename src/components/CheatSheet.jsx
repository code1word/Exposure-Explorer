import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cheatsheetInfo } from "../data/cheatsheetData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faImage,
  faMoon,
  faRunning,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

function CheatSheet() {
  const navigate = useNavigate();

  const getIcon = (key) => {
    switch (key) {
      case "portrait":
        return faUser;
      case "landscape":
        return faImage;
      case "night":
        return faMoon;
      default:
        return faRunning;
    }
  };

  return (
    <Container className="py-4 text-center">
      {/* Back Button (inline at top left) */}
      <div className="d-flex justify-content-start mb-4">
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

      {/* Title */}
      <h2
        className="mb-3"
        style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#1d2a45",
        }}
      >
        Settings Cheat Sheet for Common Photos
      </h2>

      {/* Icon Cards */}
      <Row className="justify-content-center g-5 mt-0">
        {Object.entries(cheatsheetInfo).map(([key, { title }]) => (
          <Col
            xs={6}
            sm={5}
            md={4}
            lg="auto"
            key={key}
            className="d-flex justify-content-center"
          >
            <Link
              to={`/learn/${key}`}
              style={{
                textDecoration: "none",
                border: "2.5px solid #1d2a45",
                borderRadius: "20px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "190px",
                height: "190px",
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
                icon={getIcon(key)}
                style={{ fontSize: "90px" }}
              />
              <div
                style={{
                  marginTop: "15px",
                  fontWeight: "700",
                  fontSize: "21px",
                  textAlign: "center",
                }}
              >
                {title}
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CheatSheet;
