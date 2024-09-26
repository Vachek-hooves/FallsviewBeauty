import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabLayout} from '../../components/layout';
import {BlurView} from '@react-native-community/blur';
import {Color} from '../../constant/color';
import {useCustomContext} from '../../store/context';

const WaterDropsScreen = ({navigation}) => {
  const {quizData} = useCustomContext(); // Get quiz data from context
  const [userData, setUserData] = useState(null);
  const [showUserCard, setShowUserCard] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetchUserData();
    calculateTotalScore();
  }, []);

  const fetchUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const image = await AsyncStorage.getItem('userImage');
      if (name && image) {
        setUserData({name, image});
        setShowUserCard(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const calculateTotalScore = () => {
    const score = quizData.reduce((acc, quiz) => acc + (quiz.highScore || 0), 0);
    setTotalScore(score);
  };

  return (
    <TabLayout>
      <View style={styles.container}>
        {showUserCard && userData && (
          <View style={styles.userCard}>
            <Image source={{uri: userData.image}} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userScore}>Quiz Total Score: {totalScore}</Text>
            </View>
          </View>
        )}
        <BlurView style={styles.headerBlur} blurType="light" blurAmount={20}>
          <Text style={styles.welcomeText}>Welcome to Water Drops!</Text>
        </BlurView>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('WaterDropsPlayGameScreen')}>
            <BlurView style={styles.cardBlur} blurType="light" blurAmount={20}>
              <Image
                style={styles.cardIcon}
                source={require('../../assets/icon/tabMenu/waterfallTab.png')}
              />
              <Text style={styles.cardTitle}>Play Drops</Text>
              <Text style={styles.cardSubtitle}>Collect water drops</Text>
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('QuizLevelsGrid')}>
            <BlurView style={styles.cardBlur} blurType="light" blurAmount={20}>
              <Image
                style={styles.cardIcon}
                source={require('../../assets/icon/tabMenu/quizTab.png')}
              />
              <Text style={styles.cardTitle}>Play Quiz</Text>
              <Text style={styles.cardSubtitle}>Test your knowledge</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </TabLayout>
  );
};

export default WaterDropsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userCard: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.blue,
  },
  userScore: {
    fontSize: 14,
    color: '#333',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '48%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardIcon: {
    width: 90,
    height: 100,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  headerBlur: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
