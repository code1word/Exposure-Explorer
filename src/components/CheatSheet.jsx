import React from "react";
import { Link } from "react-router-dom";
import { cheatsheetInfo } from "../data/cheatsheetData";

function CheatSheet() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>
        <em>Settings Cheatsheet for Common Photos</em>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {Object.entries(cheatsheetInfo).map(([key, { title }]) => (
          <Link key={key} to={`/learn/cheatsheet/${key}`}>
            <div style={{ textAlign: "center" }}>
              <img src={`/${key}-icon.png`} alt={title} width="80" />
              <p>
                <strong>{title.toUpperCase()}</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/learn">
        <button style={{ marginTop: "2rem" }}>← Back</button>
      </Link>
    </div>
  );
}

export default CheatSheet;
