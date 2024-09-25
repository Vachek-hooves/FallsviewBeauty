import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ReturnIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{alignSelf: 'flex-end', right: 70, bottom: 50}}>
      <Image
        source={require('../../../assets/icon/ui/back.png')}
        style={{height: 45, width: 45, tintColor: 'rgba(3,138,255,0.9)'}}
      />
    </TouchableOpacity>
  );
};

export default ReturnIcon;

const styles = StyleSheet.create({});
