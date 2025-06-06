import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import GovBrLoginScreen from '../screens/GovBrLoginScreen';
// import GovBrRequirementsScreen from '../screens/GovBrRequirementsScreen';
// import SvrConsultScreen from '../screens/SvrConsultScreen';

// import PosConsultScreen from '../screens/PosConsultScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GovBrLogin"
          component={GovBrLoginScreen}
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
        {/* <Stack.Screen
          name="GovBrRequirements"
          component={GovBrRequirementsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SvrConsult"
          component={SvrConsultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PosConsult"
          component={PosConsultScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen name="AuthSuccess" component={() => null} />
        <Stack.Screen name="AuthFailure" component={() => null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
