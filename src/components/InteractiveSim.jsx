import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import flowerPhoto from "../assets/flower.jpg";
// import dialIcon from "../../data/quiz_images/manualDial.png";   // Replace with actual file path

function InteractiveSim() {
  return (
    <Container className="py-4">
      <h2>Interactive Simulator</h2>

      <Row className="mt-4">
        {/* Image on the Left */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image
            src={flowerPhoto}
            alt="Flower with blur"
            fluid
            rounded
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
        </Col>

        {/* Sliders on the Right */}
        <Col md={6}>
          <p style={{ textAlign: "center" }}>
          Adjust the different settings to see how each changes the look and
          exposure of this photo in real time.
          </p>
          {/* Aperture Slider */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="d-flex justify-content-between">
              <div>Small Aperture</div>
              <div style={{ textAlign: "right" }}>Large Aperture</div>
            </div>
            <Slider
              min={1.4}
              max={22}
              step={0.1}
              defaultValue={2.0}
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

          {/* Shutter Speed Slider */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="d-flex justify-content-between">
              <div>Slow Shutter</div>
              <div style={{ textAlign: "right" }}>Fast Shutter</div>
            </div>
            <Slider
              min={0}
              max={30}
              step={0.0005}
              defaultValue={20}
              marks={{
                0: "1/2000",
                2: "1/1000",
                6: "1/250",
                8: "1/30",
                12: "1''",
                20: "15''",
                30: "30''",
              }}
              tipFormatter={(val) =>
                val >= 1 ? `${val}s` : `1/${Math.round(1 / val)}s`
              }
            />
          </div>

          {/* ISO Slider */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="d-flex justify-content-between">
              <div>Low ISO</div>
              <div style={{ textAlign: "right" }}>High ISO</div>
            </div>
            <Slider
              min={50}
              max={6400}
              step={50}
              defaultValue={1600}
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

          {/* Manual Mode Callout
          <div className="d-flex align-items-center mt-4">
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "1rem",
                padding: "1rem",
                marginRight: "1rem",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              In <strong>Manual Mode</strong>, you have full control over these settings!
            </div>
            <Image
              src={dialIcon}
              alt="Manual Mode Dial"
              style={{ height: "70px" }}
              rounded
            />
          </div> */}
        </Col>
      </Row>
    </Container>
  );
}

export default InteractiveSim;
