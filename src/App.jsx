import React from "react";
import { Routes, Route } from "react-router-dom";
import OurNavbar from "./components/Navbar";
import Home from "./components/Home";
import LearnSettings from "./components/LearnSettings";
import PracticeMode from "./components/PracticeMode";
import InteractiveSim from "./components/InteractiveSim";
import Aperture from "./components/Aperture";
import ShutterSpeed from "./components/ShutterSpeed";
import ISO from "./components/ISO";
import CheatSheet from "./components/CheatSheet";
import CheatSheetDetail from "./components/cheatsheet/CheatSheetDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import PortraitSettings from "./components/cheatsheet/PortraitSettings";

import QuizQuestion from "./components/quiz/QuizQuestion";
import QuizResults from "./components/quiz/QuizResults";


function App() {
  return (
    <div>
      <OurNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnSettings />} />
        <Route path="/learn/aperture" element={<Aperture />} />
        <Route path="/learn/shutter" element={<ShutterSpeed />} />
        <Route path="/learn/iso" element={<ISO />} />
        <Route path="/practice" element={<PracticeMode />} />
        <Route path="/simulator" element={<InteractiveSim />} />
        <Route path="/learn/cheatsheet" element={<CheatSheet />} />
        <Route path="/learn/cheatsheet/:type" element={<CheatSheetDetail />} />
        <Route path="/learn/practice/:type" element={<QuizQuestion />} />
        <Route path="/learn/practice/results" element={<QuizResults />} />
        <Route path="/learn/portrait" element={<PortraitSettings />} />

      </Routes>
    </div>
  );
}

export default App;
