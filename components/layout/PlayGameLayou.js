import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PlayGameLayou = ({children}) => {
  return (
    <ImageBackground
      source={require('../../assets/img/bg/fallGame.jpg')}
      //   source={require('../../assets/img/bg/fall.png')}

      style={styles.image}>
      {children}
    </ImageBackground>
  );
};

export default PlayGameLayou;

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderStartColor: 'black',
  },
});
