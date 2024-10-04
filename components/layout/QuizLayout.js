import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const QuizLayout = ({children, blur}) => {
  return (
    <ImageBackground
      blurRadius={blur}
      // source={require('../../assets/img/bg/fantasyFall.jpg')}
      source={require('../../assets/img/newBg/bg.png')}
      style={{flex: 1, alignItems: 'center'}}>
      <SafeAreaView>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default QuizLayout;

const styles = StyleSheet.create({});
