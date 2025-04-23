import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
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
      className="text-decoration-none text-dark w-100 h-100"
      style={{ transition: "all 0.3s ease" }}
    >
      <Card
        className="h-100 card-hover glass-card border-3"
        style={{
          borderColor: "#1d2a45",
          borderRadius: "20px",
          backgroundColor: "rgba(219, 227, 238, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "all 0.2s ease",
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
          <FontAwesomeIcon
            icon={icon}
            style={{
              fontSize: "7.5rem",
              color: "#1d2a45",
              transition: "transform 0.2s ease",
            }}
          />
          <Card.Title className="mt-3 fs-3 fw-bold text-center">
            {label}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );

  return (
    <div
      style={{
        backgroundImage: `url(${flowerBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Content Overlaid */}
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "3rem 1rem",
        }}
      >
        {/* Hero Title */}
        <div className="mb-5" style={{ animation: "fadeInUp 1.2s ease-out" }}>
          <div className="light-sweep-container justify-content-center align-items-center mb-3">
            {/* Corner Brackets */}
            <span className="reticle-corner reticle-tl"></span>
            <span className="reticle-corner reticle-tr"></span>
            <span className="reticle-corner reticle-bl"></span>
            <span className="reticle-corner reticle-br"></span>

            {/* Title with light sweep */}
            <div className="light-sweep-area">
              <h1
                // className="mb-3"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  color: "white",
                }}
              >
                Exposure Explorer
              </h1>
            </div>
          </div>
          <p
            className="fst-italic"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.95)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Master manual photography — one setting at a time.
          </p>
        </div>

        {/* Cards */}
        <Row
          className="g-5 justify-content-center w-100"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {[
            { label: "Learn Settings", icon: faCamera, route: "/learn" },
            {
              label: "Interactive Simulator",
              icon: faSliders,
              route: "/simulator",
            },
            { label: "Quiz Mode", icon: faCheckSquare, route: "/practice" },
          ].map((card, idx) => (
            <Col
              key={idx}
              xs={10}
              sm={8}
              md={6}
              lg={4}
              className="d-flex justify-content-center"
            >
              <div style={{ maxWidth: "400px", width: "100%" }}>
                {renderCard(card.label, card.icon, card.route)}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Styles */}
      <style>{`
        .card-hover:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .light-sweep-container {
          position: relative;
          display: inline-block;
          padding: 1rem 2rem; /* Adjusts corner spacing */
          overflow: hidden;
        }

        .light-sweep-area {
          position: relative;
          z-index: 1;
        }

        /* Light Sweep Effect */
        .light-sweep-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          opacity: 0;
          animation: sweepFade 2.4s ease-out 0.8s forwards;
          pointer-events: none;
          z-index: 0;
        }

        /* Corner brackets */
        .reticle-corner {
          content: "";
          position: absolute;
          width: 28px;
          height: 28px;
          border: 4px solid white;
          z-index: 2;
        }

        .reticle-tl {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        .reticle-tr {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }

        .reticle-bl {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }

        .reticle-br {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }

        @keyframes sweepFade {
          0% {
            left: -75%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 120%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
