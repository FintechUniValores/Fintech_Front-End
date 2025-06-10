import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import MainScreenHeader from '../components/MainScreenHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '../contexts/ThemeContext';
import {createCommonStyles} from '../styles/common';

type RootStackParamList = {
  PosConsult: undefined;
};

function SvrConsultScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);

  const handleConsultSVR = () => {
    // Lógica futura: Abrir a WebView com a URL do SVR do Banco Central.
    // Por enquanto, vamos navegar para a tela Pós-Consulta.
    navigation.replace('PosConsult');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader title="Consultar Valores" />
      <View style={styles.pageContainer}>
        <View style={styles.center}>
          <Text style={styles.title}>Pronto para consultar?</Text>
          <Text style={styles.subtitle}>
            Clique abaixo para ser direcionado ao site oficial do Banco Central
            e verificar se você tem valores a receber.
          </Text>
          <Text style={styles.infoText}>
            Lembre-se de retornar ao nosso aplicativo após a consulta!
          </Text>
          <PrimaryButton
            text="Ir para a Consulta no Banco Central"
            icon="arrow-right"
            width={350}
            onPress={handleConsultSVR}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => {
  const commonStyles = createCommonStyles(colors);
  return StyleSheet.create({
    ...commonStyles,
    center: {
      flex: 1,
      alignItems: 'center',
      marginTop: 150,
      paddingHorizontal: 20,
      width: '100%',
    },
    title: {
      ...commonStyles.title,
      fontSize: 24,
    },
  });
};

export default SvrConsultScreen;
