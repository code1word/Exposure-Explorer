import React from "react";
import { Link } from "react-router-dom";

function ShutterSpeed() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Shutter Speed</h2>
      <p>
        Shutter speed controls how long the sensor is exposed to light. It
        affects both exposure and motion blur.
      </p>
      <p>
        Faster = less light, sharper motion. Slower = more light, possible blur.
      </p>
      <Link to="/learn">
        <button>← Back</button>
      </Link>
    </div>
  );
}

export default ShutterSpeed;
