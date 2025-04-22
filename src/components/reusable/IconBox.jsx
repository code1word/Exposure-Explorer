import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const IconBox = ({ label, route, icon, status, ignoreStatus = false }) => {
  const statusLabel =
    status === "Completed"
      ? "Completed"
      : status === "In Progress"
      ? "In Progress"
      : "Not Opened";

  const statusStyle = {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#1d2a45",
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <Link
        to={route}
        style={{
          textDecoration: "none",
          border: "2.5px solid #1d2a45",
          borderRadius: "20px",
          padding: "1rem",
          display: "inline-block",
          width: "150px",
          height: "150px",
          backgroundColor: "#dbe3ee",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: "3rem", color: "#1d2a45" }}
        />
        <div
          style={{
            marginTop: "0.5rem",
            fontWeight: "600",
            color: "#1d2a45",
            fontSize: "1.2rem",
          }}
        >
          {label}
        </div>
      </Link>

      {!ignoreStatus && status === "Completed" && (
        <div
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            background: "#1d2a45",
            color: "white",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}

      {!ignoreStatus && <div style={statusStyle}>{statusLabel}</div>}
    </div>
  );
};

export default IconBox;
