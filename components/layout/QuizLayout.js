import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const QuizLayout = ({children}) => {
  return (
    <ImageBackground
      blurRadius={0}
      source={require('../../assets/img/bg/fantasyFall.jpg')}
      style={{flex: 1, alignItems: 'center'}}>
      <SafeAreaView>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default QuizLayout;

const styles = StyleSheet.create({});
