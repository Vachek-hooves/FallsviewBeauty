import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FallsProvider} from './store/context';
import {WelcomeScreen} from './screen/TabScreen';
import {FallsGameLevelsScreen} from './screen/StackScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="FallsGameLevelsScreen.js"
        component={FallsGameLevelsScreen}
      />
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
          <Stack.Screen name="WelcomeScreee" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FallsProvider>
  );
}

export default App;
