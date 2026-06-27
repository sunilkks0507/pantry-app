import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { C, fonts, TILE_BG } from '../theme';
import { Recipe } from '../types';
import { RECIPES } from '../data';

export default function RecipesScreen({ onOpenRecipe }: { onOpenRecipe: (r: Recipe) => void }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Recipes</Text>
      {RECIPES.map((r, i) => (
        <TouchableOpacity
          key={r.id}
          onPress={() => onOpenRecipe(r)}
          style={[styles.card, { backgroundColor: TILE_BG[i % 4] }]}
          activeOpacity={0.85}
        >
          <Text style={styles.cardIcon}>{r.emoji}</Text>
          <Text style={styles.cardName}>{r.name}</Text>
          <Text style={styles.cardMeta}>⏱ {r.time} · 🔥 {r.calories} cal</Text>
          <Text style={styles.usesTag}>Uses {r.expiringUse}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingTop: 6, paddingBottom: 120 },
  heading: { fontFamily: fonts.display700, fontSize: 26, letterSpacing: -0.7, color: C.text, marginVertical: 10, marginBottom: 16 },
  card: { borderWidth: 1, borderColor: C.border, borderRadius: 22, padding: 16, marginBottom: 13 },
  cardIcon: { fontSize: 38, marginBottom: 8 },
  cardName: { fontFamily: fonts.display700, fontSize: 16, color: C.text },
  cardMeta: { fontSize: 12.5, color: C.muted, fontFamily: fonts.body500, marginVertical: 6 },
  usesTag: { backgroundColor: '#E8F2E5', color: '#2C6B43', fontFamily: fonts.body700, fontSize: 11, paddingVertical: 4, paddingHorizontal: 9, borderRadius: 9, alignSelf: 'flex-start', overflow: 'hidden' },
});
