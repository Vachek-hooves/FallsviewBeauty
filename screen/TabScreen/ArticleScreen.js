import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TabLayout} from '../../components/layout';
import {BlurView} from '@react-native-community/blur';
import {Color} from '../../constant/color';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 120;

const ArticleScreen = () => {
  const navigation = useNavigation();

  const renderCard = (title, subtitle, onPress) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <BlurView style={styles.cardBlur} blurType="light" blurAmount={10}>
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <TabLayout>
      <View style={styles.container}>
        <Text style={styles.headerText}>Explore</Text>
        {renderCard('Emotional Waterfalls', "Discover nature's wonders", () =>
          navigation.navigate('EmotionalWaterfallsScreen'),
        )}
        {renderCard('Articles', 'Read interesting facts', () =>
          navigation.navigate('ArticlesListScreen'),
        )}
      </View>
    </TabLayout>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: '20%',
  },
  headerText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Color.blue,
    textAlign: 'center',
    marginBottom: 20,
    color: Color.white,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
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
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#333',
  },
});
