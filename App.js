import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FallsProvider} from './store/context';
import {WelcomeScreen} from './screen/TabScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <FallsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="WelcomeScreee" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FallsProvider>
  );
}

export default App;
