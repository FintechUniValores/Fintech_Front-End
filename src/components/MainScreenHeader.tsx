import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface MainScreenHeaderProps {
  title: string;
  icon?: string;
  onIconPress?: () => void;
}

export default function ScreenHeader({
  title,
  icon,
  onIconPress,
}: MainScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={[styles.top, !icon && {justifyContent: 'center'}]}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <Pressable onPress={onIconPress}>
            <Icon name={icon} size={30} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: -70,
    left: 0,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginBottom: 80,
  },
});
