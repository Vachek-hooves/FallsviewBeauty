import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const WaterGameLayout = ({children}) => {
  return (
    <ImageBackground
      blurRadius={0}
      source={require('../../assets/img/bg/waterfall2.jpg')}
      style={{flex: 1, alignItems: 'center'}}>
      <SafeAreaView>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default WaterGameLayout;

const styles = StyleSheet.create({});
