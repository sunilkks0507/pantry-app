import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroceryItem } from './types';

const ITEMS_KEY = '@pantry/items';
const CART_KEY = '@pantry/cart';
const ONBOARDED_KEY = '@pantry/onboarded';
const API_KEY_KEY = '@pantry/apiKey';

export async function loadItems(): Promise<GroceryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(ITEMS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export async function saveItems(items: GroceryItem[]) {
  try {
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch {}
}

export async function loadCart(): Promise<Record<string, boolean>> {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export async function saveCart(cart: Record<string, boolean>) {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {}
}

export async function hasOnboarded(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(ONBOARDED_KEY)) === '1';
  } catch {
    return false;
  }
}

export async function setOnboarded() {
  try {
    await AsyncStorage.setItem(ONBOARDED_KEY, '1');
  } catch {}
}

export async function loadApiKey(): Promise<string> {
  try {
    return (await AsyncStorage.getItem(API_KEY_KEY)) || '';
  } catch {
    return '';
  }
}

export async function saveApiKey(key: string) {
  try {
    await AsyncStorage.setItem(API_KEY_KEY, key);
  } catch {}
}
