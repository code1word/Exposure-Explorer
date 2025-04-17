// src/components/InteractiveSim.jsx
import React, { useState } from "react";

function InteractiveSim() {
  const [aperture, setAperture] = useState(5.6);
  const [shutter, setShutter] = useState(250);
  const [iso, setISO] = useState(400);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Interactive Simulator</h2>
      <p>
        Adjust the sliders to see how the settings affect exposure, blur, and
        noise.
      </p>

      <div style={{ marginTop: "1rem" }}>
        <div>
          <label>
            Aperture (f/{aperture}):
            <input
              type="range"
              min="1.4"
              max="16"
              step="0.1"
              value={aperture}
              onChange={(e) => setAperture(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Shutter Speed (1/{shutter}s):
            <input
              type="range"
              min="30"
              max="1000"
              step="10"
              value={shutter}
              onChange={(e) => setShutter(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            ISO ({iso}):
            <input
              type="range"
              min="100"
              max="3200"
              step="100"
              value={iso}
              onChange={(e) => setISO(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default InteractiveSim;
