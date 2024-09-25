import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { QuizLayout } from '../../components/layout';
import { BlurView } from '@react-native-community/blur';
import { QuizData } from '../../data/quizData';
import { Color } from '../../constant/color';

const { width, height } = Dimensions.get('window');

const QuizPlayScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnims = useRef([]).current;

  useEffect(() => {
    const quiz = QuizData.find(q => q.id === quizId);
    setCurrentQuiz(quiz);
    if (quiz) {
      bounceAnims.length = quiz.questions[0].options.length;
      bounceAnims.fill(new Animated.Value(1));
    }
  }, [quizId]);

  useEffect(() => {
    if (currentQuiz) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Reset bounce animations for new question
      bounceAnims.forEach((anim, index) => {
        bounceAnims[index] = new Animated.Value(1);
      });
    }
  }, [currentQuestionIndex, currentQuiz]);

  const handleAnswer = (selected, index) => {
    if (!currentQuiz) return;

    setSelectedAnswer(selected);
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const correct = selected === currentQuestion.answer;
    setIsAnswerCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }

    Animated.sequence([
      Animated.timing(bounceAnims[index], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnims[index], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(() => {
      if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    fadeAnim.setValue(0);
    bounceAnims.forEach((anim, index) => {
      bounceAnims[index] = new Animated.Value(1);
    });
  };

  if (!currentQuiz) return null;

  if (showResult) {
    return (
      <QuizLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <BlurView style={styles.resultCard} blurType="light" blurAmount={20}>
            <Text style={styles.resultText}>Quiz Completed!</Text>
            <Text style={styles.scoreText}>Your Score: {score}/{currentQuiz.questions.length}</Text>
            <TouchableOpacity style={styles.button} onPress={restartQuiz}>
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back to Levels</Text>
            </TouchableOpacity>
          </BlurView>
        </ScrollView>
      </QuizLayout>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <QuizLayout>
      <View style={styles.container}>
        <BlurView style={styles.headerBlur} blurType="dark" blurAmount={10}>
          <Text style={styles.quizTitle}>{currentQuiz.name}</Text>
        </BlurView>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }]} />
          </View>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}
          </Text>
        </View>

        <Text style={styles.scoreText}>Score: {score}</Text>
        
        <BlurView style={styles.questionCard} blurType="light" blurAmount={20}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </BlurView>

        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <Animated.View 
              key={index} 
              style={[
                styles.optionCardContainer,
                { 
                  opacity: fadeAnim, 
                  transform: [{ scale: bounceAnims[index] || new Animated.Value(1) }] 
                }
              ]}
            >
              <TouchableOpacity 
                style={[
                  styles.optionCard,
                  selectedAnswer === option && (isAnswerCorrect ? styles.correctAnswer : styles.wrongAnswer)
                ]} 
                onPress={() => handleAnswer(option, index)}
                disabled={selectedAnswer !== null}
              >
                <BlurView 
                  style={styles.optionBlur} 
                  blurType="light" 
                  blurAmount={20}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </BlurView>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        {isAnswerCorrect !== null && (
          <Text style={[styles.feedbackText, isAnswerCorrect ? styles.correctFeedback : styles.wrongFeedback]}>
            {isAnswerCorrect ? 'Correct!' : 'Wrong!'}
          </Text>
        )}
      </View>
    </QuizLayout>
  );
};

export default QuizPlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  headerBlur: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    zIndex: 1,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.white,
    textAlign: 'center',
  },
  progressBarContainer: {
    marginTop: 80,
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: Color.blue,
    borderRadius: 5,
  },
  questionNumber: {
    fontSize: 16,
    color: Color.blue,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 20,
    height: height * 0.2, // Fixed height
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
  },
  optionsContainer: {
    flexGrow: 1,
  },
  optionCardContainer: {
    marginBottom: 10,
  },
  optionCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  optionBlur: {
    padding: 15,
  },
  optionText: {
    fontSize: 16,
    color: Color.blue,
    textAlign: 'center',
  },
  correctAnswer: {
    borderColor: 'green',
    borderWidth: 2,
  },
  wrongAnswer: {
    borderColor: 'red',
    borderWidth: 2,
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  correctFeedback: {
    color: 'green',
  },
  wrongFeedback: {
    color: 'red',
  },
  resultCard: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Color.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
