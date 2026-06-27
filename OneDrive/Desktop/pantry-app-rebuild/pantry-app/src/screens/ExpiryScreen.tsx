import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C, fonts, ZONES, statusOf } from '../theme';
import { GroceryItem } from '../types';
import BackButton from '../components/BackButton';

export default function ExpiryScreen({ items, onBack }: { items: GroceryItem[]; onBack: () => void }) {
  const expired = items.filter((i) => i.days < 0);
  const soon = items.filter((i) => i.days >= 0 && i.days <= 3).sort((a, b) => a.days - b.days);

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <BackButton onPress={onBack} />
        <Text style={styles.heading}>Expiry review</Text>
      </View>

      {expired.length > 0 && (
        <>
          <Text style={styles.sectionExpired}>Expired — discard</Text>
          <View style={styles.list}>
            {expired.map((it) => (
              <View key={it.id} style={styles.expiredRow}>
                <Text style={{ fontSize: 30 }}>{it.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowName}>{it.name}</Text>
                  <Text style={styles.expiredMeta}>Expired {Math.abs(it.days)}d ago</Text>
                </View>
                <Text style={{ fontSize: 20 }}>🗑️</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <Text style={styles.sectionSoon}>Expiring soon</Text>
      <View style={styles.list}>
        {soon.map((it) => {
          const st = statusOf(it.days);
          return (
            <View key={it.id} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: ZONES[it.zone]?.bg || '#F0ECE0' }]}>
                <Text style={{ fontSize: 26 }}>{it.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowName}>{it.name}</Text>
                <View style={[styles.statusPill, { backgroundColor: st.bg }]}>
                  <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
                  <Text style={[styles.statusLabel, { color: st.color }]}>{st.label}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 6 },
  heading: { fontFamily: fonts.display700, fontSize: 21, letterSpacing: -0.5, color: C.text },
  sectionExpired: { fontFamily: fonts.display700, fontSize: 16, color: C.red, marginHorizontal: 20, marginTop: 14, marginBottom: 10 },
  sectionSoon: { fontFamily: fonts.display700, fontSize: 16, color: '#9A6713', marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
  list: { paddingHorizontal: 20, gap: 9 },
  expiredRow: { backgroundColor: '#FEF0EE', borderWidth: 1.5, borderColor: '#F5C4BE', borderRadius: 16, padding: 13, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 9 },
  expiredMeta: { fontSize: 12, color: C.red, fontFamily: fonts.body600, marginTop: 2 },
  row: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 13, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 9 },
  rowIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowName: { fontFamily: fonts.body700, fontSize: 15, color: C.text },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 8, marginTop: 4 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  statusLabel: { fontFamily: fonts.body700, fontSize: 11 },
});
