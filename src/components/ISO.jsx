import React from "react";
import { Link } from "react-router-dom";

function ISO() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>ISO</h2>
      <p>
        ISO controls your camera's sensitivity to light. It also affects image
        noise.
      </p>
      <p>
        Low ISO = cleaner image but less light. High ISO = brighter image, more
        noise.
      </p>
      <Link to="/learn">
        <button>← Back</button>
      </Link>
    </div>
  );
}

export default ISO;
