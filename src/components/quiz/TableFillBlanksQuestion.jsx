import React, { useState, useContext, useEffect, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { QuizContext } from "../../context/QuizContextTable";

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
          // If drop is unsuccessful, return to the word bank
          onDrag(item.answer, false); // Pass a flag to indicate to return the word
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
          padding: "5px",
          margin: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
          cursor: "grab",
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
    drop: (item) => onDrop(item.answer, row, col),
    canDrop: () => !reviewMode && currentValue === "", // Prevent dropping in review mode
  }));

  let displayValue = currentValue || "";
  let style = {
    width: "150px",
    height: "50px",
    border: "1px solid #ccc",
    margin: "5px",
    textAlign: "center",
    lineHeight: "50px",
    backgroundColor: isOver ? "#e0f7fa" : "white",
  };

  // Only apply these styles if in reviewMode
  if (reviewMode) {
    if (currentValue === correctValue) {
      style.backgroundColor = "#d0f0c0"; // Green for correct answer
      displayValue = `✅ ${currentValue}`;
    } else if (currentValue) {
      style.backgroundColor = "#f8d7da"; // Red for incorrect answer
      displayValue = `❌ ${currentValue}`;
    }
  }

  return (
    <div ref={drop} style={style}>
      {displayValue}
      {currentValue && !reviewMode && (
        <button
          onClick={() => onRemove(row, col, currentValue)}
          style={{
            marginLeft: "5px",
            fontSize: "10px",
            padding: "2px 5px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "#f44336",
            color: "white",
          }}
        >
          Remove
        </button>
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
    // If there are pending answers, record them after render
    if (pendingAnswers) {
      recordAnswer(questionKey, pendingAnswers);
      setPendingAnswers(null); // Reset pending answers after recording
    }
  }, [pendingAnswers, questionKey, recordAnswer]);

  const handleDrop = (answer, row, col) => {
    if (reviewMode) return;

    const cellKey = `${row}-${col}`;

    // Update the answers state
    setAnswers((prevAnswers) => {
      if (prevAnswers[cellKey] !== "") return prevAnswers; // don't overwrite existing answer

      const updated = { ...prevAnswers, [cellKey]: answer };

      // Set the pending answers to be recorded after render
      setPendingAnswers(updated);

      return updated;
    });

    // Track used answers
    setUsedAnswers((prevUsed) => {
      if (!prevUsed.includes(answer)) {
        return [...prevUsed, answer];
      }
      return prevUsed;
    });

    // Remove the answer from the word bank
    setWordBank((prevWordBank) =>
      prevWordBank.filter((item) => item !== answer)
    );
  };

  const handleRemove = (row, col, word) => {
    const cellKey = `${row}-${col}`;

    // Remove the word from the answers state and place the word back in the word bank
    const updatedAnswers = { ...answers };
    updatedAnswers[cellKey] = ""; // Clear the cell
    setAnswers(updatedAnswers);

    // Remove word from the used answers and place it back in the word bank
    setUsedAnswers((prevUsed) => prevUsed.filter((answer) => answer !== word));
    setWordBank((prevWordBank) => [...prevWordBank, word]);
  };

  // Filter available answers to show unused words in the word bank
  const availableAnswers = useMemo(() => {
    return wordBank.filter((word) => !usedAnswers.includes(word));
  }, [usedAnswers, wordBank]);

  return (
    <div>
      <p><strong>Word Bank:</strong></p>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem" }}>
        {availableAnswers.map((answer) => (
          <DraggableItem
            key={answer}
            answer={answer}
            onDrag={(answer) => handleDrop(answer)}
          />
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            {info.columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {info.rows.map((row) => (
            <tr key={row}>
              <td>{row}</td>
              {info.columns.map((col) => {
                const key = `${row}-${col}`;
                return (
                  <td key={key}>
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
  );
}

export default TableFillBlanksQuestion;
