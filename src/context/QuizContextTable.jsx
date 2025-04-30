// src/context/QuizContextTable.jsx
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [selectedAnswers, setSelectedAnswers] = useState(() => {
        const stored = localStorage.getItem("tableSelectedAnswers");
        return stored ? JSON.parse(stored) : {};
    });  
    const [questionWordBanks, setQuestionWordBanks] = useState({});
    const [usedAnswersMap, setUsedAnswersMap] = useState({});

    useEffect(() => {
        localStorage.setItem("tableSelectedAnswers", JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    // Record answers for a specific question
    const recordAnswer_overwrite = (key, selectedAnswer) => {
        setSelectedAnswers(prev => ({
        ...prev,
        [key]: selectedAnswer,
        }));
    };

    const recordAnswer = (key, selectedAnswer) => {
        setSelectedAnswers(prev => ({
        ...prev,
        [key]: {
            ...(prev[key] || {}),     // Keep existing answers
            ...selectedAnswer,        // Add/overwrite new one
        },
        }));
    };


    // Initialize or update the word bank for a specific question
    const initializeWordBank = (questionKey, initialWordBank) => {
        setQuestionWordBanks(prev => {
        // Only initialize if it doesn't exist yet
        if (!prev[questionKey]) {
            return {
            ...prev,
            [questionKey]: initialWordBank,
            };
        }
        return prev;
        });
    };

    // Update the word bank for a specific question
    const updateWordBank = (questionKey, newWordBank) => {
        setQuestionWordBanks(prev => ({
        ...prev,
        [questionKey]: newWordBank,
        }));
    };

    // Update used answers for a specific question
    const updateUsedAnswers = (questionKey, usedAnswers) => {
        setUsedAnswersMap(prev => ({
        ...prev,
        [questionKey]: usedAnswers,
        }));
    };

    // Reset the entire quiz state
    const resetQuiz = () => {
        setSelectedAnswers({});
        setQuestionWordBanks({});
        setUsedAnswersMap({});
        localStorage.removeItem("tableSelectedAnswers");
    };

    return (
        <QuizContext.Provider value={{ 
        selectedAnswers, 
        recordAnswer, 
        resetQuiz,
        questionWordBanks,
        initializeWordBank,
        updateWordBank,
        usedAnswersMap,
        updateUsedAnswers
        }}>
        {children}
        </QuizContext.Provider>
    );
}