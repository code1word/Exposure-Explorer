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
  
    return (
      <div
        style={{
          backgroundColor: isCorrect ? "#d0f0c0" : "#f8d7da",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {isCorrect ? "✅ Correct Order!" : "❌ Incorrect Order"}
      </div>
    );
  };

  return (
    <div className="container mt-5">
  {/* Small screen: show lowest label above */}
  <div className="text-center fw-bold d-xl-none d-lg-none mb-3">
    Lowest<br />Shutter Speed
  </div>

  <div className="row align-items-center">
    {/* XL screen: Lowest label on the left */}
    <div className="col-xl-2 col-lg-2 d-none d-xl-block d-lg-block text-center fw-bold">
      Lowest<br />Shutter Speed
    </div>

    {/* Images */}
    {currentOrder.map((imgSrc, index) => (
      <div
        key={imgSrc}
        className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mb-3 d-flex justify-content-center"
        style={{
            cursor: reviewMode ? "default" : "grab", // make whole column droppable
          }}
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
      >
        <img
          src={imgSrc}
          alt={`ordered-img-${index}`}
          style={{
            width: "100%",
            maxWidth: "210px",
            height: "auto",
            borderRadius: "6px",
            border: "2px solid #ccc",
            padding: "0.5rem",
          }}
        />
      </div>
    ))}

    {/* XL screen: Highest label on the right */}
    <div className="col-xl-2 col-lg-2 d-none d-xl-block d-lg-block text-center fw-bold">
      Highest<br />Shutter Speed
    </div>
  </div>

  {/* Small screen: show highest label below */}
  <div className="text-center fw-bold d-xl-none d-lg-none mt-3">
    Highest<br />Shutter Speed
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
