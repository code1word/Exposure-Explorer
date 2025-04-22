import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faSliders,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import flowerBackground from "../assets/flower.jpg";

function Home() {
  const renderCard = (label, icon, route) => (
    <Link
      to={route}
      style={{
        textDecoration: "none",
        border: "2.5px solid #1d2a45",
        borderRadius: "20px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minWidth: "200px",
        backgroundColor: "#dbe3ee",
        color: "#1d2a45",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.opacity = "1";
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ fontSize: "160px" }} />
      <div
        style={{
          fontWeight: "700",
          fontSize: "1.8rem",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </Link>
  );

  return (
    <>
      {/* Hero Banner Section */}
      <div
        style={{
          backgroundImage: `url(${flowerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "7rem 1rem",
          textAlign: "center",
          color: "white",
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "4.5rem",
              fontWeight: "800",
              letterSpacing: "3px",
              margin: "1rem 0",
            }}
          >
            EXPOSURE EXPLORER
          </h1>
          <p
            style={{
              fontSize: "1.8rem",
              fontStyle: "italic",
              maxWidth: "700px",
              margin: "0 auto",
              opacity: 0.9,
            }}
          >
            Master manual photography — one setting at a time.
          </p>
        </div>
      </div>

      {/* Card Section */}
      <Container className="py-5 text-center">
        <h2 className="mb-4 fw-bold text-dark">Explore the Platform</h2>
        <Row className="g-5 justify-content-center">
          <Col xs={10} md={4}>
            {renderCard("Learn Settings", faCamera, "/learn")}
          </Col>
          <Col xs={10} md={4}>
            {renderCard("Interactive Simulator", faSliders, "/simulator")}
          </Col>
          <Col xs={10} md={4}>
            {renderCard("Practice Mode", faCheckSquare, "/practice")}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
