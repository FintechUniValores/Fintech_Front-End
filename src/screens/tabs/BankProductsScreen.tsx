import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MainScreenHeader from '../../components/MainScreenHeader';
import {createCommonStyles} from '../../styles/common';
import {useTheme} from '../../contexts/ThemeContext';
import {Theme} from '../../config/themes';

type RootStackParamList = {
  Settings: undefined;
};

const productsData = [
  {
    title: 'Renda Fixa',
    icon: 'money-bill-wave',
    features: [
      'Isenção de IR',
      'Liquidez',
      'Previsibilidade',
      'Garantia do FGC',
    ],
  },
  {
    title: 'Poupança Fácil',
    icon: 'piggy-bank',
    features: [
      'Isenção de IR',
      'Liquidez diária',
      'Garantia do FGC',
      'Cobertura automática',
    ],
  },
];

interface ProductCardProps {
  product: {
    title: string;
    icon: string;
    features: string[];
  };
  colors: Theme;
}

const ProductCard: React.FC<ProductCardProps> = ({product, colors}) => {
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <Icon name={product.icon} size={30} color={colors.primary} />
      <Text style={styles.cardTitle}>{product.title}</Text>
      <View style={styles.featuresContainer}>
        {product.features.map((feature, index) => (
          <Text key={index} style={styles.featureText}>
            • {feature}
          </Text>
        ))}
      </View>
      <Text style={styles.cardLink}>Mais detalhes →</Text>
    </View>
  );
};

function BankProductsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader
        title="Otimizando Seus Valores"
        icon="gear"
        onIconPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.pageContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Otimize Seus Valores com Bradesco</Text>
          <Text style={styles.subtitle}>
            Recebeu valores? Centralize seu dinheiro em sua conta e descubra
            novas oportunidades para ele render!
          </Text>
          <View style={styles.cardsRow}>
            {productsData.map((product, index) => (
              <ProductCard key={index} product={product} colors={colors} />
            ))}
          </View>
          <Text style={styles.infoText}>
            As informações são sugestões. Consulte um especialista para decisões
            financeiras personalizadas.
          </Text>
        </ScrollView>
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
      padding: 10,
    },
    scrollContainer: {
      ...commonStyles.scrollContainer,
      paddingHorizontal: 10,
    },
    cardsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      ...commonStyles.card,
      width: '48%',
      alignItems: 'flex-start',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 10,
      marginBottom: 10,
    },
    featuresContainer: {
      marginBottom: 15,
    },
    featureText: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 20,
    },
    cardLink: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
      alignSelf: 'flex-end',
    },
  });
};

export default BankProductsScreen;
