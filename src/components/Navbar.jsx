import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/learn">Learn Settings</Link>
      <Link to="/simulator">Interactive Simulator</Link>
      <Link to="/practice">Practice Mode</Link>
    </nav>
  );
}

export default Navbar;
