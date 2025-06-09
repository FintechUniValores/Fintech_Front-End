import React, {useState} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import MainScreenHeader from '../../components/MainScreenHeader';
import {useTheme} from '../../contexts/ThemeContext';
import {Theme} from '../../config/themes';

type RootStackParamList = {
  Settings: undefined;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- DADOS DAS PERGUNTAS ---
// No futuro, estes dados podem vir do seu backend
const faqData = [
  {
    title: 'Não Caia Em Golpes',
    content:
      'Lembre-se: NUNCA forneça suas senhas. Nenhuma instituição financeira ou o Banco Central pedirá sua senha ou código de segurança por telefone, e-mail ou SMS. Desconfie de links suspeitos.',
  },
  {
    title: 'Sistema De Valores A Receber',
    content:
      'O Sistema de Valores a Receber (SVR) é um serviço do Banco Central onde você pode consultar se você, sua empresa ou uma pessoa falecida tem dinheiro "esquecido" em alguma instituição financeira e solicitar o resgate.',
  },
  {
    title: 'Consultar Valores A Receber',
    content:
      'A consulta é feita exclusivamente no site oficial do Banco Central: valoresareceber.bcb.gov.br. Você precisará do seu CPF e data de nascimento (para pessoa física) ou CNPJ e data de abertura (para pessoa jurídica).',
  },
  {
    title: 'Resgatar Valores A Receber',
    content:
      'Após a consulta, se houver valores, você precisará de uma conta Gov.br nível Prata ou Ouro para acessar o sistema e solicitar o resgate. A devolução pode ser via PIX ou por contato direto com a instituição.',
  },
];

interface FAQAccordionItemProps {
  item: {title: string; content: string};
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
          <Text style={styles.accordionText}>{item.content}</Text>
        </View>
      )}
    </View>
  );
};

function FAQsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader
        title="Perguntas Frequentes"
        icon="gear"
        onIconPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.mainTitle}>Valores a Receber</Text>
          <Text style={styles.subtitle}>
            Valores que você têm direito a receber de bancos e instituições
            financeiras.
          </Text>
          {faqData.map((item, index) => (
            <FAQAccordionItem key={index} item={item} colors={colors} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    container: {
      flex: 1,
      alignItems: 'center',
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    mainTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginTop: 20,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 30,
    },
    accordionContainer: {
      backgroundColor: colors.cardBackgroundColor,
      borderRadius: 24,
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
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 21,
    },
  });

export default FAQsScreen;
