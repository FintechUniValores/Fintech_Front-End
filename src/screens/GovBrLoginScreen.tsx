import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import config from '../config/appConfig';
import Icon from 'react-native-vector-icons/FontAwesome6';

function GovBrLoginScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');

  const handleLoginWithGovBr = async () => {
    setLoading(true);
    try {
      // TODO: Chame o endpoint do seu backend para iniciar o fluxo Gov.br
      // Ex: const response = await axios.get(`${config.backendUrl}/oauth2/authorization/govbr`);
      // Assume que o backend retorna a URL de autorização do Gov.br
      // Por enquanto, vamos simular a URL do Gov.br diretamente para testar a WebView
      const govBrAuthUrl =
        'https://sso.acesso.gov.br/authorize?response_type=code&client_id=SEU_CLIENT_ID_GOVBR&scope=openid%20profile%20email&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fgovbr&state=algum_estado&nonce=algum_nonce';

      // A URL acima é um placeholder. O ideal é que o backend monte e retorne ela.
      // A 'redirect_uri' no parâmetro acima DEVE ser a URL do SEU BACKEND (http://localhost:8080/...)
      // que está configurada para receber o callback do Gov.br.
      // O seu backend, depois de processar, redirecionará para o Deep Link do seu app.

      setWebViewUrl(govBrAuthUrl);
      setShowWebView(true);
    } catch (error) {
      console.error('Erro ao iniciar o login Gov.br:', error);
      Alert.alert(
        'Erro',
        'Não foi possível iniciar o login Gov.br. Tente novamente.',
      );
      setLoading(false);
    }
  };

  interface NavigationState {
    url: string;
    [key: string]: any;
  }

  const onNavigationStateChange = (navState: NavigationState): void => {
    console.log('WebView Nav State:', navState.url);

    // TODO: Aqui você vai monitorar as URLs de sucesso/falha do backend
    // que o Gov.br irá redirecionar para o seu backend, e que o seu backend
    // irá redirecionar para o seu Deep Link do app.

    // Se a URL contém o esquema do nosso aplicativo (Deep Link),
    // significa que o backend nos redirecionou.
    if (
      navState.url.startsWith(config.appDeepLinkScheme) ||
      navState.url.includes(config.backendSuccessRedirectPath) ||
      navState.url.includes(config.backendFailureRedirectPath)
    ) {
      setShowWebView(false);
      setLoading(false);
    }

    // Opcional: Se houver um botão de fechar dentro da WebView, ou se a WebView for um modal,
    // você pode ter uma lógica para fechar o modal.
  };

  if (showWebView) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WebView
          source={{uri: webViewUrl}}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              size={'large'}
              color={'#CD0B30'}
              style={styles.loadingOverlay}
            />
          )}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error:', nativeEvent);
            Alert.alert(
              'Erro na WebView',
              'Não foi possível carregar a página: ' + nativeEvent.description,
            );
            setShowWebView(false);
            setLoading(false);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.divider} />
        <View style={styles.top}>
          <Text style={styles.title}>Acesso Seguro</Text>
          <Text style={styles.subtitle}>Conecte-se com sua conta Gov.br</Text>
        </View>

        {loading ? (
          <ActivityIndicator size={'large'} color={'#CD0B30'} />
        ) : (
          <View style={styles.center}>
            <Image
              source={require('../assets/govbr_logo.png')}
              style={styles.govBrLogo}
              resizeMode="contain"
            />
            <Pressable style={styles.button} onPress={handleLoginWithGovBr}>
              <Text style={styles.buttonText}>Entrar com Gov.br</Text>
              <Icon
                name="arrow-up-right-from-square"
                size={20}
                color="#CD0B30"
                style={styles.buttonIcon}
              />
            </Pressable>
          </View>
        )}
        <Text style={styles.adviser}>
          Você será redirecionado para o site oficial do Gov.br para sua
          segurança.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 90,
    marginBottom: 10,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    marginTop: -120,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  govBrLogo: {
    width: 250,
    height: 90,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#CD0B30',
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#CD0B30',
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 10,
  },
  adviser: {
    fontSize: 14,
    color: '#CD0B30',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default GovBrLoginScreen;
