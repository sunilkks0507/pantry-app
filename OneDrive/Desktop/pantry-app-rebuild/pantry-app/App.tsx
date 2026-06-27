import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

import { C, NAV_SCREENS } from './src/theme';
import { GroceryItem, Recipe, Screen } from './src/types';
import { RECIPES } from './src/data';
import { loadItems, saveItems, loadCart, saveCart, hasOnboarded, setOnboarded } from './src/storage';

import BottomNav from './src/components/BottomNav';
import ComingSoonModal from './src/components/ComingSoonModal';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import ExpiryScreen from './src/screens/ExpiryScreen';
import RecipesScreen from './src/screens/RecipesScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import AddItemScreen from './src/screens/AddItemScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_500Medium,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [onbIdx, setOnbIdx] = useState(0);
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [activeItem, setActiveItem] = useState<GroceryItem | null>(null);
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(RECIPES[0]);
  const [cart, setCart] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<Screen[]>([]);
  const [comingSoon, setComingSoon] = useState<null | 'scan' | 'voice'>(null);

  useEffect(() => {
    (async () => {
      const [storedItems, storedCart, onboarded] = await Promise.all([loadItems(), loadCart(), hasOnboarded()]);
      setItems(storedItems);
      setCart(storedCart);
      setScreen(onboarded ? 'home' : 'onboarding');
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) saveItems(items);
  }, [items, ready]);

  useEffect(() => {
    if (ready) saveCart(cart);
  }, [cart, ready]);

  const push = useCallback((s: Screen) => {
    setHistory((h) => [...h, screen]);
    setScreen(s);
  }, [screen]);

  const go = useCallback((s: Screen) => {
    setHistory([]);
    setScreen(s);
  }, []);

  const back = useCallback(() => {
    setHistory((h) => {
      const copy = [...h];
      const prev = copy.pop() || 'home';
      setScreen(prev as Screen);
      return copy;
    });
  }, []);

  const openItem = (it: GroceryItem) => { setActiveItem(it); push('item'); };
  const openRecipe = (r: Recipe) => { setActiveRecipe(r); push('recipeDetail'); };
  const toggleCart = (id: string) => setCart((c) => ({ ...c, [id]: !c[id] }));
  const finishOnboarding = () => { setOnboarded(); go('home'); };
  const addItem = (item: GroceryItem) => { setItems((prev) => [...prev, item]); go('inventory'); };

  if (!fontsLoaded || !ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={C.green} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={screen === 'onboarding' ? [] : ['top']}>
        <StatusBar style={screen === 'onboarding' ? 'light' : 'dark'} />
        <View style={styles.content}>
          {screen === 'onboarding' && (
            <OnboardingScreen
              idx={onbIdx}
              onNext={() => (onbIdx < 2 ? setOnbIdx((i) => i + 1) : finishOnboarding())}
              onSkip={finishOnboarding}
            />
          )}
          {screen === 'home' && (
            <HomeScreen
              items={items}
              onGoInventory={() => go('inventory')}
              onGoExpiry={() => push('expiry')}
              onGoRecipes={() => go('recipes')}
              onOpenRecipe={openRecipe}
              onComingSoon={setComingSoon}
              onGoAdd={() => push('add')}
            />
          )}
          {screen === 'inventory' && (
            <InventoryScreen items={items} onOpenItem={openItem} onGoAdd={() => push('add')} onComingSoon={setComingSoon} />
          )}
          {screen === 'item' && activeItem && <ItemDetailScreen item={activeItem} onBack={back} />}
          {screen === 'expiry' && <ExpiryScreen items={items.filter((i) => i.days <= 3)} onBack={back} />}
          {screen === 'recipes' && <RecipesScreen onOpenRecipe={openRecipe} />}
          {screen === 'recipeDetail' && <RecipeDetailScreen recipe={activeRecipe} onBack={back} />}
          {screen === 'list' && <ShoppingListScreen cart={cart} onToggle={toggleCart} />}
          {screen === 'add' && <AddItemScreen onBack={back} onSave={addItem} />}
        </View>

        {NAV_SCREENS.includes(screen) && (
          <BottomNav screen={screen} onGo={go} onOpenVoice={() => setComingSoon('voice')} />
        )}

        <ComingSoonModal
          visible={comingSoon === 'scan'}
          onClose={() => setComingSoon(null)}
          icon="📷"
          title="Bill scanning is coming soon"
          body="Snap a photo of your receipt and Pantry will add the items automatically. This needs an AI connection we haven't wired up yet."
        />
        <ComingSoonModal
          visible={comingSoon === 'voice'}
          onClose={() => setComingSoon(null)}
          icon="🎙️"
          title="Voice control is coming soon"
          body="Ask Pantry what's expiring or tell it to update an item by voice. This needs microphone access and an AI connection we haven't wired up yet."
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.cream },
  root: { flex: 1, backgroundColor: C.cream },
  content: { flex: 1 },
});
