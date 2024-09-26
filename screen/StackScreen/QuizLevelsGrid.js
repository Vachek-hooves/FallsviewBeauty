import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { QuizLayout } from '../../components/layout';
import { BlurView } from '@react-native-community/blur';
import { Color } from '../../constant/color';
import { useCustomContext } from '../../store/context';

const QuizLevelsGrid = ({ navigation }) => {
  const { quizData } = useCustomContext();

  return (
    <QuizLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Quiz Levels</Text>
        <View style={styles.cardsContainer}>
          {quizData.map((quiz, index) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('QuizPlayScreen', { quizId: quiz.id })
              }
              disabled={!quiz.isActive}>
              <BlurView
                style={styles.cardBlur}
                blurType="light"
                blurAmount={20}>
                <Text style={styles.cardTitle}>{quiz.name}</Text>
                <Text style={styles.cardSubtitle}>{`Level ${index + 1}`}</Text>
                {quiz.highScore !== undefined && (
                  <Text style={styles.highScore}>High Score: {quiz.highScore}</Text>
                )}
                {!quiz.isActive && (
                  <View style={styles.lockedOverlay}>
                    <Image
                      source={require('../../assets/icon/ui/lock.png')}
                      style={{
                        width: 50,
                        height: 50,
                        tintColor: Color.white + 90,
                      }}
                    />
                  </View>
                )}
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </QuizLayout>
  );
};

export default QuizLevelsGrid;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
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
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  highScore: {
    fontSize: 12,
    color: Color.blue,
    textAlign: 'center',
    marginTop: 5,
  },
});
