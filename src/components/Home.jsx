import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Exposure Explorer</h1>
      <p>An interactive platform for exploring manual photography settings.</p>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <Link to="/learn">
          <button style={{ fontSize: "1.2rem" }}>📖 Learn Settings</button>
        </Link>

        <Link to="/simulator">
          <button style={{ fontSize: "1.2rem" }}>🎚️ Interactive Sim</button>
        </Link>

        <Link to="/practice">
          <button style={{ fontSize: "1.2rem" }}>🧪 Practice Mode</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
