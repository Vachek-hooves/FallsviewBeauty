import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayGameLayou, WaterGameLayout } from '../../components/layout';
import { ReturnIcon } from '../../components/ui/icons';
import { WaterDropsGame } from '../../data/waterDropsData';

const { width, height } = Dimensions.get('window');

const WaterDropsPlayGameScreen = () => {
  const navigation = useNavigation();
  const [drops, setDrops] = useState([]);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [nextLevelThreshold, setNextLevelThreshold] = useState(100);

  useEffect(() => {
    loadHighScore();
    loadTotalScore();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      endGame();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const dropInterval = setInterval(() => {
        const newDrop = createDrop();
        setDrops(prev => [...prev, newDrop]);
      }, 1000 - (level * 50));

      return () => clearInterval(dropInterval);
    }
  }, [timeLeft, level]);

  useEffect(() => {
    if (timeLeft > 0) {
      const fallInterval = setInterval(() => {
        setDrops(prev =>
          prev
            .map(drop => ({
              ...drop,
              y: drop.y + drop.speed,
            }))
            .filter(drop => drop.y < height * 0.65),
        );
      }, 16);

      return () => clearInterval(fallInterval);
    }
  }, [timeLeft]);

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('highScore');
      if (savedHighScore !== null) {
        setHighScore(parseInt(savedHighScore));
      }
    } catch (error) {
      console.error('Error loading high score:', error);
    }
  };

  const saveHighScore = async (newHighScore) => {
    try {
      await AsyncStorage.setItem('highScore', newHighScore.toString());
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  };

  const loadTotalScore = async () => {
    try {
      const savedTotalScore = await AsyncStorage.getItem('totalScore');
      if (savedTotalScore !== null) {
        setTotalScore(parseInt(savedTotalScore));
      }
    } catch (error) {
      console.error('Error loading total score:', error);
    }
  };

  const saveTotalScore = async (newTotalScore) => {
    try {
      await AsyncStorage.setItem('totalScore', newTotalScore.toString());
    } catch (error) {
      console.error('Error saving total score:', error);
    }
  };

  const calculateNextLevelThreshold = (currentLevel) => {
    return 100 + (currentLevel - 1) * 50; // Starts at 100, increases by 50 each level
  };

  const handleCatch = (id, type) => {
    setDrops(prev => prev.filter(drop => drop.id !== id));
    let pointsEarned = 0;
    switch (type) {
      case 'normal':
        pointsEarned = 10;
        break;
      case 'bonus':
        pointsEarned = 50;
        break;
      case 'penalty':
        pointsEarned = -20;
        break;
    }

    const newScore = Math.max(0, score + pointsEarned);
    setScore(newScore);
    setTotalScore(prev => prev + pointsEarned);
    updateLevelProgress(pointsEarned);
  };

  const updateLevelProgress = (points) => {
    const newProgress = levelProgress + points;
    if (newProgress >= nextLevelThreshold) {
      setLevel(prev => prev + 1);
      setLevelProgress(newProgress - nextLevelThreshold);
      const newThreshold = calculateNextLevelThreshold(level + 1);
      setNextLevelThreshold(newThreshold);
      setTimeLeft(prev => prev + 15); // Add 15 seconds for each level up
      Alert.alert('Level Up!', `You've reached level ${level + 1}!`);
    } else {
      setLevelProgress(newProgress);
    }
  };

  const createDrop = () => {
    const dropType = Math.random();
    if (dropType < 0.1) {
      return {
        id: Math.random().toString(),
        x: Math.random() * (width * 0.9),
        y: 0,
        type: 'bonus',
        speed: 3 + level,
      };
    } else if (dropType < 0.2) {
      return {
        id: Math.random().toString(),
        x: Math.random() * (width * 0.9),
        y: 0,
        type: 'penalty',
        speed: 4 + level,
      };
    } else {
      return {
        id: Math.random().toString(),
        x: Math.random() * (width * 0.9),
        y: 0,
        type: 'normal',
        speed: 2 + level,
      };
    }
  };

  const endGame = () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }
    saveTotalScore(totalScore);
    setTimeout(() => {
      navigation.navigate('WaterDropsScreen');
    }, 3000);
  };

  return (
    <WaterGameLayout>
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.finalScore}>Game Over!</Text>
          <Text style={styles.finalScore}>Your Score: {score}</Text>
          <Text style={styles.finalScore}>High Score: {highScore}</Text>
          <Text style={styles.finalScore}>Total Score: {totalScore}</Text>
        </View>
      ) : (
        <>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
            <Text style={styles.timer}>
              Time Left: <Text style={{color: timeLeft <= 5 ? 'red' : 'white'}}>{timeLeft}</Text>s
            </Text>
            <Text style={styles.level}>Level: {level}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(levelProgress / nextLevelThreshold) * 100}%` }]} />
            <Text style={styles.progressText}>{levelProgress} / {nextLevelThreshold}</Text>
          </View>
          <View style={styles.gameField}>
            {drops.map(drop => (
              <TouchableOpacity
                key={drop.id}
                style={[styles.drop, {left: drop.x, top: drop.y}]}
                onPress={() => handleCatch(drop.id, drop.type)}>
                <Image
                  source={
                    drop.type === 'bonus'
                      ? require('../../assets/img/gameImg/bonusDrop.png')
                      : drop.type === 'penalty'
                      ? require('../../assets/img/gameImg/penaltyDrop.png')
                      : require('../../assets/img/gameImg/waterDrop.png')
                  }
                  style={{width: 35, height: 35}}
                />
              </TouchableOpacity>
            ))}
          </View>
          <ReturnIcon />
        </>
      )}
    </WaterGameLayout>
  );
};

export default WaterDropsPlayGameScreen;

const styles = StyleSheet.create({
  scoreContainer: {
    backgroundColor: 'rgba(3,138,255,0.8)',
    borderRadius: 12,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  timer: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  level: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  gameField: {
    width: width * 0.95,
    height: height * 0.75,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
  },
  drop: {
    width: 30,
    height: 30,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  finalScore: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  totalScore: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
