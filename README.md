# 📸 Exposure Explorer (COMS W4170 UI Design Final Project)

**Group Members:** Dhruv Yalamanchi, Joyce Li, Stephanie Jung, Gabriel Trigo

**Exposure Explorer** is an interactive web app that helps users intuitively learn the core concepts of manual photography (**Aperture**, **Shutter Speed**, and **ISO**) through simulations, sliders, quizzes, and cheat sheets.

---

## ✨ Features

- 🧠 **Learn Settings**: Step-by-step interactive modules explaining Aperture, Shutter Speed, and ISO with visual sliders and image comparisons.
- 🎮 **Interactive Simulator**: Explore how different combinations of settings affect exposure in real-time.
- 📝 **Quiz Mode**: Test your understanding through visually engaging questions.
- 📋 **Cheat Sheet**: Handy presets for common photo scenarios like Portraits, Landscapes, and Night Photography.
- 💾 **Progress Tracking**: Your learning progress is saved using persistent session memory.
- 🫧 **Clean UI**: Styled with React Bootstrap, FontAwesome, and custom animations for a modern, polished experience.

---

## 🚀 Getting Started

### Clone the Repository

```
git clone https://github.com/code1word/Exposure-Explorer.git
cd Exposure-Explorer
```

---

## ⚙️ Backend Setup (Flask + OpenCV)

### 📦 Install dependencies

Ensure Python 3.8+ is installed.

```
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python backend/app.py
```

Flask will then run at:  
`http://localhost:3000`

---

## 💻 Frontend Setup (React)

```
npm install
npm run dev
```

React will run at: `http://localhost:5173`. Make sure Flask is running in parallel for full functionality.

---

## 🧱 Tech Stack

### Frontend

- **React** (with `react-bootstrap` for layout)
- **FontAwesome** icons
- **RC-Slider** for intuitive setting adjustments
- **Custom CSS animations**

### Backend

- **Flask** (Python microframework)
- **Flask-CORS** for API access from React
- **OpenCV (cv2)** for image simulation and manipulation
- **Session-backed progress tracking**
