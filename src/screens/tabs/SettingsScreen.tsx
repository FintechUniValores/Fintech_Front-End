import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useTheme} from '../../contexts/ThemeContext';

const SettingsHeader = ({title, colors}: {title: string; colors: any}) => {
  const navigation = useNavigation();

  return (
    <View style={headerStyles(colors).headerContainer}>
      <Image
        source={require('../../assets/background.png')}
        style={headerStyles(colors).backgroundImage}
        resizeMode="cover"
      />
      <View style={headerStyles(colors).headerContent}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Icon name="arrow-back" size={28} color={colors.white} />
        </Pressable>
        <Text style={headerStyles(colors).headerTitle}>{title}</Text>
        <View style={{width: 28}} />
      </View>
    </View>
  );
};

function SettingsScreen() {
  const {theme, colors, toggleTheme} = useTheme();
  const navigation = useNavigation();
  const styles = createStyles(colors, theme);

  const handleLogout = () => {
    console.log('Logout Pressionado');
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SettingsHeader title="Configurações" colors={colors} />

      <View style={styles.container}>
        <Pressable style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.buttonText}>
            {theme === 'light'
              ? 'Habilitar Tema Escuro'
              : 'Habilitar Tema Claro'}
          </Text>
          <Icon
            name={theme === 'light' ? 'moon' : 'sunny'}
            size={22}
            color={colors.white}
            style={styles.iconStyle}
          />
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
          <Icon
            name="log-out-outline"
            size={22}
            color={theme === 'light' ? colors.primary : colors.white}
            style={styles.iconStyle}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, theme: 'light' | 'dark') =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    headerContainer: {
      height: 120,
      backgroundColor: colors.primary,
      justifyContent: 'flex-end',
      paddingBottom: 20,
    },
    backgroundImage: {
      width: '100%',
      height: 250,
      position: 'absolute',
      top: -70,
      left: 0,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      width: '100%',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    themeButton: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      marginBottom: 'auto',
      marginTop: 60,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: colors.primary,
      marginBottom: 40,
    },
    logoutButtonText: {
      color: theme === 'light' ? colors.primary : colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    iconStyle: {
      marginLeft: 10,
    },
  });

const headerStyles = (colors: any) =>
  StyleSheet.create({
    headerContainer: {height: 120, width: '100%', justifyContent: 'center'},
    backgroundImage: {
      width: '100%',
      height: 250,
      position: 'absolute',
      top: -70,
      left: 0,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 40,
    },
    headerTitle: {fontSize: 24, fontWeight: 'bold', color: colors.white},
  });

export default SettingsScreen;
