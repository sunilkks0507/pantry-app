import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  ActivityIndicator, TextInput, Alert, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { C, fonts, ZONES, ZoneKey } from '../theme';
import { GroceryItem } from '../types';
import { ParsedItem, parseItemsFromImage } from '../services/claude';
import { saveApiKey } from '../storage';
import BackButton from '../components/BackButton';

interface Props {
  onBack: () => void;
  onSave: (items: GroceryItem[]) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

function parsedToGrocery(p: ParsedItem): GroceryItem {
  return {
    id: p.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now() + '-' + Math.random(),
    name: p.name,
    emoji: p.emoji || '🛒',
    cat: p.cat || 'Other',
    qty: p.qty || 1,
    unit: p.unit || 'ct',
    zone: (p.zone as ZoneKey) || 'pantry',
    spot: p.spot || 'Pantry shelf',
    days: p.days ?? 7,
    bought: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: 0,
    store: '—',
    tip: p.tip || '',
    hist: [],
  };
}

export default function ScanScreen({ onBack, onSave, apiKey, onApiKeyChange }: Props) {
  const [localKey, setLocalKey] = useState(apiKey);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<ParsedItem[]>([]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [keyVisible, setKeyVisible] = useState(!apiKey);

  const pickImage = async (fromCamera: boolean) => {
    const perm = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access in your device settings.');
      return;
    }
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ base64: true, quality: 0.7 })
      : await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.7, mediaTypes: 'images' });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      setImageBase64(asset.base64 || null);
      const ext = asset.uri.split('.').pop()?.toLowerCase();
      setImageMime(ext === 'png' ? 'image/png' : 'image/jpeg');
      setParsed([]);
      setSelected({});
    }
  };

  const analyze = async () => {
    const key = localKey.trim();
    if (!key) { Alert.alert('API key required', 'Enter your Anthropic API key to use AI scanning.'); return; }
    if (!imageBase64) { Alert.alert('No image', 'Please pick or capture an image first.'); return; }
    setLoading(true);
    try {
      await saveApiKey(key);
      onApiKeyChange(key);
      const items = await parseItemsFromImage(imageBase64, imageMime, key);
      if (items.length === 0) {
        Alert.alert('No items found', 'Claude could not detect any food items. Try a clearer photo or receipt.');
      } else {
        setParsed(items);
        const sel: Record<number, boolean> = {};
        items.forEach((_, i) => { sel[i] = true; });
        setSelected(sel);
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong. Check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const toAdd = parsed.filter((_, i) => selected[i]).map(parsedToGrocery);
    if (toAdd.length === 0) { Alert.alert('Nothing selected', 'Select at least one item to add.'); return; }
    onSave(toAdd);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.topRow}>
        <BackButton onPress={onBack} />
        <Text style={styles.heading}>Scan to add</Text>
      </View>

      {keyVisible ? (
        <View style={styles.apiCard}>
          <Text style={styles.apiLabel}>🔑 Anthropic API key</Text>
          <TextInput
            value={localKey}
            onChangeText={setLocalKey}
            placeholder="sk-ant-..."
            placeholderTextColor="#9AA290"
            style={styles.apiInput}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={async () => { await saveApiKey(localKey.trim()); onApiKeyChange(localKey.trim()); setKeyVisible(false); }}
            style={styles.saveKeyBtn}
          >
            <Text style={styles.saveKeyText}>Save key</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setKeyVisible(true)} style={styles.keyChip}>
          <Text style={styles.keyChipText}>🔑 API key saved · tap to change</Text>
        </TouchableOpacity>
      )}

      <View style={styles.pickRow}>
        <TouchableOpacity style={styles.pickBtn} onPress={() => pickImage(true)} activeOpacity={0.85}>
          <Text style={{ fontSize: 26 }}>📷</Text>
          <Text style={styles.pickLabel}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickBtn} onPress={() => pickImage(false)} activeOpacity={0.85}>
          <Text style={{ fontSize: 26 }}>🖼️</Text>
          <Text style={styles.pickLabel}>Photo library</Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <View style={styles.previewWrap}>
          <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />
        </View>
      )}

      {imageUri && !loading && parsed.length === 0 && (
        <TouchableOpacity style={styles.analyzeBtn} onPress={analyze} activeOpacity={0.85}>
          <Text style={styles.analyzeBtnText}>✨ Analyse with Claude AI</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={C.green} />
          <Text style={styles.loadingText}>Claude is reading your image…</Text>
        </View>
      )}

      {parsed.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Found {parsed.length} item{parsed.length > 1 ? 's' : ''}</Text>
          {parsed.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.itemRow, !selected[i] && styles.itemRowDim]}
              onPress={() => setSelected((s) => ({ ...s, [i]: !s[i] }))}
              activeOpacity={0.8}
            >
              <View style={[styles.itemIcon, { backgroundColor: ZONES[item.zone as ZoneKey]?.bg || '#F0ECE0' }]}>
                <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>{item.qty} {item.unit} · {item.days}d · {item.zone}</Text>
              </View>
              <View style={[styles.checkbox, selected[i] && styles.checkboxOn]}>
                {selected[i] && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.85}>
            <Text style={styles.addBtnText}>Add {Object.values(selected).filter(Boolean).length} item{Object.values(selected).filter(Boolean).length !== 1 ? 's' : ''} to pantry</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 60 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  heading: { fontFamily: fonts.display700, fontSize: 21, color: C.text },
  apiCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 16, marginBottom: 16, gap: 10 },
  apiLabel: { fontFamily: fonts.body700, fontSize: 13, color: C.muted },
  apiInput: { backgroundColor: C.cream, borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingHorizontal: 14, height: 46, fontSize: 14, fontFamily: fonts.body400, color: C.text },
  saveKeyBtn: { backgroundColor: C.green, borderRadius: 12, height: 44, alignItems: 'center', justifyContent: 'center' },
  saveKeyText: { color: '#F4EFE3', fontFamily: fonts.body700, fontSize: 14 },
  keyChip: { alignSelf: 'flex-start', backgroundColor: '#EAF4E8', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12, marginBottom: 16 },
  keyChipText: { fontSize: 12, fontFamily: fonts.body600, color: C.greenMid },
  pickRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  pickBtn: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 18, paddingVertical: 18, alignItems: 'center', gap: 8 },
  pickLabel: { fontFamily: fonts.body700, fontSize: 13, color: C.text },
  previewWrap: { borderRadius: 18, overflow: 'hidden', marginBottom: 16, height: 220 },
  preview: { width: '100%', height: '100%' },
  analyzeBtn: { backgroundColor: C.green, borderRadius: 16, height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  analyzeBtnText: { color: '#F4EFE3', fontFamily: fonts.display700, fontSize: 16 },
  loadingBox: { alignItems: 'center', gap: 12, paddingVertical: 30 },
  loadingText: { fontFamily: fonts.body500, fontSize: 14, color: C.muted },
  sectionTitle: { fontFamily: fonts.display700, fontSize: 17, color: C.text, marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, borderRadius: 16, padding: 12, marginBottom: 10 },
  itemRowDim: { opacity: 0.45 },
  itemIcon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  itemName: { fontFamily: fonts.body700, fontSize: 14, color: C.text },
  itemMeta: { fontSize: 12, fontFamily: fonts.body500, color: C.muted, marginTop: 2 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: C.green, borderColor: C.green },
  checkmark: { color: '#fff', fontSize: 13, fontFamily: fonts.body700 },
  addBtn: { backgroundColor: C.green, borderRadius: 16, height: 54, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  addBtnText: { color: '#F4EFE3', fontFamily: fonts.display700, fontSize: 16 },
});
