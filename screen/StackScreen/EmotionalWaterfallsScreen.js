import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {EmotionalFalls} from '../../data/EmotionalFallse';
import {Color} from '../../constant/color';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {StackLayout, TabLayout} from '../../components/layout';
import {ReturnIcon} from '../../components/ui/icons';

const EmotionalWaterfallsScreen = () => {
  const navigation = useNavigation();

  const renderWaterfallCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WaterfallDetail', {waterfall: item})}>
      <BlurView style={styles.cardBlur} blurType="light" blurAmount={10}>
        <Image source={{uri: item.image}} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardEmotion}>
            {item.emotion} {item.emotionEmoji}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <TabLayout blur={200}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Emotional Waterfalls</Text>
        <FlatList
          data={EmotionalFalls}
          renderItem={renderWaterfallCard}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <View style={{height: 50}}></View>
      </View>
      <ReturnIcon />
    </TabLayout>
  );
};

export default EmotionalWaterfallsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#f0f0f0',
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
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    height: 200,
  },
  cardBlur: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 5,
  },
  cardEmotion: {
    fontSize: 14,
    color: '#666',
  },
});
