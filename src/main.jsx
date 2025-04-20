// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QuizProvider as MultipleChoiceProvider } from "./context/QuizContextMultipleChoice";
import { QuizProvider as TableProvider } from "./context/QuizContextTable";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MultipleChoiceProvider>
        <TableProvider>
        <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </TableProvider>
          
      </MultipleChoiceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
