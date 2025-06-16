import {StyleSheet} from 'react-native';
import {Theme} from '../config/themes';

export const createCommonStyles = (colors: Theme) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    pageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 15,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      textAlign: 'center',
    },
    infoText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    card: {
      backgroundColor: colors.cardBackgroundColor,
      borderRadius: 15,
      padding: 20,
      width: '100%',
      marginBottom: 20,
      shadowColor: '#333333',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
  });
};
