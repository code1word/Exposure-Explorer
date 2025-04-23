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
import orderLandscape from "../../data/quiz_images/orderLandscape.png"; // Update with your actual file

function LandscapeSettings() {
  return (
    <Container className="py-4">
      <h2>Landscape Photography Settings</h2>
      <p>
        Landscape photography is about capturing the grandeur of a scene with sharp
        detail from front to back. These are the most commonly recommended camera
        settings to create crisp, vivid landscape shots.
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
                  A narrower aperture (e.g., f/8 or higher) increases depth of field,
                  ensuring more of the scene is in focus.
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
                  defaultValue={11}
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
                  Longer shutter speeds (e.g. 1/30s or slower) can help in low light
                  and create artistic motion effects, but a tripod is recommended.
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
                  defaultValue={8}
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
                  Use the lowest ISO possible to minimize noise and maximize detail,
                  especially since you can use a tripod.
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
                  defaultValue={400}
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

          <p
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              color: "#666",
              fontSize: "0.9rem",
            }}
          >
            These are typical starting points—feel free to experiment to suit lighting and creative goals!
          </p>
        </Col>

        {/* Right Column: Landscape Image */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image
            src={orderLandscape}
            alt="Landscape example"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default LandscapeSettings;
