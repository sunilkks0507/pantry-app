export type Category =
  | 'Produce'
  | 'Dairy'
  | 'Meat & Seafood'
  | 'Pantry'
  | 'Frozen'
  | 'Bakery'
  | 'Beverages'
  | 'Household'
  | 'Other';

export interface GroceryItem {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  unit: string;
  expiryDate: string | null; // ISO date string, e.g. 2026-07-01
  lowStockThreshold: number;
  addedDate: string;
}

export const CATEGORIES: Category[] = [
  'Produce',
  'Dairy',
  'Meat & Seafood',
  'Pantry',
  'Frozen',
  'Bakery',
  'Beverages',
  'Household',
  'Other',
];
