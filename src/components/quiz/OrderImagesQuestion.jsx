// src/components/quiz/OrderImagesQuestion.jsx

import React, { useContext, useState, useEffect } from "react";
import { QuizContext } from "../../context/QuizContextOrderImages";

function OrderImagesQuestion({ info, questionKey, reviewMode = false }) {
  const { selectedOrder, recordOrder } = useContext(QuizContext);

  // Initialize with saved order or the default image order
  const [currentOrder, setCurrentOrder] = useState(
    selectedOrder[questionKey] || info.images
  );
  {/*console.log("currentOrder", currentOrder);*/}

  const [draggedIndex, setDraggedIndex] = useState(null);

  // Update local state if context changes (e.g. when navigating back)
  useEffect(() => {
    if (selectedOrder[questionKey]) {
      setCurrentOrder(selectedOrder[questionKey]);
    } else {
      setCurrentOrder(info.images);
    }
  }, [selectedOrder, questionKey, info.images]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const newOrder = [...currentOrder];
    const [draggedImage] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedImage);
    setCurrentOrder(newOrder);
    recordOrder(questionKey, newOrder);
    setDraggedIndex(null);
  };

  const getStatus = () => {
    if (!reviewMode) return null;
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(info.correctOrder);
    return isCorrect ? "✅ Correct Order!" : "❌ Incorrect Order";
  };

  return (
    <div>
      <div style={{ marginTop: "70px", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {currentOrder.map((imgSrc, index) => (
          <div
            key={imgSrc}
            draggable={!reviewMode}
            onDragStart={(e) => {
                if (reviewMode) {
                  e.preventDefault();
                  return;
                }
                handleDragStart(index);
              }}
              onDragOver={(e) => {
                if (!reviewMode) e.preventDefault();
              }}
              onDrop={(e) => {
                if (!reviewMode) handleDrop(index);
              }}
            style={{
              border: "2px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem",
              backgroundColor: reviewMode ? "#f9f9f9" : "#fff",
              cursor: reviewMode ? "default" : "grab",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={imgSrc}
              alt={`ordered-img-${index}`}
              style={{ width: "150px", height: "auto", borderRadius: "6px" }}
            />
          </div>
        ))}
      </div>

      {reviewMode && (
        <div style={{ marginTop: "1rem", textAlign: "center", fontWeight: "bold" }}>
          {getStatus()}
        </div>
      )}
    </div>
  );
}

export default OrderImagesQuestion;
