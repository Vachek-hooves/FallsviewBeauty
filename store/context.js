import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizData as initialQuizData } from '../data/quizData';

export const FallsContext = createContext({});

export const FallsProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(initialQuizData);

  useEffect(() => {
    // Load saved quiz data from AsyncStorage when the app starts
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      const savedQuizData = await AsyncStorage.getItem('quizData');
      if (savedQuizData !== null) {
        setQuizData(JSON.parse(savedQuizData));
      }
    } catch (error) {
      console.error('Error loading quiz data:', error);
    }
  };

  const saveQuizData = async (newQuizData) => {
    try {
      await AsyncStorage.setItem('quizData', JSON.stringify(newQuizData));
      setQuizData(newQuizData);
    } catch (error) {
      console.error('Error saving quiz data:', error);
    }
  };

  const updateQuizProgress = (quizId, score) => {
    const updatedQuizData = quizData.map(quiz => 
      quiz.id === quizId ? { ...quiz, highScore: Math.max(quiz.highScore || 0, score) } : quiz
    );
    saveQuizData(updatedQuizData);
  };

  const unlockNextLevel = (currentQuizId) => {
    const currentIndex = quizData.findIndex(quiz => quiz.id === currentQuizId);
    if (currentIndex < quizData.length - 1) {
      const updatedQuizData = [...quizData];
      updatedQuizData[currentIndex + 1].isActive = true;
      saveQuizData(updatedQuizData);
    }
  };

  const value = {
    quizData,
    updateQuizProgress,
    unlockNextLevel,
  };

  return (
    <FallsContext.Provider value={value}>{children}</FallsContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(FallsContext);
  if (!context) {
    throw new Error('useCustomContext must be used within a FallsProvider');
  }
  return context;
};
