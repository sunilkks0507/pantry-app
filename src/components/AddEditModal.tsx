import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { CATEGORIES, Category, GroceryItem } from '../types';

interface Props {
  visible: boolean;
  initial: GroceryItem | null;
  onClose: () => void;
  onSave: (item: GroceryItem) => void;
}

export default function AddEditModal({ visible, initial, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Other');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('pcs');
  const [expiryDate, setExpiryDate] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('1');

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setCategory(initial.category);
      setQuantity(String(initial.quantity));
      setUnit(initial.unit);
      setExpiryDate(initial.expiryDate ?? '');
      setLowStockThreshold(String(initial.lowStockThreshold));
    } else {
      setName('');
      setCategory('Other');
      setQuantity('1');
      setUnit('pcs');
      setExpiryDate('');
      setLowStockThreshold('1');
    }
  }, [initial, visible]);

  function handleSave() {
    if (!name.trim()) return;
    const item: GroceryItem = {
      id: initial?.id ?? Date.now().toString(),
      name: name.trim(),
      category,
      quantity: Number(quantity) || 0,
      unit: unit.trim() || 'pcs',
      expiryDate: expiryDate.trim() || null,
      lowStockThreshold: Number(lowStockThreshold) || 0,
      addedDate: initial?.addedDate ?? new Date().toISOString().slice(0, 10),
    };
    onSave(item);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>{initial ? 'Edit Item' : 'Add Item'}</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Milk" />

            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
              {CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, category === c && styles.chipActive]}
                  onPress={() => setCategory(c)}
                >
                  <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.flex1, styles.marginLeft]}>
                <Text style={styles.label}>Unit</Text>
                <TextInput style={styles.input} value={unit} onChangeText={setUnit} placeholder="pcs, kg, L" />
              </View>
            </View>

            <Text style={styles.label}>Expiry date (YYYY-MM-DD, optional)</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="2026-07-01"
            />

            <Text style={styles.label}>Low stock threshold</Text>
            <TextInput
              style={styles.input}
              value={lowStockThreshold}
              onChangeText={setLowStockThreshold}
              keyboardType="numeric"
            />

            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 13, color: '#666', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  chipRow: { flexDirection: 'row' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#f0f0f0', marginRight: 8 },
  chipActive: { backgroundColor: '#3a7bd5' },
  chipText: { fontSize: 13, color: '#444' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  row: { flexDirection: 'row', marginTop: 0 },
  flex1: { flex: 1 },
  marginLeft: { marginLeft: 10 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginBottom: 10 },
  cancelBtn: { paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
  cancelText: { color: '#888', fontSize: 15 },
  saveBtn: { backgroundColor: '#3a7bd5', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
