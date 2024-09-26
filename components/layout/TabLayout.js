import {View, Text, SafeAreaView, ImageBackground} from 'react-native';

const TabLayout = ({children, blur}) => {
  return (
    <ImageBackground
      blurRadius={blur}
      style={{flex: 1}}
      source={require('../../assets/img/bg/waterFall3.jpg')}>
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default TabLayout;
