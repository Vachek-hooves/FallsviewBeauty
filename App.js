import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FallsProvider} from './store/context';
import {
  ArticleScreen,
  QuizIntroScreen,
  WaterDropsScreen,
  WelcomeScreen,
} from './screen/TabScreen';
import {
  WaterfallTab,
  ArticleTab,
  QuziTab,
  MelodyTab,
} from './components/ui/tabIcons';
import {
  FallsGameLevelsScreen,
  WaterDropsPlayGameScreen,
} from './screen/StackScreen';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          title: '',
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: 60,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          },
          tabBarItemStyle: {
            height: 60,
            padding: 0,
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Tab.Screen
          name="WaterDropsScreen"
          component={WaterDropsScreen}
          options={{
            tabBarIcon: ({ focused }) => <WaterfallTab focused={focused} />,
          }}
        />
        <Tab.Screen
          name="QuizIntroScreen"
          component={QuizIntroScreen}
          options={{
            tabBarIcon: ({ focused }) => <QuziTab focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ArticleScreen"
          component={ArticleScreen}
          options={{
            tabBarIcon: ({ focused }) => <ArticleTab focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </View>
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
