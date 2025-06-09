import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {Linking} from 'react-native';
import {useNavigationContainerRef} from '@react-navigation/native';

export default function App() {
  const navigationRef = useNavigationContainerRef();

  const HandleDeepLink = async event => {
    const url = event?.url || (await Linking.getInitialURL());

    if (url) {
      console.log('Deep link URL:', url);

      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      const params = new URLSearchParams(parsedUrl.search);

      if (path.includes('auth-success') || url.includes('auth-success')) {
        const token = params.get('token');
        console.log('Autenticação Gov.br bem-sucedida! Token:', token);
        // TODO: Salvar o token, fazer chamada ao backend para verificar perfil Gov.br,
        // e navegar para a tela apropriada (GovBrRequirements ou PosConsult)
        if (navigationRef.isReady()) {
          navigationRef.navigate('SvrConsult');
        }
      } else if (
        path.includes('auth-failure') ||
        url.includes('auth-failure')
      ) {
        const error = params.get('error');
        console.error('Autenticação Gov.br falhou:', error);
        // TODO: Exibir uma mensagem de erro ou navegar para uma tela de erro
        if (navigationRef.isReady()) {
          navigationRef.navigate('Login', {errorMessage: error});
        }
      }
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then(url => HandleDeepLink({url}));

    const subscription = Linking.addEventListener('url', HandleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [navigationRef]);

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#F31D5D'} />
      <AppNavigator ref={navigationRef} />
    </>
  );
}
