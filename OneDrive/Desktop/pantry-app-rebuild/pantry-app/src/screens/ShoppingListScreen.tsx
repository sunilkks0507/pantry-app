import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { C, fonts, money } from '../theme';
import { SHOPPING } from '../data';

export default function ShoppingListScreen({
  cart,
  onToggle,
}: {
  cart: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const total = SHOPPING.reduce((a, b) => a + b.lastPrice, 0);
  const checked = SHOPPING.filter((s) => cart[s.id]).length;

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Shopping list</Text>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Text style={styles.addPlus}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryMeta}>{SHOPPING.length} items · {checked} in cart</Text>
          <Text style={styles.summaryTitle}>Cheapest run: Trader Joes</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.summaryMeta}>Est. total</Text>
          <Text style={styles.summaryTotal}>{money(total)}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {SHOPPING.map((it) => {
          const on = !!cart[it.id];
          return (
            <View key={it.id} style={[styles.row, on && { opacity: 0.5 }]}>
              <TouchableOpacity
                onPress={() => onToggle(it.id)}
                style={[styles.checkbox, { borderColor: on ? C.green : C.border, backgroundColor: on ? C.green : '#fff' }]}
                activeOpacity={0.8}
              >
                {on && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <View style={styles.itemIcon}>
                <Text style={{ fontSize: 23 }}>{it.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemName, on && styles.strike]}>{it.name}</Text>
                <Text style={styles.itemNote}>{it.note}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.itemPrice}>{money(it.lastPrice)}</Text>
                <Text style={styles.itemStore}>{it.lastStore}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 130 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 4 },
  heading: { fontFamily: fonts.display700, fontSize: 26, letterSpacing: -0.7, color: C.text },
  addBtn: { width: 42, height: 42, borderRadius: 14, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
  addPlus: { color: '#F4EFE3', fontSize: 24, marginTop: -2 },
  summary: { marginHorizontal: 20, marginVertical: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 16, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryMeta: { fontSize: 12.5, color: C.muted, fontFamily: fonts.body600 },
  summaryTitle: { fontFamily: fonts.display700, fontSize: 15, color: C.text, marginTop: 2 },
  summaryTotal: { fontFamily: fonts.display800, fontSize: 24, color: C.green, letterSpacing: -0.5 },
  list: { paddingHorizontal: 20, gap: 10 },
  row: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 13, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 10 },
  checkbox: { width: 28, height: 28, borderRadius: 9, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: '#fff', fontSize: 14 },
  itemIcon: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#F4F0E6', alignItems: 'center', justifyContent: 'center' },
  itemName: { fontFamily: fonts.body700, fontSize: 15, color: C.text },
  strike: { textDecorationLine: 'line-through' },
  itemNote: { fontSize: 12, color: C.muted, fontFamily: fonts.body500, marginTop: 2 },
  itemPrice: { fontFamily: fonts.display700, fontSize: 14, color: C.text },
  itemStore: { fontSize: 11, color: '#A9B0A0', fontFamily: fonts.body600 },
});
