import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.7}>
      <Text style={styles.chevron}>‹</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: { fontSize: 22, color: C.text, marginTop: -2 },
});
