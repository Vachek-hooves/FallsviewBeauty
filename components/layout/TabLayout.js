import {View, Text, SafeAreaView, ImageBackground} from 'react-native';

const TabLayout = ({children}) => {
  return (
    <ImageBackground style={{flex: 1, backgroundColor: 'pink'}}>
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default TabLayout;
