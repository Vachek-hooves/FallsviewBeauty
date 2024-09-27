import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const LogIn = ({focused}) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
      <Image
        source={require('../../../assets/icon/tabMenu/loginTab.png')}
        style={[styles.image]}
      />
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  iconContainer: {
    // width: 44,
    // height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    // resizeMode: 'contain',
  },
  focusedContainer: {
    backgroundColor: '#185519', // Pale Green
  },
});
