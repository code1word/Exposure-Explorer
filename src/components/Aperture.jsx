import React from "react";
import { Link } from "react-router-dom";

function Aperture() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Aperture</h2>
      <p>
        The aperture controls how wide the lens opens to let in light. It
        affects both exposure and depth of field.
      </p>
      <p>Lower f-stop = wider opening → more light, blurrier background.</p>
      <p>Higher f-stop = narrower opening → less light, more in focus.</p>
      <Link to="/learn">
        <button>← Back</button>
      </Link>
    </div>
  );
}

export default Aperture;
