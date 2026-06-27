import { ZoneKey } from '../theme';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';

export interface ParsedItem {
  name: string;
  emoji: string;
  qty: number;
  unit: string;
  days: number;
  cat: string;
  zone: ZoneKey;
  spot: string;
  tip: string;
}

const ITEM_SCHEMA = `For each item return:
- name: item name (string)
- emoji: a relevant food emoji (string)
- qty: numeric quantity, default 1 (number)
- unit: unit like ct, lb, kg, bag, box, bottle, can (string)
- days: estimated days until expiry — milk 7, bread 5, eggs 21, fresh produce 5-10, canned 365, frozen 180 (number)
- cat: one of Produce, Dairy, Meat, Seafood, Bakery, Dry Goods, Frozen, Beverages, Other (string)
- zone: one of "fridge", "freezer", "pantry", "kitchen" (string)
- spot: specific storage spot e.g. "Top shelf", "Crisper drawer", "Pantry shelf", "Counter bowl" (string)
- tip: one-sentence storage tip (string)

Return ONLY a valid JSON array. If no food items found, return [].`;

async function callClaude(apiKey: string, messages: object[]): Promise<string> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1024, messages }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.content[0].text as string;
}

function parseJSON(text: string): ParsedItem[] {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    return match ? JSON.parse(match[0]) : [];
  } catch {
    return [];
  }
}

export async function parseItemsFromImage(
  base64: string,
  mimeType: string,
  apiKey: string
): Promise<ParsedItem[]> {
  const text = await callClaude(apiKey, [
    {
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: mimeType, data: base64 },
        },
        {
          type: 'text',
          text: `You are a pantry tracker. Look at this image — it may be a receipt, grocery bag, or photo of food items. Extract all grocery/food items visible.\n\n${ITEM_SCHEMA}`,
        },
      ],
    },
  ]);
  return parseJSON(text);
}

export async function parseItemsFromTranscript(
  transcript: string,
  apiKey: string
): Promise<ParsedItem[]> {
  const text = await callClaude(apiKey, [
    {
      role: 'user',
      content: `You are a pantry tracker. The user said: "${transcript}"\n\nExtract any grocery/food items mentioned.\n\n${ITEM_SCHEMA}`,
    },
  ]);
  return parseJSON(text);
}
