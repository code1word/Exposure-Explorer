import React from "react";
import { useParams, Link } from "react-router-dom";
import { cheatsheetInfo } from "../../data/cheatsheetData";

function CheatSheetDetail() {
  const { type } = useParams();
  const info = cheatsheetInfo[type];

  if (!info) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Not Found</h2>
        <p>This cheat sheet topic doesn't exist.</p>
        <Link to="/learn/cheatsheet">
          <button>← Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{info.title}</h2>
      <p>{info.description}</p>
      <img
        src={info.image}
        alt={info.title}
        style={{ maxWidth: "400px", marginTop: "1rem", borderRadius: "8px" }}
      />
      <br />
      <Link to="/learn/cheatsheet">
        <button style={{ marginTop: "2rem" }}>← Back</button>
      </Link>
    </div>
  );
}

export default CheatSheetDetail;
