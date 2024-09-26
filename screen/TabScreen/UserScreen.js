import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {TabLayout} from '../../components/layout';
import {BlurView} from '@react-native-community/blur';
import {Color} from '../../constant/color';
import {useCustomContext} from '../../store/context';

const UserScreen = () => {
  const {quizData} = useCustomContext(); // Get quiz data from context
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [hasUserData, setHasUserData] = useState(false);

  useEffect(() => {
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedImage = await AsyncStorage.getItem('userImage');
      if (storedName && storedImage) {
        setName(storedName);
        setImage(storedImage);
        setHasUserData(true);
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      if (image) await AsyncStorage.setItem('userImage', image);
      setHasUserData(true);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const resetUserData = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userImage');
      setName('');
      setImage(null);
      setHasUserData(false);
    } catch (error) {
      console.error('Error resetting user data:', error);
    }
  };

  const BlurredView = ({style, children}) => (
    <View style={[style, {overflow: 'hidden'}]}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.6)"
      />
      {children}
    </View>
  );

  const renderProgressTable = () => {
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>User Progress</Text>
        <FlatList
          data={quizData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.highScore || 0}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  if (!hasUserData) {
    return (
      <TabLayout>
        <View style={styles.container}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {image ? (
              <Image source={{uri: image}} style={styles.image} />
            ) : (
              <BlurredView style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Tap to add photo</Text>
              </BlurredView>
            )}
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>
          <BlurredView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={saveUserData}>
              <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>
          </BlurredView>
        </View>
      </TabLayout>
    );
  }

  return (
    <TabLayout>
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <BlurredView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={resetUserData}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </BlurredView>
        {renderProgressTable()}
      </View>
    </TabLayout>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Color.blue,
  },
  placeholderText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Simulating blur effect
  },
  input: {
    padding: 15,
    width: '100%',
    color: '#fff',
    borderWidth: 4,
    borderColor: Color.blue,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Color.blue,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: Color.blue + 90,
    padding: 10,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: Color.blue,
    textAlign: 'center',
    marginBottom: 10,
    color: Color.white,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    fontSize: 18,
    color: '#fff',
  },
});
