import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { C, fonts, ZONES, ZoneKey } from '../theme';
import { GroceryItem } from '../types';
import BackButton from '../components/BackButton';

const EMOJI_BY_ZONE: Record<ZoneKey, string> = {
  fridge: '🥛',
  freezer: '🧊',
  pantry: '🫙',
  kitchen: '🍽️',
};

export default function AddItemScreen({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (item: GroceryItem) => void;
}) {
  const [name, setName] = useState('');
  const [zone, setZone] = useState<ZoneKey>('fridge');
  const [qty, setQty] = useState('1');
  const [unit, setUnit] = useState('ct');
  const [days, setDays] = useState('7');

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const item: GroceryItem = {
      id: name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: name.trim(),
      emoji: EMOJI_BY_ZONE[zone],
      cat: 'Other',
      qty: Number(qty) || 1,
      unit: unit || 'ct',
      zone,
      spot: ZONES[zone].label,
      days: Number(days) || 0,
      bought: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: 0,
      store: '—',
      tip: 'Keep it in the ' + ZONES[zone].label.toLowerCase() + ' and check on it before it expires.',
      hist: [],
    };
    onSave(item);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <BackButton onPress={onBack} />
        <Text style={styles.heading}>Add item</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Item name</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Almond milk"
              placeholderTextColor="#9AA290"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.rowFields}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Quantity</Text>
            <View style={styles.inputWrap}>
              <TextInput value={qty} onChangeText={setQty} keyboardType="numeric" style={styles.input} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Unit</Text>
            <View style={styles.inputWrap}>
              <TextInput value={unit} onChangeText={setUnit} placeholder="ct, lb, bag..." placeholderTextColor="#9AA290" style={styles.input} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Expires in (days)</Text>
            <View style={styles.inputWrap}>
              <TextInput value={days} onChangeText={setDays} keyboardType="numeric" style={styles.input} />
            </View>
          </View>
        </View>

        <View>
          <Text style={[styles.label, { marginBottom: 10 }]}>Storage location</Text>
          <View style={styles.zoneGrid}>
            {(Object.entries(ZONES) as [ZoneKey, typeof ZONES[ZoneKey]][]).map(([k, z]) => (
              <TouchableOpacity
                key={k}
                onPress={() => setZone(k)}
                style={[
                  styles.zoneBtn,
                  { borderColor: zone === k ? z.color : C.border, backgroundColor: zone === k ? z.bg : '#fff' },
                ]}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 22 }}>{z.icon}</Text>
                <Text style={[styles.zoneLabel, { color: zone === k ? z.color : '#5A6450' }]}>{z.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={!canSave}
          style={[styles.saveBtn, !canSave && { opacity: 0.5 }]}
          activeOpacity={0.85}
        >
          <Text style={styles.saveText}>Save to pantry</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 6 },
  heading: { fontFamily: fonts.display700, fontSize: 21, color: C.text },
  form: { paddingHorizontal: 20, paddingTop: 12, gap: 14 },
  label: { fontSize: 13, fontFamily: fonts.body700, color: C.muted, marginBottom: 6 },
  inputWrap: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 14, paddingHorizontal: 14, height: 50, justifyContent: 'center' },
  input: { fontSize: 15, fontFamily: fonts.body400, color: C.text },
  rowFields: { flexDirection: 'row', gap: 10 },
  zoneGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  zoneBtn: { width: '47%', paddingVertical: 14, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', gap: 10 },
  zoneLabel: { fontFamily: fonts.body700, fontSize: 14 },
  saveBtn: { width: '100%', height: 54, borderRadius: 18, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  saveText: { fontFamily: fonts.display700, color: '#F4EFE3', fontSize: 16 },
});
