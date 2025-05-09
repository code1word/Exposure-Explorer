//src/components/quiz/TableFillBlanksQuestion.jsx

import React, { useState, useContext, useEffect, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { QuizContext } from "../../context/QuizContextTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./quiz.css";

const ItemType = "ANSWER";

// Draggable item for the word bank
function DraggableItem({ answer, onDrag }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemType,
    item: { answer },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrag(item.answer); // Successful drop
      } else {
        onDrag(item.answer, false); // Return to word bank
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "5px 10px",
        margin: "5px",
        border: "2px solid #13275e",
        borderRadius: "10px",
        backgroundColor: "#dbe3ee",
        cursor: "grab",
        color: "#13275e",
        fontWeight: "bold",
      }}
    >
      {answer}
    </div>
  );
}

// Droppable cell in the table
function DroppableCell({
  row,
  col,
  currentValue,
  onDrop,
  correctValue,
  onRemove,
  reviewMode,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      onDrop(item.answer, row, col); // No need for success here
    },
    canDrop: () => {
      //console.log(`Cell [${row},${col}] currentValue: "${currentValue}"`);
      return !reviewMode; // Prevent dropping in review mode
    },
  }));

  let displayValue = currentValue || "";
  let style = {
    width: "170px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "5px",
    textAlign: "center",
    padding: "5px",
    lineHeight: "1.2",
    backgroundColor: isOver ? "#e9f4fc" : currentValue ? "#f8fbff" : "white",
    transition: "background-color 0.5s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "65px",
  };

  // Only apply these styles if in reviewMode
  if (reviewMode) {
    if (currentValue === correctValue) {
      style.backgroundColor = "#d0f0c0"; // Green
      displayValue = (
        <span
          style={{
            color: "#4CAF50",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FontAwesomeIcon icon={faCircleCheck} />
          {currentValue}
        </span>
      );
    } else if (currentValue) {
      style.backgroundColor = "#f8d7da"; // Red
      displayValue = (
        <div>
          <span
            style={{
              color: "#555",
              // display: "inline-block",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#d9534f", marginRight: "0.5rem" }}
            />
            <span style={{ color: "#d9534f" }}>{currentValue}</span>
            <br />
          </span>
          <span style={{ fontSize: "12px", color: "#d9534f" }}>
            Correct answer: {correctValue}
          </span>
        </div>
      );
    } else {
      style.backgroundColor = "#f8d7da"; // Red
      displayValue = (
        <div style={{}}>
          <span
            style={{
              color: "#555",
              paddingTop: "12px",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#d9534f" }}
            />
            <br />
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#d9534f",
            }}
          >
            Correct answer: {correctValue}
          </span>
        </div>
      );
    }
  }

  return (
    <div ref={drop} style={style}>
      {!reviewMode ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          onClick={() => currentValue && onRemove(row, col, currentValue)} // 👈 click to remove
        >
          {currentValue && (
            <span
              title="Click to remove"
              style={{
                padding: "5px 10px",
                border: "2px solid #13275e",
                borderRadius: "10px",
                backgroundColor: "#dbe3ee",
                color: "#13275e",
                fontWeight: "bold",
                cursor: "pointer",
                opacity: 0.8,
              }}
            >
              {currentValue}
            </span>
          )}
        </div>
      ) : (
        displayValue
      )}
    </div>
  );
}

function TableFillBlanksQuestion({ info, questionKey, reviewMode }) {
  const { selectedAnswers, recordAnswer } = useContext(QuizContext);
  const initialAnswers = selectedAnswers[questionKey] || {};

  // Track answers persistently in the table
  const [answers, setAnswers] = useState(() => {
    const blankCells = {};
    info.rows.forEach((row) => {
      info.columns.forEach((col) => {
        const key = `${row}-${col}`;
        blankCells[key] = initialAnswers[key] || ""; // Ensure initial answers persist
      });
    });
    return blankCells;
  });

  // Store word bank and track used answers separately
  const [wordBank, setWordBank] = useState(info.wordBank);
  const [usedAnswers, setUsedAnswers] = useState([]); // Track used answers that have been placed in the table
  const [pendingAnswers, setPendingAnswers] = useState(null); // Track answers that need to be recorded later

  useEffect(() => {
    const storedAnswers = selectedAnswers[questionKey];
    if (storedAnswers) {
      setAnswers(storedAnswers);

      const used = Object.values(storedAnswers).filter(Boolean);
      setUsedAnswers(used);

      // Remove used words from the word bank
      setWordBank(info.wordBank.filter((word) => !used.includes(word)));
    }
  }, [selectedAnswers, questionKey, info.wordBank]);

  useEffect(() => {
    // If there are pending answers, record them after render
    if (pendingAnswers) {
      recordAnswer(questionKey, pendingAnswers);
      setPendingAnswers(null); // Reset pending answers after recording
    }
  }, [pendingAnswers, questionKey, recordAnswer]);

  const handleDrop = (answer, row, col) => {
    const cellKey = `${row}-${col}`;

    // Log before handling the drop
    //console.log("Dropping word", answer, "into cell", cellKey);

    setAnswers((prevAnswers) => {
      if (reviewMode || prevAnswers[cellKey] !== "") {
        console.log("Drop ignored - cell already filled or in review mode.");
        return prevAnswers;
      }

      const updated = { ...prevAnswers, [cellKey]: answer };
      setPendingAnswers(updated);

      // Only update wordBank and usedAnswers on successful drop
      setUsedAnswers((prevUsed) => {
        if (!prevUsed.includes(answer)) {
          return [...prevUsed, answer];
        }
        return prevUsed;
      });

      setWordBank((prevWordBank) =>
        prevWordBank.filter((item) => item !== answer)
      );

      return updated;
    });
  };

  const handleRemove = (row, col, word) => {
    const cellKey = `${row}-${col}`;

    // Log before updating the state
    //console.log("Removing word from cell", cellKey, word);

    // Remove the word from the answers state
    const updatedAnswers = { ...answers };
    updatedAnswers[cellKey] = ""; // Clear the cell
    setAnswers(updatedAnswers);

    // Remove word from the usedAnswers
    setUsedAnswers((prevUsed) => prevUsed.filter((answer) => answer !== word));

    // Add the word back to the word bank
    setWordBank((prevWordBank) => [...prevWordBank, word]);

    // Ensure word is re-added to the word bank even if it was already there
    setWordBank((prevWordBank) => {
      if (!prevWordBank.includes(word)) {
        return [...prevWordBank, word];
      }
      return prevWordBank;
    });
    recordAnswer(questionKey, updatedAnswers);

    // Log after state update
    //console.log("Updated answers after removal:", updatedAnswers);
  };

  // Filter available answers to show unused words in the word bank
  const availableAnswers = useMemo(() => {
    return wordBank.filter((word) => !usedAnswers.includes(word));
  }, [usedAnswers, wordBank]);

  return (
    <div>
      <Row
        style={{
          minHeight: "120px",
          marginBottom: "30px",
        }}
      >
        <p>
          <strong>Word Bank:</strong>
        </p>
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem" }}
        >
          {availableAnswers.map((answer) =>
            reviewMode ? (
              <div
                key={answer}
                style={{
                  cursor: "not-allowed",
                  padding: "5px 10px",
                  margin: "5px",
                  border: "2px solid #13275e",
                  borderRadius: "10px",
                  backgroundColor: "#dbe3ee",
                  color: "#13275e",
                  fontWeight: "bold",
                  opacity: 0.5, // Make it look disabled
                }}
              >
                {answer}
              </div>
            ) : (
              <DraggableItem key={answer} answer={answer} onDrag={() => {}} />
            )
          )}
        </div>
      </Row>

      <div
        style={{
          overflowX: "auto",
          maxWidth: "100%", // ensures it doesn't overflow the screen
          margin: "0 auto", // optional: centers the scroll container
          textAlign: "center",
        }}
      >
        <div style={{ display: "inline-block" }}>
          <table style={{ tableLayout: "auto", width: "100%" }}>
            <thead>
              <tr>
                <th></th>
                {info.columns.map((col) => (
                  <th key={col} className="navy wide-column">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {info.rows.map((row) => (
                <tr key={row}>
                  <td className="navy" style={{ fontWeight: "bold" }}>
                    {row}
                  </td>
                  {info.columns.map((col) => {
                    const key = `${row}-${col}`;
                    return (
                      <td key={key} className="wide-column">
                        <DroppableCell
                          row={row}
                          col={col}
                          currentValue={answers[key]} // Ensure the cell value is pulled from answers
                          onDrop={handleDrop}
                          reviewMode={reviewMode}
                          correctValue={info.correctAnswers[key]}
                          onRemove={handleRemove}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableFillBlanksQuestion;
