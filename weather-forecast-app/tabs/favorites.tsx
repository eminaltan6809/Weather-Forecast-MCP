import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import LessonsScreen from './screens/LessonsScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import CodePlaygroundScreen from './screens/CodePlaygroundScreen';
import BeforeLearningScreen from './screens/BeforeLearningScreen';
import SettingsScreen from './screens/SettingsScreen';
import QuizScreen from './screens/QuizScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainApp() {
  const { colors } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'GuidetoReactNative',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={{ padding: 10 }}
              >
                <Text style={{ color: colors.textPrimary, fontSize: 24 }}>⚙️</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Lessons"
          component={LessonsScreen}
          options={{ title: 'All Lessons' }}
        />
        <Stack.Screen
          name="LessonDetail"
          component={LessonDetailScreen}
          options={({ route }) => ({
            title: `Lesson ${route.params.lessonId}`,
            headerBackTitle: 'Back'
          })}
        />
        <Stack.Screen
          name="CodePlayground"
          component={CodePlaygroundScreen}
          options={{ title: 'Code Playground' }}
        />
        <Stack.Screen
          name="BeforeLearning"
          component={BeforeLearningScreen}
          options={{ title: 'Before You Start' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Ayarlar' }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'React Native Quiz' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
