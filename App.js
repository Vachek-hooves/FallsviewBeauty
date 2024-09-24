import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FallsProvider} from './store/context';
import {WaterDropsScreen, WelcomeScreen} from './screen/TabScreen';
import {
  FallsGameLevelsScreen,
  WaterDropsPlayGameScreen,
} from './screen/StackScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="WaterDropsScreen" component={WaterDropsScreen} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <FallsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TabMenu" component={TabMenu} />
          <Stack.Screen
            name="WaterDropsPlayGameScreen"
            component={WaterDropsPlayGameScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FallsProvider>
  );
}

export default App;
