import { GroceryItem, Recipe, ShoppingItem, OnboardingSlide, Tip } from './types';

export const SEED_ITEMS: GroceryItem[] = [
  { id: 'milk', name: 'Whole Milk', emoji: '🥛', cat: 'Dairy', qty: 1, unit: 'gallon', zone: 'fridge', spot: 'Top shelf', days: 2, bought: 'Jun 23', price: 3.49, store: 'Whole Foods', tip: 'Store at the back of the fridge, not the door.', hist: [{ date: 'Apr 28', store: 'Costco', price: 3.19 }, { date: 'Jun 23', store: 'Whole Foods', price: 3.49 }] },
  { id: 'spinach', name: 'Baby Spinach', emoji: '🥬', cat: 'Produce', qty: 1, unit: 'bag', zone: 'fridge', spot: 'Crisper drawer', days: 1, bought: 'Jun 24', price: 2.99, store: 'Trader Joes', tip: 'Keep unwashed in a breathable bag with a dry paper towel.', hist: [{ date: 'Jun 12', store: 'Whole Foods', price: 3.29 }, { date: 'Jun 24', store: 'Trader Joes', price: 2.99 }] },
  { id: 'chicken', name: 'Chicken Thighs', emoji: '🍗', cat: 'Meat', qty: 1.5, unit: 'lb', zone: 'fridge', spot: 'Bottom shelf', days: 0, bought: 'Jun 24', price: 6.49, store: 'Costco', tip: 'Keep on the bottom shelf. Freeze if not using within 2 days.', hist: [{ date: 'May 10', store: 'Costco', price: 5.99 }, { date: 'Jun 24', store: 'Costco', price: 6.49 }] },
  { id: 'eggs', name: 'Eggs', emoji: '🥚', cat: 'Dairy', qty: 12, unit: 'ct', zone: 'fridge', spot: 'Door tray', days: 12, bought: 'Jun 21', price: 4.29, store: 'Whole Foods', tip: 'Store in their carton on a shelf to keep temperature steady.', hist: [{ date: 'May 28', store: 'Costco', price: 3.99 }, { date: 'Jun 21', store: 'Whole Foods', price: 4.29 }] },
  { id: 'yogurt', name: 'Greek Yogurt', emoji: '🍶', cat: 'Dairy', qty: 4, unit: 'cups', zone: 'fridge', spot: 'Middle shelf', days: 5, bought: 'Jun 22', price: 5.49, store: 'Trader Joes', tip: 'Keep sealed and upright.', hist: [{ date: 'Jun 1', store: 'Whole Foods', price: 5.99 }, { date: 'Jun 22', store: 'Trader Joes', price: 5.49 }] },
  { id: 'berries', name: 'Strawberries', emoji: '🍓', cat: 'Produce', qty: 1, unit: 'lb', zone: 'fridge', spot: 'Crisper drawer', days: -1, bought: 'Jun 20', price: 3.99, store: 'Local Market', tip: 'Do not wash until ready to eat.', hist: [{ date: 'Jun 6', store: 'Costco', price: 4.49 }, { date: 'Jun 20', store: 'Local Market', price: 3.99 }] },
  { id: 'bananas', name: 'Bananas', emoji: '🍌', cat: 'Produce', qty: 6, unit: 'ct', zone: 'kitchen', spot: 'Counter bowl', days: 2, bought: 'Jun 23', price: 1.59, store: 'Costco', tip: 'Keep on the counter away from other fruit.', hist: [{ date: 'Jun 9', store: 'Whole Foods', price: 1.79 }, { date: 'Jun 23', store: 'Costco', price: 1.59 }] },
  { id: 'bread', name: 'Sourdough Loaf', emoji: '🍞', cat: 'Bakery', qty: 1, unit: 'loaf', zone: 'pantry', spot: 'Bread box', days: 4, bought: 'Jun 22', price: 4.49, store: 'Trader Joes', tip: 'Store cut-side down in a bread box. Never refrigerate.', hist: [{ date: 'Jun 8', store: 'Local Market', price: 4.99 }, { date: 'Jun 22', store: 'Trader Joes', price: 4.49 }] },
  { id: 'tomatoes', name: 'Roma Tomatoes', emoji: '🍅', cat: 'Produce', qty: 5, unit: 'ct', zone: 'kitchen', spot: 'Counter bowl', days: 3, bought: 'Jun 23', price: 2.79, store: 'Local Market', tip: 'Keep at room temperature, stem-side down.', hist: [{ date: 'Jun 10', store: 'Whole Foods', price: 3.19 }, { date: 'Jun 23', store: 'Local Market', price: 2.79 }] },
  { id: 'cheddar', name: 'Cheddar Block', emoji: '🧀', cat: 'Dairy', qty: 1, unit: 'block', zone: 'fridge', spot: 'Deli drawer', days: 9, bought: 'Jun 19', price: 4.99, store: 'Trader Joes', tip: 'Wrap in parchment then loosely in foil so it can breathe.', hist: [{ date: 'May 25', store: 'Costco', price: 4.79 }, { date: 'Jun 19', store: 'Trader Joes', price: 4.99 }] },
  { id: 'salmon', name: 'Salmon Fillet', emoji: '🐟', cat: 'Seafood', qty: 1, unit: 'lb', zone: 'freezer', spot: 'Top drawer', days: 48, bought: 'Jun 15', price: 11.99, store: 'Whole Foods', tip: 'Freeze in a vacuum-sealed bag to prevent freezer burn.', hist: [{ date: 'May 18', store: 'Costco', price: 10.99 }, { date: 'Jun 15', store: 'Whole Foods', price: 11.99 }] },
  { id: 'pasta', name: 'Penne Pasta', emoji: '🍝', cat: 'Dry Goods', qty: 2, unit: 'boxes', zone: 'pantry', spot: 'Top shelf', days: 320, bought: 'Jun 5', price: 1.29, store: 'Costco', tip: 'Keep in an airtight container away from heat and light.', hist: [{ date: 'Mar 2', store: 'Costco', price: 1.49 }, { date: 'Jun 5', store: 'Costco', price: 1.29 }] },
  { id: 'apples', name: 'Honeycrisp Apples', emoji: '🍎', cat: 'Produce', qty: 6, unit: 'ct', zone: 'fridge', spot: 'Crisper drawer', days: 14, bought: 'Jun 18', price: 3.99, store: 'Costco', tip: 'Store away from other produce as apples release ethylene gas.', hist: [{ date: 'May 30', store: 'Whole Foods', price: 4.49 }, { date: 'Jun 18', store: 'Costco', price: 3.99 }] },
];

