import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizData as initialQuizData } from '../data/quizData';

export const FallsContext = createContext({});

export const FallsProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(initialQuizData);
  const [waterDropsTotalScore, setWaterDropsTotalScore] = useState(0);

  useEffect(() => {
    loadQuizData();
    loadWaterDropsTotalScore();
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

  const loadWaterDropsTotalScore = async () => {
    try {
      const totalScore = await AsyncStorage.getItem('totalScore');
      if (totalScore !== null) {
        setWaterDropsTotalScore(parseInt(totalScore));
      }
    } catch (error) {
      console.error('Error loading Water Drops total score:', error);
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

  const updateWaterDropsTotalScore = async (newScore) => {
    try {
      await AsyncStorage.setItem('totalScore', newScore.toString());
      setWaterDropsTotalScore(newScore);
    } catch (error) {
      console.error('Error updating Water Drops total score:', error);
    }
  };

  const checkAndUnlockQuizLevels = () => {
    const updatedQuizData = quizData.map((quiz, index) => {
      if (index > 0 && !quiz.isActive && waterDropsTotalScore >= 400 * index) {
        return { ...quiz, isActive: true };
      }
      return quiz;
    });
    saveQuizData(updatedQuizData);
  };

  const value = {
    quizData,
    waterDropsTotalScore,
    updateQuizProgress,
    unlockNextLevel,
    updateWaterDropsTotalScore,
    checkAndUnlockQuizLevels,
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
