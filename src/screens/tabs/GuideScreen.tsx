import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MainScreenHeader from '../../components/MainScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createCommonStyles} from '../../styles/common';
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

const guideData = [
  {
    title: 'Com Pix Diponível',
    content:
      'selecione uma de suas chaves Pix (campo obrigatório) e informe seus dados pessoais; e guarde o número de protocolo, para entrar em contato com a instituição, se necessário. Observações: nesse caso, você receberá o valor em até 12 dias úteis; mesmo que você tenha indicado a chave Pix, a instituição pode devolver por TED ou DOC para a conta da chave Pix selecionada; e a instituição pode entrar em contato pelo telefone ou pelo e-mail indicado por você para confirmar sua identidade ou tirar  dúvidas sobre a forma de devolução. Esse é um procedimento para sua segurança e da instituição. Mas não forneça senhas a ninguém.',
  },
  {
    title: 'Sem Pix Disponível',
    content:
      'Entre em contato diretamente com a instituição financeira pelo telefone ou pelo e-mail informado por ela para combinar a forma de devolução. Nesse caso, a instituição financeira não é obrigada a devolver o valor em até 12 dias úteis; ou se preferir, crie uma chave Pix e volte ao sistema para solicitar o valor.',
  },
  {
    title: 'Não Ofereceu Solicitar Aqui',
    content:
      'Entre em contato diretamente com a instituição financeira pelo telefone ou pelo e-mail informado por ela para combinar a forma de devolução. Nesse caso, a instituição financeira não é obrigada a devolver o valor em até 12 dias úteis.',
  },
  {
    title: 'Observação Sobre Valores Acima De R$ 100 E 2FA',
    content:
      'Entre no seu aplicativo gov.br e ative o duplo fator de autenticação, depois acesse novamente o SVR e solicite o resgate do valor normalmente.',
  },
];

interface AccordionItemProps {
  item: {title: string; content: string};
  colors: Theme;
}

const AccordionItem: React.FC<AccordionItemProps> = ({item, colors}) => {
  const [expanded, setExpanded] = useState(false);
  const styles = createStyles(colors);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <Pressable style={styles.accordionHeader} onPress={toggleExpand}>
        <Icon name="pix" size={24} color={colors.primary} />
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

function GuideScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader
        title="Guia de Resgate"
        icon="gear"
        onIconPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.pageContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Como Resgatar Seus Valores</Text>
          <Text style={styles.subtitle}>
            Esperamos que você tenha encontrado boas notícias Agora, veja como
            resgatar:
          </Text>
          {guideData.map((item, index) => (
            <AccordionItem key={index} item={item} colors={colors} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) => {
  const commonStyles = createCommonStyles(colors);
  return StyleSheet.create({
    ...commonStyles,
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
};

export default GuideScreen;
