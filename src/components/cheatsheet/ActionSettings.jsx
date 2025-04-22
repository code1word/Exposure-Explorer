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
import actionPhoto from "../../data/quiz_images/orderActionShot.png"; // Replace with your file

function ActionSettings() {
  return (
    <Container className="py-4">
      <h2>Action Photography Settings</h2>
      <p>
        Action photography is all about freezing motion clearly. These settings help you
        capture sharp images of fast-moving subjects.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          {/* Aperture */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A wide aperture like f/2.8 lets in more light, allowing for faster shutter speeds.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Aperture (f-number)
                </label>
                <Slider
                  min={1.4}
                  max={22}
                  step={0.1}
                  defaultValue={2.8}
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
            </OverlayTrigger>
          </div>

          {/* Shutter Speed */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Use a very fast shutter speed like 1/1000s or faster to freeze motion without blur.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Shutter Speed (seconds)
                </label>
                <Slider
                  min={0.0005}
                  max={30}
                  step={0.0005}
                  defaultValue={1}
                  marks={{
                    0: "1/2000",
                    2: "1/1000",
                    6: "1/250",
                    8: "1/30",
                    12: "1s",
                    20: "15s",
                    30: "30s",
                  }}
                  tipFormatter={(val) =>
                    val >= 1 ? `${val}s` : `1/${Math.round(1 / val)}s`
                  }
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
                  Increase ISO as needed to compensate for fast shutter speeds in low light.
                </Tooltip>
              }
            >
              <div>
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  ISO
                </label>
                <Slider
                  min={50}
                  max={6400}
                  step={50}
                  defaultValue={800}
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
            </OverlayTrigger>
          </div>

          <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#666", fontSize: "0.9rem" }}>
            Continuous autofocus and burst mode are your best friends when tracking motion.
          </p>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image
            src={actionPhoto}
            alt="Action shot"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ActionSettings;
