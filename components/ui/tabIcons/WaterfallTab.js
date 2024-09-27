import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const WaterfallTab = ({ focused }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
      <Image
        source={require('../../../assets/icon/tabMenu/waterfallTab.png')}
        style={styles.icon}
      />
    </View>
  );
};

export default WaterfallTab;

const styles = StyleSheet.create({
  iconContainer: {
    // width: 44,
    // height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
  focusedContainer: {
    backgroundColor: '#87CEEB', // Sky Blue
  },
  icon: {
    width: 70,
    height: 70,
  },
});
