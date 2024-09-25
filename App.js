import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FallsProvider} from './store/context';
import {
  ArticleScreen,
  QuizIntroScreen,
  WaterDropsScreen,
  WelcomeScreen,
  UserScreen,
} from './screen/TabScreen';
import {
  WaterfallTab,
  ArticleTab,
  QuziTab,
  MelodyTab,
  LogIn,
} from './components/ui/tabIcons';
import {
  FallsGameLevelsScreen,
  QuizLevelsGrid,
  WaterDropsPlayGameScreen,
} from './screen/StackScreen';
import {View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F0F8FF'}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          title: '',
          tabBarBackground: () => (
            <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              blurType="dark"
              blurAmount={40}
              reducedTransparencyFallbackColor="white"
            />
          ),
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 10,
            right: 10,
            elevation: 5,
            borderRadius: 15,
            height: 80,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            overflow: 'hidden', // This is important for the blur effect
          },
          tabBarItemStyle: {
            height: 60,
            paddingTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen
          name="WaterDropsScreen"
          component={WaterDropsScreen}
          options={{
            tabBarIcon: ({focused}) => <WaterfallTab focused={focused} />,
          }}
        />
        <Tab.Screen
          name="QuizIntroScreen"
          component={QuizIntroScreen}
          options={{
            tabBarIcon: ({focused}) => <QuziTab focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ArticleScreen"
          component={ArticleScreen}
          options={{
            tabBarIcon: ({focused}) => <ArticleTab focused={focused} />,
          }}
        />
        <Tab.Screen
          name="UserScreen"
          component={UserScreen}
          options={{
            tabBarIcon: ({focused}) => <LogIn focused={focused} />,
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
          <Stack.Screen name="QuizLevelsGrid" component={QuizLevelsGrid} />
        </Stack.Navigator>
      </NavigationContainer>
    </FallsProvider>
  );
}

export default App;
