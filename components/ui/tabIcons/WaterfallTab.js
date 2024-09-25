import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const WaterfallTab = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/icon/tabMenu/waterfallTab.png')}
        style={{width: 45, height: 45}}
      />
    </View>
  );
};

export default WaterfallTab;

const styles = StyleSheet.create({});
