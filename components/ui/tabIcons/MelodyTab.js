import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../../constant/color';

const MelodyTab = ({isPlay}) => {
  return (
    <View
      style={{
        // padding: 10,
        backgroundColor: !isPlay ? Color.white : null,
        borderRadius: 22,
      }}>
      <Image
        source={require('../../../assets/icon/tabMenu/melodyTab.png')}
        style={{
          width: 60,
          height: 60,
          tintColor: !isPlay ? Color.blue : Color.stop,
        }}
      />
    </View>
  );
};

export default MelodyTab;

const styles = StyleSheet.create({});
