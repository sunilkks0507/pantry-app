import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroceryItem } from './types';

const STORAGE_KEY = '@pantry/items';

export async function loadItems(): Promise<GroceryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GroceryItem[]) : [];
  } catch (e) {
    console.warn('Failed to load items', e);
    return [];
  }
}

export async function saveItems(items: GroceryItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save items', e);
  }
}
