import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import MainScreenHeader from '../components/MainScreenHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '../contexts/ThemeContext';
import {createCommonStyles} from '../styles/common';
import {WebView} from 'react-native-webview';

type RootStackParamList = {
  PosConsult: undefined;
};

function SvrConsultScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const [isLoadingWebView, setIsLoadingWebView] = useState(true);

  const handleShowWebView = () => {
    setWebViewVisible(true);
  };

  const handleCloseWebView = () => {
    setWebViewVisible(false);
    setIsLoadingWebView(true);
  };

  const handleNavigateToPosConsult = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'PosConsult'}],
    });
  };

  if (isWebViewVisible) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <MainScreenHeader
          title="Consulta no Banco Central"
          icon="xmark"
          onIconPress={handleCloseWebView}
        />
        <View style={styles.webViewContainer}>
          <WebView
            source={{uri: 'https://valoresareceber.bcb.gov.br/publico'}}
            onLoadStart={() => setIsLoadingWebView(true)}
            onLoadEnd={() => setIsLoadingWebView(false)}
          />
          {isLoadingWebView && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color={colors.primary}
            />
          )}
          <View style={styles.footer}>
            <PrimaryButton
              text="Voltar para o App"
              icon="arrow-right"
              width={350}
              onPress={handleNavigateToPosConsult}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
            onPress={handleShowWebView}
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
    webViewContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      paddingBottom: 30,
      marginTop: -60,
    },
    loadingIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
    },
  });
};

export default SvrConsultScreen;
