import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {QuizLayout} from '../../components/layout';
import {BlurView} from '@react-native-community/blur';
import {Color} from '../../constant/color';
import {useCustomContext} from '../../store/context';
import {ReturnIcon} from '../../components/ui/icons';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 120;

const QuizLevelsGrid = ({navigation}) => {
  const {quizData, waterDropsTotalScore, checkAndUnlockQuizLevels, updateWaterDropsTotalScore} = useCustomContext();

  const handleUnlock = (quizId, index) => {
    if (waterDropsTotalScore >= 400) {
      checkAndUnlockQuizLevels();
      updateWaterDropsTotalScore(waterDropsTotalScore - 400);
      Alert.alert(
        "Quiz Level Unlocked",
        "You've successfully unlocked this quiz level! 400 Water Drops have been deducted.",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Not Enough Score",
        `You need 400 Water Drops score to unlock this level. You currently have ${waterDropsTotalScore} Water Drops.`,
        [{ text: "OK" }]
      );
    }
  };

  const renderQuizCard = ({item, index}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.isActive && navigation.navigate('QuizPlayScreen', {quizId: item.id})}
      disabled={!item.isActive}>
      <BlurView style={styles.cardBlur} blurType="light" blurAmount={10}>
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{`Level ${index + 1}`}</Text>
          </View>
          {item.highScore !== undefined && (
            <View style={styles.highScoreContainer}>
              <Text style={styles.highScoreText}>High Score</Text>
              <Text style={styles.highScoreValue}>{item.highScore}</Text>
            </View>
          )}
          {!item.isActive && (
            <View style={styles.lockedOverlay}>
              <Image
                source={require('../../assets/icon/ui/lock.png')}
                style={styles.lockIcon}
              />
              {waterDropsTotalScore >= 400 && (
                <TouchableOpacity
                  style={styles.unlockButton}
                  onPress={() => handleUnlock(item.id, index)}>
                  <Text style={styles.unlockButtonText}>Unlock (400 Drops)</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <QuizLayout>
      <View style={styles.container}>
        <Text style={styles.headerText}>Quiz Levels</Text>
        <Text style={styles.scoreText}>Water Drops: {waterDropsTotalScore}</Text>
        <FlatList
          data={quizData}
          renderItem={renderQuizCard}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <View style={{height:50}}></View>
      </View>
      <ReturnIcon />
    </QuizLayout>
  );
};

export default QuizLevelsGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    alignSelf: 'center',
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
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 5,
    // textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#333',
  },
  highScoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  highScoreText: {
    fontSize: 12,
    color: Color.blue,
    fontWeight: 'bold',
  },
  highScoreValue: {
    fontSize: 18,
    color: Color.blue,
    fontWeight: 'bold',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    width: 40,
    height: 40,
    tintColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  unlockButton: {
    backgroundColor: Color.blue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  unlockButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 10,
  },
});
