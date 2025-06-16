import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createCommonStyles} from '../../styles/common';
import MainScreenHeader from '../../components/MainScreenHeader';
import {useTheme} from '../../contexts/ThemeContext';
import {Theme} from '../../config/themes';
import {useSession} from '../../hooks/useSession';
import {authenticatedFetch} from '../../services/api';

type RootStackParamList = {
  Settings: undefined;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQAccordionItemProps {
  item: FAQ;
  colors: Theme;
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({item, colors}) => {
  const [expanded, setExpanded] = useState(false);
  const styles = createStyles(colors);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <Pressable style={styles.accordionHeader} onPress={toggleExpand}>
        <Icon
          name="information-circle-outline"
          size={24}
          color={colors.primary}
        />
        <Text style={styles.accordionTitle}>{item.title}</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={colors.primary}
        />
      </Pressable>
      {expanded && (
        <View style={styles.accordionContent}>
          {item.steps.map((step, index) => (
            <Text key={index} style={styles.accordionText}>
              {`• ${step}`} {/* Adiciona um marcador de item de lista */}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

interface FAQ {
  title: string;
  steps: string[];
}

function FAQsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {sessionId} = useSession();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setIsLoadingApi(true);
      authenticatedFetch('/content/faqs', {}, sessionId)
        .then((data: FAQ[]) => {
          setFaqs(data);
        })
        .catch(error => {
          console.error('Erro ao buscar FAQs:', error);
          setFaqs([]);
        })
        .finally(() => {
          setIsLoadingApi(false);
        });
    } else {
      setIsLoadingApi(false);
      setFaqs([]);
    }
  }, [sessionId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader
        title="Perguntas Frequentes"
        icon="gear"
        onIconPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.pageContainer}>
        {isLoadingApi ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{marginTop: 50}}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Valores a Receber</Text>
            <Text style={styles.subtitle}>
              Valores que você têm direito a receber de bancos e instituições
              financeiras.
            </Text>
            {faqs.map((faqItem, index) => (
              <FAQAccordionItem key={index} item={faqItem} colors={colors} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) => {
  const commonStyles = createCommonStyles(colors);
  return StyleSheet.create({
    ...commonStyles,
    pageContainer: {
      ...commonStyles.pageContainer,
      paddingHorizontal: 0,
    },
    accordionContainer: {
      backgroundColor: colors.cardBackgroundColor,
      borderRadius: 16,
      marginBottom: 15,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    accordionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    accordionTitle: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.text,
    },
    accordionContent: {
      paddingHorizontal: 20,
      paddingBottom: 15,
    },
    accordionText: {
      fontSize: 15,
      color: colors.secondaryText,
      lineHeight: 24,
      textAlign: 'justify',
    },
  });
};

export default FAQsScreen;
