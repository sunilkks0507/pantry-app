import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GroceryItem } from '../types';
import { loadItems, saveItems } from '../storage';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import AddEditModal from '../components/AddEditModal';

export default function HomeScreen() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<GroceryItem | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadItems().then((data) => {
      setItems(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveItems(items);
  }, [items, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? items.filter((i) => i.name.toLowerCase().includes(q)) : items;
    return [...base].sort((a, b) => {
      if (!a.expiryDate && !b.expiryDate) return a.name.localeCompare(b.name);
      if (!a.expiryDate) return 1;
      if (!b.expiryDate) return -1;
      return a.expiryDate.localeCompare(b.expiryDate);
    });
  }, [items, query]);

  function openAdd() {
    setEditing(null);
    setModalVisible(true);
  }

  function openEdit(item: GroceryItem) {
    setEditing(item);
    setModalVisible(true);
  }

  function handleSave(item: GroceryItem) {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      return exists ? prev.map((p) => (p.id === item.id ? item : p)) : [...prev, item];
    });
    setModalVisible(false);
  }

  function handleDelete(item: GroceryItem) {
    Alert.alert('Delete item?', `Remove "${item.name}" from your pantry?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((p) => p.id !== item.id)),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pantry</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => openEdit(item)} onDelete={() => handleDelete(item)} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {loaded ? 'No items yet. Tap "+ Add" to get started.' : 'Loading...'}
          </Text>
        }
      />

      <AddEditModal
        visible={modalVisible}
        initial={editing}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#222' },
  addBtn: { backgroundColor: '#3a7bd5', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  addBtnText: { color: '#fff', fontWeight: '700' },
  list: { paddingBottom: 24, paddingTop: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 60, fontSize: 14 },
});
