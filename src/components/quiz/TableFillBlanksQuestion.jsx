import React, { useState, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { QuizContext } from "../../context/QuizContextTable";

const ItemType = "ANSWER";

// Draggable item for the word bank
function DraggableItem({ answer, onDrag }) {
  const [{ isDragging }, drag] = useDrag(() => ({
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
        opacity: isDragging ? 0.5 : 1,
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
    drop: (item) => {
        if (!reviewMode && currentValue === "") {
          onDrop(item.answer, row, col);
        }
      },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
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
            backgroundColor: "rgba(1,1,1,0)",
            color: "black",
          }}
        >
          🗑️
        </button>
      )}
    </div>
  );
}

function TableFillBlanksQuestion({ info, questionKey, reviewMode }) {
  const { 
    selectedAnswers, 
    recordAnswer, 
    questionWordBanks, 
    initializeWordBank, 
    updateWordBank,
    usedAnswersMap,
    updateUsedAnswers
  } = useContext(QuizContext);
  
  // Get the saved answers for this question or initialize empty
  const initialAnswers = selectedAnswers[questionKey] || {};

  // Track answers in the table
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
  console.log("initial answers", answers);

  // Initialize word bank from context or use the initial value
  const [wordBank, setWordBank] = useState(() => {
    return questionWordBanks[questionKey] || [...info.wordBank];
  });

  // Initialize used answers from context or derive from existing answers
  const [usedAnswers, setUsedAnswers] = useState(() => {
    if (usedAnswersMap[questionKey]) {
      return [...usedAnswersMap[questionKey]];
    } else {
      // If no used answers in context, derive from answers
      return Object.values(initialAnswers).filter(Boolean);
    }
  });

  // Track if we've loaded from context to prevent recreation of initial state
  const [loadedFromContext, setLoadedFromContext] = useState(false);

  // Effect to initialize context when component mounts
  useEffect(() => {
    // Only initialize once when the component mounts
    if (!loadedFromContext) {
      // Initialize word bank if not already in context
      if (!questionWordBanks[questionKey]) {
        // Calculate initial word bank by removing words already in answers
        const usedWords = Object.values(initialAnswers).filter(Boolean);
        const initialWordBank = info.wordBank.filter(word => !usedWords.includes(word));
        initializeWordBank(questionKey, initialWordBank);
        setWordBank(initialWordBank);
      }

      // Initialize used answers if not already in context
      if (!usedAnswersMap[questionKey]) {
        const usedWords = Object.values(initialAnswers).filter(Boolean);
        updateUsedAnswers(questionKey, usedWords);
        setUsedAnswers(usedWords);
      }
      
      setLoadedFromContext(true);
    }
  }, [
    questionKey, 
    info.wordBank, 
    questionWordBanks, 
    initializeWordBank, 
    usedAnswersMap, 
    updateUsedAnswers, 
    initialAnswers, 
    loadedFromContext
  ]);

  // Effect to load data from context when context changes (e.g., navigation back to this component)
  useEffect(() => {
    // Skip during initial mounting
    if (loadedFromContext) {
      // Load answers from context
      const storedAnswers = selectedAnswers[questionKey] || {};
      const currentAnswersJson = JSON.stringify(answers);
      const storedAnswersJson = JSON.stringify(storedAnswers);
      
      if (storedAnswersJson !== currentAnswersJson) {
        setAnswers(storedAnswers);
      }
      
      // Load word bank from context
      const storedWordBank = questionWordBanks[questionKey];
      if (storedWordBank) {
        setWordBank(storedWordBank);
      }
      
      // Load used answers from context
      const storedUsedAnswers = usedAnswersMap[questionKey];
      if (storedUsedAnswers) {
        setUsedAnswers(storedUsedAnswers);
      }
    }
  }, [selectedAnswers, questionWordBanks, usedAnswersMap, questionKey, loadedFromContext]);

  const handleDrop = (answer, row, col) => {
    const cellKey = `${row}-${col}`;

    console.log("answers in handleDrop", answers);
  
    if (reviewMode || answers[cellKey] !== "") {
      console.log("❌ Drop ignored - cell already filled or in review mode.");
      return;
    }
  
    // 1. Update table answers
    const updatedAnswers = { ...answers, [cellKey]: answer };
    setAnswers(updatedAnswers);
    recordAnswer(questionKey, { [cellKey]: answer }); // ✅ just update that cell
    console.log("✅ Dropped answer:", answer);
    console.log("🧩 updatedAnswers:", updatedAnswers);
  
    // 2. Update used answers
    const currentUsed = [...usedAnswers, answer];
    const newUsed = Object.values(updatedAnswers).filter(Boolean);
    setUsedAnswers(newUsed);
    updateUsedAnswers(questionKey, newUsed);
    console.log("🧠 updated usedAnswers:", newUsed);
  
    // 3. Update word bank (remove the answer)
    const newWordBank = wordBank.filter(word => word !== answer);
    setWordBank(newWordBank);
    updateWordBank(questionKey, newWordBank);
    console.log("🧃 updated wordBank:", newWordBank);
  };
  

  const handleRemove = (row, col, word) => {
    const cellKey = `${row}-${col}`;

    // Remove the word from the answers state
    const updatedAnswers = { ...answers };
    updatedAnswers[cellKey] = ""; // Clear the cell
    setAnswers(updatedAnswers);
    
    // Update context with the removed word
    recordAnswer(questionKey, updatedAnswers);

    // Check if the word is used elsewhere in the table
    const isWordUsedElsewhere = Object.values(updatedAnswers).some(value => value === word);
    
    if (!isWordUsedElsewhere) {
      // Remove word from the usedAnswers only if it's not used elsewhere
      const updatedUsed = usedAnswers.filter(answer => answer !== word);
      setUsedAnswers(updatedUsed);
      updateUsedAnswers(questionKey, updatedUsed);
      
      // Add the word back to the word bank if it's not already there
      if (!wordBank.includes(word)) {
        const updatedWordBank = [...wordBank, word];
        setWordBank(updatedWordBank);
        updateWordBank(questionKey, updatedWordBank);
      }
    }
  };

  // Handle drag without drop (word returns to word bank)
  const handleDragEnd = (answer, wasDropped = true) => {
    if (!wasDropped) {
      // Word was not dropped, nothing to do
      console.log("Word returned to bank:", answer);
    }
  };

  return (
    <div>
      <p><strong>Word Bank:</strong></p>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem" }}>
        {wordBank.map((answer) => (
          <DraggableItem
            key={answer}
            answer={answer}
            onDrag={handleDragEnd}
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
                      currentValue={answers[key]}
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