import React from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {lightTheme} from '../config/themes';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ScreenHeader from '../components/ScreenHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '../contexts/ThemeContext';
import {createCommonStyles} from '../styles/common';

type RootStackParamList = {
  GovBrLogin: undefined;
};

function GovBrRequirementsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContainer}>
        <ScreenHeader
          title="Atenção!"
          subtitle="Sua conta Gov.br precisa de ajustes"
        />
        <View style={styles.center}>
          <Text style={styles.paragraph}>
            Para acessar o Sistema Valores a Receber (SVR) do Banco Central, sua
            conta Gov.br precisa ser nível Prata ou Ouro e ter a autenticação de
            2 fatores habilitada.
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Como elevar o nível da sua conta
            </Text>
            <Text style={styles.cardText}>1. Abra o app Gov.br.</Text>
            <Text style={styles.cardText}>
              2. Valide sua face ou cadastre-se via banco credenciado.
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('GovBrLogin');
              }}
              style={styles.cardButton}>
              <Text
                style={[styles.cardButtonText, {color: lightTheme.primary}]}>
                Mais detalhes
              </Text>
              <Icon
                name="arrow-right"
                size={15}
                color={lightTheme.primary}
                style={styles.iconRight}
              />
            </Pressable>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Habilitar 2 Fatores (2FA)</Text>
            <Text style={styles.cardText}>
              1. No app Gov.br, vá em 'Segurança'.
            </Text>
            <Text style={styles.cardText}>
              2. Ative a 'Verificação em duas etapas’.
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('GovBrLogin');
              }}
              style={styles.cardButton}>
              <Text
                style={[styles.cardButtonText, {color: lightTheme.primary}]}>
                Mais detalhes
              </Text>
              <Icon
                name="arrow-right"
                size={15}
                color={lightTheme.primary}
                style={styles.iconRight}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => {
  const commonStyles = createCommonStyles(colors);
  return StyleSheet.create({
    ...commonStyles,
    pageContainer: {
      ...commonStyles.pageContainer,
      paddingHorizontal: 0,
    },
    center: {
      alignItems: 'center',
      paddingVertical: 80,
      paddingHorizontal: 20,
      width: '100%',
    },
    paragraph: {
      fontSize: 16,
      color: lightTheme.text,
      lineHeight: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: lightTheme.text,
      marginBottom: 10,
    },
    cardText: {
      fontSize: 16,
      color: lightTheme.text,
      lineHeight: 24,
      marginBottom: 10,
    },
    cardButton: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardButtonText: {
      fontSize: 16,
      color: lightTheme.primary,
    },
    iconRight: {
      marginLeft: 5,
    },
  });
};

export default GovBrRequirementsScreen;
