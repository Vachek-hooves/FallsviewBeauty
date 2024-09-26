import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WaterIcon = () => {
  return (
    <Image
      source={require('../../../../assets/img/gameImg/waterDrop.png')}
      style={{width: 30, height: 30}}
    />
  );
};

export default WaterIcon;

const styles = StyleSheet.create({});
