import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Color} from '../../constant/color';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {ReturnIcon} from '../../components/ui/icons';

const {width} = Dimensions.get('window');

const WaterfallDetails = () => {
  const route = useRoute();
  const {waterfall} = route.params;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{uri: waterfall.image}} style={styles.image}>
        <View style={{position: 'absolute', top: '90%', right: 20}}>
          <ReturnIcon />
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{waterfall.name}</Text>
        <Text style={styles.emotion}>
          {waterfall.emotion} {waterfall.emotionEmoji}
        </Text>
        <Text style={styles.description}>{waterfall.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoText}>
            {waterfall.coordinates.latitude}, {waterfall.coordinates.longitude}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Countries:</Text>
          <Text style={styles.infoText}>{waterfall.countries.join(', ')}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: waterfall.coordinates.latitude,
              longitude: waterfall.coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: waterfall.coordinates.latitude,
                longitude: waterfall.coordinates.longitude,
              }}
              title={waterfall.name}
              description={waterfall.emotion}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

export default WaterfallDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    backgroundColor: Color.blue + 80,
  },
  image: {
    width: '100%',
    height: 250,
    // resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.blue,
    marginBottom: 10,
  },
  emotion: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.blue,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  mapContainer: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    width: width - 40,
    height: 200,
  },
});
