import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import {PlayGameLayou, WaterGameLayout} from '../../components/layout';
import {ReturnIcon} from '../../components/ui/icons';

const {width, height} = Dimensions.get('window');

const WaterDropsPlayGameScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [drops, setDrops] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setGameOver(true);
      // Navigate back to WaterDropScreen after a short delay
      setTimeout(() => {
        navigation.navigate('WaterDropsScreen'); // Adjust the screen name as needed
      }, 2000); // 2 seconds delay to show the score
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const dropInterval = setInterval(() => {
        const newDrop = {
          id: Math.random().toString(),
          x: Math.random() * (width * 0.9),
          y: 0,
        };
        setDrops(prev => [...prev, newDrop]);
      }, 800);

      return () => clearInterval(dropInterval);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const fallInterval = setInterval(() => {
        setDrops(prev =>
          prev
            .map(drop => ({
              ...drop,
              y: drop.y + 2,
            }))
            .filter(drop => drop.y < height * 0.65),
        );
      }, 1);

      return () => clearInterval(fallInterval);
    }
  }, [timeLeft]);

  const handleCatch = id => {
    setDrops(prev => prev.filter(drop => drop.id !== id));
    setScore(prev => prev + 10);
  };

  return (
    // <View style={styles.container}>
    <WaterGameLayout>
      {gameOver ? (
        <Text style={styles.finalScore}>Game Over! Your Score: {score}</Text>
      ) : (
        <>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.timer}>
              Time Left:{' '}
              <Text style={{color: timeLeft <= 10 ? 'red' : 'white'}}>
                {timeLeft}
              </Text>
              s
            </Text>
          </View>
          <View style={styles.gameField}>
            {/* <PlayGameLayou> */}
            {drops.map(drop => (
              <TouchableOpacity
                key={drop.id}
                style={[styles.drop, {left: drop.x, top: drop.y}]}
                onPress={() => handleCatch(drop.id)}>
                <Image
                  source={require('../../assets/img/gameImg/waterDrop.png')}
                  style={{width: 35, height: 35}}
                />
              </TouchableOpacity>
            ))}
            {/* </PlayGameLayou> */}
          </View>
          <ReturnIcon />
        </>
      )}
    </WaterGameLayout>
    // </View>
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
  gameField: {
    width: width * 0.95,
    height: height * 0.75,
    // backgroundColor: '#e0f7fa',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
  },
  drop: {
    width: 30,
    height: 30,
    borderRadius: 10,
    // backgroundColor: '#007aff',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  finalScore: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
