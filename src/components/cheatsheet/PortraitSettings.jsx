import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import orderPortrait from "../../data/quiz_images/orderPortrait.png";

function PortraitSettings() {
  return (
    <Container className="py-4">
      <h2>Portrait Photography Settings</h2>
      <p>
        Portraits are all about isolating your subject and capturing a flattering
        expression. These are the most commonly recommended camera settings to
        achieve beautiful portraits.
      </p>

      <Row className="mt-4">
        {/* Left Column: Settings */}
        <Col md={6}>
          {/* Aperture */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A wide aperture (e.g., f/2.0) creates a shallow depth of field,
                  making the subject sharp while beautifully blurring the background.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Aperture (f-number)
                </label>
                <Slider
                  min={1.4}
                  max={11}
                  step={0.1}
                  defaultValue={2.0}
                  marks={{
                    1.4: "f/1.4",
                    2.8: "f/2.8",
                    5.6: "f/5.6",
                    8: "f/8",
                    11: "f/11",
                  }}
                  tipFormatter={(val) => `f/${val.toFixed(1)}`}
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* Shutter Speed */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A fast shutter speed (like 1/250s) helps avoid motion blur from
                  small subject movements or camera shake.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Shutter Speed (seconds)
                </label>
                <Slider
                  min={0.001}
                  max={0.1}
                  step={0.001}
                  defaultValue={0.004} // 1/250
                  marks={{
                    0.001: "1/1000",
                    0.01: "1/100",
                    0.033: "1/30",
                    0.1: "1/10",
                  }}
                  tipFormatter={(val) => `1/${Math.round(1 / val)}s`}
                />
              </div>
            </OverlayTrigger>
          </div>

          {/* ISO */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A low ISO (like 100–200) gives you clean, noise-free portraits
                  with the most detail.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  ISO
                </label>
                <Slider
                  min={100}
                  max={3200}
                  step={100}
                  defaultValue={200}
                  marks={{
                    100: "100",
                    400: "400",
                    800: "800",
                    1600: "1600",
                    3200: "3200",
                  }}
                  tipFormatter={(val) => `ISO ${val}`}
                />
              </div>
            </OverlayTrigger>
          </div>

          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              color: "#666",
              fontSize: "0.9rem",
            }}
          >
            These are just some common settings to help anchor you, there are no rules so feel free to explore!
          </p>
        </Col>

        {/* Right Column: Portrait Image */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image
            src={orderPortrait}
            alt="Portrait example"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default PortraitSettings;
