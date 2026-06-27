import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { C, fonts, ZONES, statusOf, money } from '../theme';
import { GroceryItem } from '../types';
import BackButton from '../components/BackButton';

export default function ItemDetailScreen({ item, onBack }: { item: GroceryItem; onBack: () => void }) {
  const st = statusOf(item.days);
  const chips = [
    { icon: '📍', label: item.spot },
    { icon: '📅', label: 'Bought ' + item.bought },
    { icon: '🏷️', label: money(item.price) + ' at ' + item.store },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <BackButton onPress={onBack} />
        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.8}>
          <Text style={{ fontSize: 18, color: '#5A6450' }}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <View style={[styles.heroIcon, { backgroundColor: ZONES[item.zone]?.bg || '#F0ECE0' }]}>
          <Text style={{ fontSize: 50 }}>{item.emoji}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.statusPill, { backgroundColor: st.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
          <Text style={[styles.statusLabel, { color: st.color }]}>{st.label}</Text>
        </View>
      </View>

      <View style={styles.chipRow}>
        {chips.map((c, i) => (
          <View key={i} style={styles.chip}>
            <Text style={{ fontSize: 16 }}>{c.icon}</Text>
            <Text style={styles.chipLabel}>{c.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tip}>
        <Text style={{ fontSize: 20 }}>💡</Text>
        <Text style={styles.tipText}>{item.tip}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 8 },
  moreBtn: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16 },
  heroIcon: { width: 96, height: 96, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  name: { fontFamily: fonts.display700, fontSize: 26, letterSpacing: -0.6, color: C.text, textAlign: 'center' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 12 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusLabel: { fontFamily: fonts.body700, fontSize: 13 },
  chipRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 16 },
  chip: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center' },
  chipLabel: { fontSize: 10.5, color: C.muted, fontFamily: fonts.body600, marginTop: 3, textAlign: 'center', lineHeight: 13 },
  tip: { marginHorizontal: 20, backgroundColor: '#EAF4E8', borderWidth: 1, borderColor: '#D5E8CF', borderRadius: 18, padding: 14, paddingHorizontal: 16, flexDirection: 'row', gap: 12 },
  tipText: { flex: 1, fontSize: 13.5, lineHeight: 20, color: '#3A5A3E', fontFamily: fonts.body400 },
});
