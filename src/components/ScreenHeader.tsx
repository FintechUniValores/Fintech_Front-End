import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export default function ScreenHeader({title, subtitle}: ScreenHeaderProps) {
  return (
    <>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.divider} />
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 90,
    marginBottom: 10,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
