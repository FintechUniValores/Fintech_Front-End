import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider, useTheme} from '../contexts/ThemeContext';
import {useSession} from '../hooks/useSession';
import {ActivityIndicator, View} from 'react-native';

import WelcomeScreen from '../screens/WelcomeScreen';
import GovBrRequirementsScreen from '../screens/GovBrRequirementsScreen';
import SvrConsultScreen from '../screens/SvrConsultScreen';
import PosConsultTabNavigator from './PosConsultTabNavigator';
import SettingsScreen from '../screens/tabs/SettingsScreen';

const Stack = createStackNavigator();

function AppNavigationStack() {
  const {isLoading: isSessionLoading, sessionId} = useSession();
  const {colors} = useTheme();

  if (isSessionLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.backgroundColor,
        }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const initialRoute = sessionId ? 'PosConsult' : 'Welcome';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GovBrRequirements"
          component={GovBrRequirementsScreen}
          options={{
            headerShown: true,
            title: 'Resgate Fácil',
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerStyle: {
              shadowColor: 'transparent',
              height: 80,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SvrConsult"
          component={SvrConsultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PosConsult"
          component={PosConsultTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AuthSuccess" component={() => null} />
        <Stack.Screen name="AuthFailure" component={() => null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppNavigator() {
  return (
    <ThemeProvider>
      <AppNavigationStack />
    </ThemeProvider>
  );
}

export default AppNavigator;
