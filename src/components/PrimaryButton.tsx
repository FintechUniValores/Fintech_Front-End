import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface PrimaryButtonProps {
  width?: number | `${number}%`;
  text: string;
  icon: string;
  onPress: () => void;
}

export default function PrimaryButton({
  width = 250,
  text,
  icon,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, width !== undefined ? {width} : null]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
      <Icon name={icon} size={20} color="#FFFFFF" style={styles.buttonIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#CD0B30',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 20,
  },
});
