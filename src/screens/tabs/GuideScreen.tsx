import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MainScreenHeader from '../../components/MainScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createCommonStyles} from '../../styles/common';
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

interface AccordionItemProps {
  item: Guide;
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
          {item.steps.map((step, index) => (
            <Text key={index} style={styles.accordionText}>
              {`• ${step}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

interface Guide {
  title: string;
  steps: string[];
}

function GuideScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {sessionId} = useSession();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setIsLoadingApi(true);
      authenticatedFetch('/content/guides', {}, sessionId)
        .then((data: Guide[]) => {
          setGuides(data);
        })
        .catch(error => {
          console.error('Erro ao buscar Guides:', error);
          setGuides([]);
        })
        .finally(() => {
          setIsLoadingApi(false);
        });
    } else {
      setIsLoadingApi(false);
      setGuides([]);
    }
  }, [sessionId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader
        title="Guia de Resgate"
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
            <Text style={styles.title}>Como Resgatar Seus Valores</Text>
            <Text style={styles.subtitle}>
              Esperamos que você tenha encontrado boas notícias Agora, veja como
              resgatar:
            </Text>
            {guides.map((guideItem, index) => (
              <AccordionItem key={index} item={guideItem} colors={colors} />
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

export default GuideScreen;
