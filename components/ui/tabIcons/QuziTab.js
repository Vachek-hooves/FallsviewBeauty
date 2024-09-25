import { StyleSheet, View, Image } from 'react-native';
import React from 'react';

const QuziTab = ({ focused }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
      <Image
        source={require('../../../assets/icon/tabMenu/quizTab.png')}
        style={styles.icon}
      />
    </View>
  );
};

export default QuziTab;

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedContainer: {
    backgroundColor: '#FFA07A', // Light Salmon
  },
  icon: {
    width: 60,
    height: 60,
  },
});
