import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
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
import {WebView} from 'react-native-webview';

type RootStackParamList = {
  Settings: undefined;
};

interface ProductCardProps {
  product: Product;
  colors: Theme;
  onDetailsPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  colors,
  onDetailsPress,
}) => {
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
      <Pressable style={styles.cardLink} onPress={onDetailsPress}>
        <Text style={styles.infoText}>Mais detalhes</Text>
        <Icon
          name="arrow-right"
          size={15}
          color={colors.primary}
          style={{marginLeft: 5}}
        />
      </Pressable>
    </View>
  );
};

interface Product {
  title: string;
  icon: string;
  features: string[];
  link: string;
}

function BankProductsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {sessionId} = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isLoadingWebView, setIsLoadingWebView] = useState(true);

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

  const handleProductPress = (url: string) => {
    setSelectedUrl(url);
    setIsLoadingWebView(true);
  };

  const handleCloseWebView = () => {
    setSelectedUrl(null);
  };

  if (selectedUrl) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <MainScreenHeader
          title="Detalhes do Produto"
          icon="xmark"
          onIconPress={handleCloseWebView}
        />
        <View style={styles.webViewContainer}>
          <WebView
            source={{uri: selectedUrl}}
            onLoadStart={() => setIsLoadingWebView(true)}
            onLoadEnd={() => setIsLoadingWebView(false)}
          />
          {isLoadingWebView && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color={colors.primary}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

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
                <ProductCard
                  key={index}
                  product={product}
                  colors={colors}
                  onDetailsPress={() => handleProductPress(product.link)}
                />
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
      alignItems: 'center',
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
      alignSelf: 'flex-start',
    },
    featureText: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 20,
    },
    cardLink: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 'auto',
    },
    infoText: {
      ...commonStyles.infoText,
      marginBottom: 0,
    },
    webViewContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      paddingBottom: 30,
      marginTop: -60,
    },
    loadingIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default BankProductsScreen;
