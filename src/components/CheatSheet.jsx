import React from "react";
import { Link } from "react-router-dom";
import { cheatsheetInfo } from "../data/cheatsheetData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faImage, faMoon, faRunning } from '@fortawesome/free-solid-svg-icons'
import IconBox from "./reusable/IconBox";


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
          <IconBox
            key={key}
            label={title}
            route={`/learn/${key}`}
            icon={
              key === "portrait"
                ? faUser
                : key === "landscape"
                ? faImage
                : key === "night"
                ? faMoon
                : faRunning
            }
            status="Completed"
            ignoreStatus={true}
          />
        ))}
      </div>
      <Link to="/learn">
        <button style={{ marginTop: "2rem" }}>← Back</button>
      </Link>
    </div>
  );
}

export default CheatSheet;
