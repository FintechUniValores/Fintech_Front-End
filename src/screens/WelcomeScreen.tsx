import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  GovBrLogin: undefined;
};

function WelcomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleStart = () => {
    navigation.navigate('GovBrLogin');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo_valores_a_receber.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, styles.noMarginTop]}>Resgate Fácil</Text>
        </View>

        <View style={styles.center}>
          <Text style={styles.title}>Descubra Seus Valores Esquecidos</Text>
          <Text style={styles.subtitle}>
            Simplificamos o acesso ao programa 'Valores a Receber' do Banco
            Central. Comece agora a encontrar o que é seu.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Começar Agora</Text>
        </Pressable>
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
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: 60,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoContainer: {
    width: '100%',
    aspectRatio: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    height: 250,
  },
  logo: {
    width: 250,
    height: 250,
    shadowColor: '#333333',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  center: {
    flex: 1,
    marginTop: 70,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  noMarginTop: {
    marginTop: 0,
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
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#CD0B30',
    borderRadius: 25,
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default WelcomeScreen;
