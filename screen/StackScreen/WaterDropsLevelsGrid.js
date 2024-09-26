import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WaterDropsGame} from '../../data/waterDropsData';
import {Color} from '../../constant/color';
import {useFocusEffect} from '@react-navigation/native';
import {WaterGameLayout} from '../../components/layout';
import { ReturnIcon } from '../../components/ui/icons';

const WaterDropsLevelsGrid = ({navigation, route}) => {
  const [levels, setLevels] = useState(WaterDropsGame);

  const loadLevelsData = useCallback(async () => {
    try {
      const savedLevels = await AsyncStorage.getItem('waterDropsLevels');
      if (savedLevels !== null) {
        setLevels(JSON.parse(savedLevels));
      } else {
        // If no saved levels, initialize with WaterDropsGame
        await AsyncStorage.setItem(
          'waterDropsLevels',
          JSON.stringify(WaterDropsGame),
        );
        setLevels(WaterDropsGame);
      }
    } catch (error) {
      console.error('Error loading levels data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLevelsData();
    }, [loadLevelsData]),
  );

  const handleLevelPress = level => {
    if (level.unlocked) {
      navigation.navigate('WaterDropsPlayGameScreen', {level: level});
    }
  };

  const renderLevelCard = ({item}) => (
    <TouchableOpacity
      style={[styles.card, !item.unlocked && styles.lockedCard]}
      onPress={() => handleLevelPress(item)}
      disabled={!item.unlocked}>
      <Text style={styles.levelText}>Level {item.level}</Text>
      <Text style={styles.scoreText}>High Score: {item.highScore}</Text>
    </TouchableOpacity>
  );

  return (
    <WaterGameLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Water Drops Levels</Text>
        <FlatList
          data={levels}
          renderItem={renderLevelCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
      <ReturnIcon/>
    </WaterGameLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    alignItems: 'center',
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: Color.blue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  lockedCard: {
    backgroundColor: '#ccc',
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scoreText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
});

export default WaterDropsLevelsGrid;
