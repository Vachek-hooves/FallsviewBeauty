import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TabLayout} from '../../components/layout';

const WaterDropsScreen = ({navigation}) => {
  return (
    <TabLayout>
      <Text>WaterDropsScreen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('WaterDropsPlayGameScreen')}>
        <Text>Collect water drops</Text>
      </TouchableOpacity>
    </TabLayout>
  );
};

export default WaterDropsScreen;

const styles = StyleSheet.create({});
