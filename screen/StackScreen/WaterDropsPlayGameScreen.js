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
import { createNextLevel } from '../../data/waterDropsData';

const { width, height } = Dimensions.get('window');

const WaterDropsPlayGameScreen = ({ route, navigation }) => {
  const { level } = route.params;
  const [drops, setDrops] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(false);

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
      }, 1000 - (level.speed * 50));

      return () => clearInterval(dropInterval);
    }
  }, [timeLeft, level.speed]);

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

  const createDrop = () => {
    const dropType = Math.random();
    if (dropType < 0.1) {
      return {
        id: Math.random().toString(),
        x: Math.random() * (width * 0.9),
        y: 0,
        type: 'bonus',
        speed: 3 + level.speed,
      };
    } else if (dropType < 0.2) {
      return {
        id: Math.random().toString(),
        x: Math.random() * (width * 0.9),
        y: 0,
        type: 'penalty',
        speed: 4 + level.speed,
      };
    } else {
      return {
        id: Math.random().toString(),
        x: Math.random() * (width * 0.9),
        y: 0,
        type: 'normal',
        speed: 2 + level.speed,
      };
    }
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
    setScore(prev => Math.max(0, prev + pointsEarned));
  };

  const endGame = async () => {
    setGameOver(true);
    try {
      const savedLevels = await AsyncStorage.getItem('waterDropsLevels');
      let levels = savedLevels ? JSON.parse(savedLevels) : WaterDropsGame;
      
      const currentLevelIndex = levels.findIndex(l => l.id === level.id);
      const updatedLevels = [...levels];
      
      // Update current level
      updatedLevels[currentLevelIndex] = {
        ...updatedLevels[currentLevelIndex],
        highScore: Math.max(updatedLevels[currentLevelIndex].highScore, score),
      };

      // If score is 100 or more, create and unlock next level
      if (score >= 100) {
        if (currentLevelIndex === levels.length - 1) {
          const nextLevel = createNextLevel(level);
          updatedLevels.push(nextLevel);
        } else {
          updatedLevels[currentLevelIndex + 1].unlocked = true;
        }
      }

      await AsyncStorage.setItem('waterDropsLevels', JSON.stringify(updatedLevels));
      
      // Update total score
      const currentTotalScore = await AsyncStorage.getItem('totalScore');
      const newTotalScore = (parseInt(currentTotalScore) || 0) + score;
      await AsyncStorage.setItem('totalScore', newTotalScore.toString());
    } catch (error) {
      console.error('Error saving level data:', error);
    }
    setTimeout(() => {
      navigation.navigate('WaterDropsLevelsGrid', { refresh: true });
    }, 3000);
  };

  return (
    <WaterGameLayout>
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.finalScore}>Game Over!</Text>
          <Text style={styles.finalScore}>Your Score: {score}</Text>
        </View>
      ) : (
        <>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.timer}>
              Time Left: <Text style={{color: timeLeft <= 5 ? 'red' : 'white'}}>{timeLeft}</Text>s
            </Text>
            <Text style={styles.level}>Level: {level.level}</Text>
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
});
