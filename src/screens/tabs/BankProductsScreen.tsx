import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MainScreenHeader from '../../components/MainScreenHeader';
import {createCommonStyles} from '../../styles/common';
import {useTheme} from '../../contexts/ThemeContext';
import {Theme} from '../../config/themes';
import {useSession} from '../../hooks/useSession';
import {authenticatedFetch} from '../../services/api';

type RootStackParamList = {
  Settings: undefined;
};

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
      <View style={styles.cardLink}>
        <Text style={styles.infoText}>Mais detalhes</Text>
        <Icon
          name="arrow-right"
          size={15}
          color={colors.primary}
          style={{marginLeft: 5}}
        />
      </View>
    </View>
  );
};

interface Product {
  title: string;
  icon: string;
  features: string[];
}

function BankProductsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {sessionId} = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setIsLoadingApi(true);
      authenticatedFetch('/content/products', {}, sessionId)
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Erro ao buscar Bank Products:', error);
        })
        .finally(() => {
          setIsLoadingApi(false);
        });
    }
  }, [sessionId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainScreenHeader
        title="Otimizando Seus Valores"
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
            <Text style={styles.title}>Otimize Seus Valores com Bradesco</Text>
            <Text style={styles.subtitle}>
              Recebeu valores? Centralize seu dinheiro em sua conta e descubra
              novas oportunidades para ele render!
            </Text>
            <View style={styles.cardsRow}>
              {products.map((product, index) => (
                <ProductCard key={index} product={product} colors={colors} />
              ))}
            </View>
            <Text style={styles.infoText}>
              As informações são sugestões. Consulte um especialista para
              decisões financeiras personalizadas.
            </Text>
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
      padding: 10,
    },
    scrollContainer: {
      ...commonStyles.scrollContainer,
      paddingHorizontal: 10,
    },
    cardsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
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
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginTop: 'auto',
    },
    infoText: {
      ...commonStyles.infoText,
      marginBottom: 0,
    },
  });
};

export default BankProductsScreen;
