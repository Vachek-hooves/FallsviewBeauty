import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {TabLayout} from '../../components/layout';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {Color} from '../../constant/color';

const WelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => navigation.navigate('TabMenu'), 2000);
    });
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <TabLayout>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.contentWrapper,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <BlurView
            style={styles.blur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white">
            <View style={styles.content}>
              {/* <LinearGradient
                colors={['#4a90e2', '#63a4ff', '#1976d2']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.appNameGradient}
              > */}
              <Text style={styles.appName}>Fallsview Beauty</Text>
              {/* </LinearGradient> */}
              <Text style={styles.welcomeText}>
                Welcome to a world of possibilities!
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </TabLayout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(26, 42, 58, 0.7)', // Semi-transparent dark blue
  },
  contentWrapper: {
    width: '95%',
    // maxWidth: 350,
  },
  blur: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light background for blur effect
  },
  content: {
    alignItems: 'center',
    padding: 5,
  },
  appNameGradient: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 26,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    // color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: Color.blue,
  },
  welcomeText: {
    fontSize: 20,
    // color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 28,
    color: Color.blue,
    fontWeight: 'bold',
  },
});
