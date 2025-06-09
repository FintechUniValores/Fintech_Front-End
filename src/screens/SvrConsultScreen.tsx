import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {lightTheme} from '../config/themes';
import PrimaryButton from '../components/PrimaryButton';
import MainScreenHeader from '../components/MainScreenHeader';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  PosConsult: undefined;
};

function SvrConsultScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleConsultSVR = () => {
    // Lógica futura: Abrir a WebView com a URL do SVR do Banco Central.
    // Por enquanto, vamos navegar para a tela Pós-Consulta.
    navigation.replace('PosConsult');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader title="Consultar Valores" />
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>Pronto para consultar?</Text>
          <Text style={styles.subtitle}>
            Clique abaixo para ser direcionado ao site oficial do Banco Central
            e verificar se você tem valores a receber.
          </Text>
          <Text style={styles.info}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: lightTheme.backgroundColor,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: lightTheme.text,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: lightTheme.primary,
    marginBottom: 20,
  },
});

export default SvrConsultScreen;