export const RECIPES: Recipe[] = [
  {
    id: 'salad', name: 'Spinach & Strawberry Salad', emoji: '🥗', time: '15 min', calories: 320, servings: 2,
    uses: ['spinach', 'berries'], expiringUse: 'spinach + berries',
    ingredients: [['Baby spinach', true], ['Strawberries', true], ['Walnuts', false], ['Feta cheese', false], ['Balsamic glaze', true]],
    nutrients: { Protein: '9 g', Carbs: '24 g', Fat: '18 g', Fiber: '6 g' },
    benefits: 'Spinach delivers iron and vitamin K; strawberries add vitamin C and antioxidants.',
    steps: ['Rinse spinach and slice strawberries.', 'Toast walnuts in a dry pan for 2 min.', 'Toss greens, berries and feta.', 'Drizzle balsamic glaze and serve.'],
  },
  {
    id: 'creamy', name: 'Creamy Chicken & Spinach', emoji: '🍛', time: '30 min', calories: 480, servings: 3,
    uses: ['chicken', 'spinach'], expiringUse: 'chicken + spinach',
    ingredients: [['Chicken thighs', true], ['Baby spinach', true], ['Whole milk', true], ['Garlic', true], ['Parmesan', false]],
    nutrients: { Protein: '38 g', Carbs: '12 g', Fat: '28 g', Fiber: '3 g' },
    benefits: 'High in lean protein for muscle repair; spinach adds folate and milk adds calcium.',
    steps: ['Sear seasoned chicken until golden.', 'Soften garlic, add milk and simmer.', 'Stir in spinach until wilted.', 'Return chicken, finish with parmesan.'],
  },
  {
    id: 'omelette', name: 'Garden Veggie Omelette', emoji: '🍳', time: '10 min', calories: 290, servings: 1,
    uses: ['eggs', 'tomatoes'], expiringUse: 'tomatoes',
    ingredients: [['Eggs', true], ['Roma tomatoes', true], ['Baby spinach', true], ['Cheddar', true], ['Chives', false]],
    nutrients: { Protein: '21 g', Carbs: '6 g', Fat: '20 g', Fiber: '2 g' },
    benefits: 'Protein-rich; tomatoes provide lycopene and spinach adds iron and fiber.',
    steps: ['Whisk eggs with a pinch of salt.', 'Saute diced tomatoes and spinach.', 'Pour eggs over, cook until set.', 'Add cheddar, fold and serve.'],
  },
];

export const SHOPPING: ShoppingItem[] = [
  { id: 'sh1', name: 'Whole Milk', emoji: '🥛', note: 'Running low', lastPrice: 3.49, lastStore: 'Whole Foods' },
  { id: 'sh2', name: 'Baby Spinach', emoji: '🥬', note: 'Expired', lastPrice: 2.99, lastStore: 'Trader Joes' },
  { id: 'sh3', name: 'Chicken Thighs', emoji: '🍗', note: 'Used up', lastPrice: 6.49, lastStore: 'Costco' },
  { id: 'sh4', name: 'Greek Yogurt', emoji: '🍶', note: 'Almost out', lastPrice: 5.49, lastStore: 'Trader Joes' },
  { id: 'sh5', name: 'Walnuts', emoji: '🌰', note: 'Need for recipe', lastPrice: 7.99, lastStore: 'Whole Foods' },
];

export const ONB: OnboardingSlide[] = [
  { emoji: '🥬', title: 'Your kitchen, always fresh', body: 'Track every item at home — fridge, freezer, pantry, and counter — in one place.', cta: 'Get started' },
  { emoji: '⏰', title: 'Beat expiry dates', body: 'Pantry alerts you before food goes off and suggests recipes to use ingredients up.', cta: 'Next' },
  { emoji: '🛒', title: 'Shop smarter every run', body: 'Auto-build your list from low stock, compare prices, and never over-buy again.', cta: 'Let me in' },
];

export const TIPS_DATA: Tip[] = [
  { icon: '🧊', bg: '#E4EFF5', title: 'Mind the fridge door', body: 'The door is the warmest zone — keep milk and eggs on inner shelves.' },
  { icon: '🍎', bg: '#FBE6E0', title: 'Separate ethylene producers', body: 'Apples, bananas and tomatoes speed ripening of leafy greens nearby.' },
  { icon: '🌬️', bg: '#EAF4E8', title: 'Let produce breathe', body: 'Use perforated bags so moisture escapes and mold cannot form.' },
  { icon: '❄️', bg: '#E7ECF8', title: 'Freeze before it turns', body: 'Bread, meat and ripe bananas freeze well on day one of the use-soon window.' },
];
