import React from "react";
import { Link } from "react-router-dom";

function LearnSettings() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>The Exposure Triangle</h2>
      <p>
        A camera's aperture, shutter speed, and ISO make up the exposure
        triangle. Click on each one to see how it impacts your photo.
      </p>

      {/* Settings Links */}
      <div style={{ marginTop: "2rem" }}>
        <p>
          <Link to="/learn/aperture">🔳 Learn about Aperture</Link>
        </p>
        <p>
          <Link to="/learn/shutter">🕒 Learn about Shutter Speed</Link>
        </p>
        <p>
          <Link to="/learn/iso">🌗 Learn about ISO</Link>
        </p>
      </div>

      {/* Settings Cheat Sheet */}
      <div style={{ marginTop: "3rem" }}>
        <p>
          <Link to="/learn/cheatsheet">🧭 Settings Cheat Sheet</Link>
        </p>
        <p>
          Want quick tips for real-world situations?
          <br />
          Check out the Settings Cheat Sheet to learn which setting combinations
          work best for portraits, night scenes, and more!
        </p>
      </div>
    </div>
  );
}

export default LearnSettings;
