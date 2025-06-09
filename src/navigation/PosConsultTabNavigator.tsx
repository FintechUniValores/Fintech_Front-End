import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';

import {useTheme} from '../contexts/ThemeContext';

import GuideScreen from '../screens/tabs/GuideScreen';
import BankProductsScreen from '../screens/tabs/BankProductsScreen';
import FAQsScreen from '../screens/tabs/FAQsScreen';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (
  route: RouteProp<any, any>,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName: string = '';

  if (route.name === 'Guia') {
    iconName = focused ? 'document-text' : 'document-text-outline';
  } else if (route.name === 'Meu Banco') {
    iconName = focused ? 'wallet' : 'wallet-outline';
  } else if (route.name === 'Dúvidas') {
    iconName = focused ? 'help-circle' : 'help-circle-outline';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

function PosConsultTabNavigator() {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          renderTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.cardBackgroundColor,
          borderTopColor: colors.cardBackgroundColor,
          height: 65,
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Guia" component={GuideScreen} />
      <Tab.Screen name="Meu Banco" component={BankProductsScreen} />
      <Tab.Screen name="Dúvidas" component={FAQsScreen} />
    </Tab.Navigator>
  );
}

export default PosConsultTabNavigator;
