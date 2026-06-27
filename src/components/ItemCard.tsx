import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GroceryItem } from '../types';

interface Props {
  item: GroceryItem;
  onPress: () => void;
  onDelete: () => void;
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export default function ItemCard({ item, onPress, onDelete }: Props) {
  const days = daysUntil(item.expiryDate);
  const isExpired = days !== null && days < 0;
  const isExpiringSoon = days !== null && days >= 0 && days <= 3;
  const isLowStock = item.quantity <= item.lowStockThreshold;

  let expiryLabel = '';
  if (days !== null) {
    if (isExpired) expiryLabel = `Expired ${Math.abs(days)}d ago`;
    else if (days === 0) expiryLabel = 'Expires today';
    else expiryLabel = `Expires in ${days}d`;
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isExpired && styles.expiredCard,
        !isExpired && isExpiringSoon && styles.warningCard,
      ]}
      onPress={onPress}
      onLongPress={onDelete}
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        {isLowStock && <Text style={styles.badge}>LOW</Text>}
      </View>
      <Text style={styles.meta}>
        {item.quantity} {item.unit} · {item.category}
      </Text>
      {expiryLabel ? (
        <Text
          style={[
            styles.expiry,
            isExpired && styles.expiredText,
            isExpiringSoon && !isExpired && styles.warningText,
          ]}
        >
          {expiryLabel}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  expiredCard: { backgroundColor: '#fdeceb' },
  warningCard: { backgroundColor: '#fff6e5' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: '#222' },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#e0883a',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  meta: { fontSize: 13, color: '#666', marginTop: 4 },
  expiry: { fontSize: 13, color: '#888', marginTop: 4 },
  expiredText: { color: '#c0392b', fontWeight: '600' },
  warningText: { color: '#b8860b', fontWeight: '600' },
});
