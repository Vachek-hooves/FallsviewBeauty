import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TabLayout} from '../../components/layout';

const WaterDropsScreen = ({navigation}) => {
  return (
    <TabLayout>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome to Water Drops!</Text>
          <Text style={styles.subText}>Collect drops and save the planet</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WaterDropsPlayGameScreen')}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
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
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
