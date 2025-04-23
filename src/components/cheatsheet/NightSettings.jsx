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
import nightPhoto from "../../data/quiz_images/orderNightPhotography.png"; // Replace with your file

function NightSettings() {
  return (
    <Container className="py-4">
      <h2>Night Photography Settings</h2>
      <p>
        Night photography requires letting in as much light as possible while avoiding
        excessive noise or blur. These settings are a great place to start for capturing
        scenes after dark.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          {/* Aperture */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  A wide aperture like f/2.0 helps gather more light in dark conditions.
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
            </OverlayTrigger>
          </div>

          {/* Shutter Speed */}
          <div style={{ marginBottom: "2.5rem" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Longer shutter speeds allow more light to hit the sensor—use a tripod to avoid blur.
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
                  defaultValue={20}
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
                  Higher ISO values boost brightness but increase noise—try to find a balance.
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
            </OverlayTrigger>
          </div>

          <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#666", fontSize: "0.9rem" }}>
            Use a tripod whenever possible and experiment with white balance for dramatic effects.
          </p>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image
            src={nightPhoto}
            alt="Night scene"
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default NightSettings;
