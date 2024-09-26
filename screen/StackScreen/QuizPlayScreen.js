import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {QuizLayout} from '../../components/layout';
import {BlurView} from '@react-native-community/blur';
import {Color} from '../../constant/color';
import {useCustomContext} from '../../store/context';

const {width, height} = Dimensions.get('window');

const QuizPlayScreen = ({route, navigation}) => {
  const {quizId} = route.params;
  const {quizData, updateQuizProgress, unlockNextLevel} = useCustomContext();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnims = useRef([]).current;
  const shakeAnims = useRef([]).current;

  useEffect(() => {
    const quiz = quizData.find(q => q.id === quizId);
    setCurrentQuiz(quiz);
    if (quiz) {
      const optionsCount = quiz.questions[0].options.length;
      bounceAnims.length = optionsCount;
      shakeAnims.length = optionsCount;
      bounceAnims.fill(new Animated.Value(1));
      shakeAnims.fill(new Animated.Value(0));
    }
  }, [quizId, quizData]);

  useEffect(() => {
    if (currentQuiz) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Reset animations for new question
      bounceAnims.forEach((_, index) => {
        bounceAnims[index] = new Animated.Value(1);
        shakeAnims[index] = new Animated.Value(0);
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
    } else {
      Animated.sequence([
        Animated.timing(shakeAnims[index], {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnims[index], {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnims[index], {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnims[index], {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Mark the current question as answered
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        updateQuizProgress(quizId, score + (correct ? 1 : 0));
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
    setAnsweredQuestions([]);
    fadeAnim.setValue(0);
    bounceAnims.forEach((_, index) => {
      bounceAnims[index] = new Animated.Value(1);
      shakeAnims[index] = new Animated.Value(0);
    });
  };

  const handleUnlockNextLevel = () => {
    unlockNextLevel(quizId);
    navigation.navigate('QuizLevelsGrid');
  };

  const renderProgressBar = () => {
    if (!currentQuiz) return null;
    const totalQuestions = currentQuiz.questions.length;
    const sectionWidth = 100 / totalQuestions;

    return (
      <View style={styles.progressBarContainer}>
        {currentQuiz.questions.map((_, index) => (
          <View
            key={index}
            style={[styles.progressSection, {width: `${sectionWidth}%`}]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: answeredQuestions.includes(index) ? '100%' : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>
    );
  };

  if (!currentQuiz) return null;

  if (showResult) {
    return (
      <QuizLayout blur={100}>
        <ScrollView contentContainerStyle={styles.containerResults}>
          <BlurView style={styles.resultCard} blurType="light" blurAmount={20}>
            <Text style={styles.resultText}>Quiz Completed!</Text>
            <Text style={styles.scoreText}>
              Your Score: {score}/{currentQuiz.questions.length}
            </Text>
            <TouchableOpacity style={styles.button} onPress={restartQuiz}>
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back to Levels</Text>
            </TouchableOpacity>
            {score >= 9 &&
              quizData[quizData.findIndex(q => q.id === quizId) + 1]
                ?.isActive === false && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUnlockNextLevel}>
                  <Text style={styles.buttonText}>Unlock Next Level</Text>
                </TouchableOpacity>
              )}
          </BlurView>
        </ScrollView>
      </QuizLayout>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <QuizLayout blur={100}>
      <View style={styles.container}>
        <BlurView style={styles.headerBlur} blurType="dark" blurAmount={10}>
          <Text style={styles.quizTitle}>{currentQuiz.name}</Text>
        </BlurView>

        {renderProgressBar()}

        <Text style={styles.questionNumber}>
          Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}
        </Text>

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
                  transform: [
                    {scale: bounceAnims[index] || new Animated.Value(1)},
                    {translateX: shakeAnims[index] || new Animated.Value(0)},
                  ],
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedAnswer === option &&
                    (isAnswerCorrect
                      ? styles.correctAnswer
                      : styles.wrongAnswer),
                ]}
                onPress={() => handleAnswer(option, index)}
                disabled={selectedAnswer !== null}>
                <BlurView
                  style={styles.optionBlur}
                  blurType="dark"
                  blurAmount={20}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswer === option &&
                        (isAnswerCorrect
                          ? styles.correctOptionText
                          : styles.wrongOptionText),
                    ]}>
                    {option}
                  </Text>
                </BlurView>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        {isAnswerCorrect !== null && (
          <Text
            style={[
              styles.feedbackText,
              isAnswerCorrect ? styles.correctFeedback : styles.wrongFeedback,
            ]}>
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
    // paddingTop: 40,
    // zIndex: 1,
    borderRadius: 12,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.white,
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 18,
    // backgroundColor: '#e0e0e0',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 80,
    marginBottom: 10,
  },
  progressSection: {
    height: '100%',
    // borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Color.blue,
    borderRadius: 20,
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
    padding: 10,
    height: height * 0.18, // Fixed height
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 22,
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
    fontSize: 22,
    color: Color.white,
    textAlign: 'center',
  },
  correctOptionText: {
    color: 'green',
  },
  wrongOptionText: {
    color: 'red',
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
    position: 'absolute',
    top: height * 0.25,
    left: '45%',
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
    // alignItems: 'center',
    height: '50%',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Color.blue,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerResults: {
    width: '100%',
    flex: 1,
    marginTop: height*0.2
  },
});
