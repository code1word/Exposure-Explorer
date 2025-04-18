import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LearnSettings() {
  const [progress, setProgress] = useState({
    aperture: "Not started",
    shutter: "Not started",
    iso: "Not started",
  });

  useEffect(() => {
    const aperture =
      sessionStorage.getItem("progress_aperture") || "Not started";
    const shutter = sessionStorage.getItem("progress_shutter") || "Not started";
    const iso = sessionStorage.getItem("progress_iso") || "Not started";

    setProgress({ aperture, shutter, iso });
  }, []);

  const formatStatus = (status) => {
    if (status === "Completed") return "✅ Completed";
    if (status === "In Progress") return "🟡 In Progress";
    return "⚪ Not started";
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>The Exposure Triangle</h2>
      <p>
        A camera's aperture, shutter speed, and ISO make up the exposure
        triangle. Click on each one to see how it impacts your photo.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <p>
          <Link to="/learn/aperture">🔳 Learn about Aperture</Link> —{" "}
          {formatStatus(progress.aperture)}
        </p>
        <p>
          <Link to="/learn/shutter">🕒 Learn about Shutter Speed</Link> —{" "}
          {formatStatus(progress.shutter)}
        </p>
        <p>
          <Link to="/learn/iso">🌗 Learn about ISO</Link> —{" "}
          {formatStatus(progress.iso)}
        </p>
      </div>

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
