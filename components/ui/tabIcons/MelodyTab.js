import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const MelodyTab = () => {
  return (
    <Image
      source={require('../../../assets/icon/tabMenu/melodyTab.png')}
      style={{width: 30, height: 30}}
    />
  );
};

export default MelodyTab;

const styles = StyleSheet.create({});
