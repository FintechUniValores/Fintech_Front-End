import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useTheme} from '../contexts/ThemeContext';
import {useSession} from '../hooks/useSession';
import {authenticatedFetch} from '../services/api';
import {createCommonStyles} from '../styles/common';
import uuid from 'react-native-uuid';

import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';

interface InstructionalCard {
  title: string;
  steps: string[];
}

type RootStackParamList = {
  SvrConsult: undefined;
};

function GovBrRequirementsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {sessionId, createSession} = useSession();

  const [cards, setCards] = useState<InstructionalCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ensureSessionAndFetch = async () => {
      let id = sessionId;
      if (!id) {
        id = uuid.v4() as string;
        await createSession(id);
      }
      setIsLoading(true);
      authenticatedFetch('/content/gov-requirements', {}, id)
        .then(data => {
          setCards(data);
        })
        .catch(error => {
          console.error('Erro ao buscar requisitos do Gov.br:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    ensureSessionAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    return (
      <>
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            {card.steps.map((step, stepIndex) => (
              <Text key={stepIndex} style={styles.cardText}>
                {step}
              </Text>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContainer}>
        <ScreenHeader title="Atenção!" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.paragraph}>
            Para acessar o Sistema Valores a Receber (SVR) do Banco Central, sua
            conta Gov.br precisa ser nível Prata ou Ouro e ter a autenticação de
            2 fatores habilitada.
          </Text>

          {renderContent()}
        </ScrollView>
        <PrimaryButton
          text="Entendi"
          icon="arrow-right"
          onPress={() => {
            navigation.navigate('SvrConsult');
          }}
        />
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
      justifyContent: 'space-between',
      paddingHorizontal: 0,
      paddingTop: 0,
    },
    scrollContainer: {
      ...commonStyles.scrollContainer,
      marginTop: 80,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    paragraph: {
      ...commonStyles.paragraph,
      marginBottom: 30,
    },
    card: {
      ...commonStyles.card,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    cardText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 10,
    },
  });
};

export default GovBrRequirementsScreen;
