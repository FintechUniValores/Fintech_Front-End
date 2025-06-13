import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface SecondaryButtonProps {
  width?: number | `${number}%`;
  text: string;
  icon: string;
  onPress: () => void;
}

export default function SecondaryButton({
  width = 250,
  text,
  icon,
  onPress,
}: SecondaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, width !== undefined ? {width} : null]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
      <Icon name={icon} size={20} color="#CD0B30" style={styles.buttonIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#CD0B30',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#CD0B30',
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 20,
  },
});
