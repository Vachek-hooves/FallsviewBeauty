import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabLayout } from '../../components/layout';

const WaterDropsScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [showUserCard, setShowUserCard] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const image = await AsyncStorage.getItem('userImage');
      if (name && image) {
        setUserData({ name, image });
        setShowUserCard(true);
        // setTimeout(() => setShowUserCard(false), 5000); // Hide card after 5 seconds
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <TabLayout>
      <View style={styles.container}>
        {showUserCard && userData && (
          <View style={styles.userCard}>
            <Image source={{ uri: userData.image }} style={styles.userImage} />
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
        )}
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
    shadowColor: "#000",
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
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
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
