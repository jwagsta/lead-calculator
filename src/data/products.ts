/**
 * Lead content database for common products
 *
 * Lead concentrations are in parts per million (ppm) = µg/g
 *
 * Sources:
 * - FDA Total Diet Study
 * - FDA Chemical Contaminants Transparency Tool
 * - Consumer Reports testing data
 * - Published scientific literature
 *
 * Notes:
 * - Values represent typical/median concentrations
 * - Actual products may vary significantly
 * - "ND" (not detected) values are represented as 0.001 ppm (detection limit)
 */

import { Product } from '@/lib/types'

/**
 * Food products - Lead levels from FDA Total Diet Study and other sources
 */
export const FOOD_PRODUCTS: Product[] = [
  // Produce
  {
    id: 'leafy_greens',
    name: 'Leafy greens (spinach, lettuce, kale)',
    category: 'food',
    leadContentPpm: 0.02,
    leadContentRange: { min: 0.005, max: 0.1 },
    defaultServingGrams: 85,
    exposureRoute: 'ingestion',
    description: 'Fresh leafy vegetables',
  },
  {
    id: 'root_vegetables',
    name: 'Root vegetables (carrots, potatoes, beets)',
    category: 'food',
    leadContentPpm: 0.03,
    leadContentRange: { min: 0.01, max: 0.15 },
    defaultServingGrams: 150,
    exposureRoute: 'ingestion',
    description: 'Can absorb lead from soil',
  },
  {
    id: 'fruit_fresh',
    name: 'Fresh fruit (apples, berries, citrus)',
    category: 'food',
    leadContentPpm: 0.01,
    leadContentRange: { min: 0.001, max: 0.05 },
    defaultServingGrams: 150,
    exposureRoute: 'ingestion',
  },

  // Grains
  {
    id: 'rice',
    name: 'Rice (white or brown)',
    category: 'food',
    leadContentPpm: 0.01,
    leadContentRange: { min: 0.005, max: 0.04 },
    defaultServingGrams: 185,
    exposureRoute: 'ingestion',
    description: 'Brown rice may have slightly higher levels',
  },
  {
    id: 'bread_wheat',
    name: 'Bread (wheat/white)',
    category: 'food',
    leadContentPpm: 0.02,
    leadContentRange: { min: 0.005, max: 0.06 },
    defaultServingGrams: 30,
    exposureRoute: 'ingestion',
  },

  // Proteins
  {
    id: 'beef',
    name: 'Beef (ground or steak)',
    category: 'food',
    leadContentPpm: 0.02,
    leadContentRange: { min: 0.005, max: 0.08 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    category: 'food',
    leadContentPpm: 0.01,
    leadContentRange: { min: 0.002, max: 0.04 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
  },
  {
    id: 'fish',
    name: 'Fish (salmon, tuna, etc.)',
    category: 'food',
    leadContentPpm: 0.03,
    leadContentRange: { min: 0.01, max: 0.1 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'Varies by species and source',
  },

  // Spices
  {
    id: 'spices_general',
    name: 'Spices (general - oregano, basil, etc.)',
    category: 'food',
    leadContentPpm: 0.5,
    leadContentRange: { min: 0.1, max: 2.0 },
    defaultServingGrams: 1,
    exposureRoute: 'ingestion',
    description: 'Spices can have elevated lead levels',
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    category: 'food',
    leadContentPpm: 1.0,
    leadContentRange: { min: 0.1, max: 5.0 },
    defaultServingGrams: 3,
    exposureRoute: 'ingestion',
    description: 'Some turmeric products have been found with high lead levels due to added colorants',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    category: 'food',
    leadContentPpm: 0.3,
    leadContentRange: { min: 0.05, max: 1.5 },
    defaultServingGrams: 2.5,
    exposureRoute: 'ingestion',
  },
  {
    id: 'chili_powder',
    name: 'Chili powder / Paprika',
    category: 'food',
    leadContentPpm: 0.8,
    leadContentRange: { min: 0.1, max: 3.0 },
    defaultServingGrams: 2.5,
    exposureRoute: 'ingestion',
    description: 'Red spices may have higher lead from processing',
  },

  // Chocolate
  {
    id: 'dark_chocolate',
    name: 'Dark chocolate',
    category: 'food',
    leadContentPpm: 0.15,
    leadContentRange: { min: 0.02, max: 0.5 },
    defaultServingGrams: 40,
    exposureRoute: 'ingestion',
    description: 'Lead accumulates in cocoa during processing',
  },
  {
    id: 'milk_chocolate',
    name: 'Milk chocolate',
    category: 'food',
    leadContentPpm: 0.05,
    leadContentRange: { min: 0.01, max: 0.15 },
    defaultServingGrams: 40,
    exposureRoute: 'ingestion',
  },

  // Beverages
  {
    id: 'fruit_juice',
    name: 'Fruit juice',
    category: 'beverage',
    leadContentPpm: 0.005,
    leadContentRange: { min: 0.001, max: 0.03 },
    defaultServingGrams: 240,
    exposureRoute: 'ingestion',
  },
  {
    id: 'wine',
    name: 'Wine',
    category: 'beverage',
    leadContentPpm: 0.02,
    leadContentRange: { min: 0.005, max: 0.08 },
    defaultServingGrams: 150,
    exposureRoute: 'ingestion',
  },
]

/**
 * Baby food products - FDA has specific action levels
 * FDA action levels: 10-20 ppb (0.01-0.02 ppm) for most baby foods
 */
export const BABY_FOOD_PRODUCTS: Product[] = [
  {
    id: 'baby_cereal',
    name: 'Baby cereal (rice/oat)',
    category: 'baby_food',
    leadContentPpm: 0.015,
    leadContentRange: { min: 0.002, max: 0.04 },
    defaultServingGrams: 30,
    exposureRoute: 'ingestion',
    description: 'FDA action level is 20 ppb (0.02 ppm)',
  },
  {
    id: 'baby_puree_fruit',
    name: 'Baby food puree (fruits)',
    category: 'baby_food',
    leadContentPpm: 0.008,
    leadContentRange: { min: 0.001, max: 0.02 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
  },
  {
    id: 'baby_puree_veg',
    name: 'Baby food puree (vegetables)',
    category: 'baby_food',
    leadContentPpm: 0.01,
    leadContentRange: { min: 0.002, max: 0.03 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'Root vegetable purees may have higher levels',
  },
  {
    id: 'baby_snacks',
    name: 'Baby snacks (puffs, teething biscuits)',
    category: 'baby_food',
    leadContentPpm: 0.012,
    leadContentRange: { min: 0.003, max: 0.03 },
    defaultServingGrams: 14,
    exposureRoute: 'ingestion',
  },
  {
    id: 'infant_formula',
    name: 'Infant formula (prepared)',
    category: 'baby_food',
    leadContentPpm: 0.003,
    leadContentRange: { min: 0.001, max: 0.01 },
    defaultServingGrams: 240,
    exposureRoute: 'ingestion',
  },
]

/**
 * Cosmetics and personal care products
 * Lead can be present as contaminant or in some traditional products
 */
export const COSMETIC_PRODUCTS: Product[] = [
  {
    id: 'lipstick',
    name: 'Lipstick / Lip gloss',
    category: 'cosmetic',
    leadContentPpm: 1.0,
    leadContentRange: { min: 0.1, max: 7.0 },
    defaultServingGrams: 0.024,
    exposureRoute: 'ingestion',
    description: 'Lead is a natural contaminant in color additives. FDA limit is 10 ppm.',
    exposureExplanation: {
      pathway: 'Lips → Licked/eaten/drinking → GI tract',
      details: 'Lipstick applied to lips is gradually ingested through licking, eating, and drinking. FDA estimates that lipstick wearers ingest most of what they apply over the course of the day.',
      effectiveDose: '~24mg per application, ~87mg/day with reapplication. Nearly all eventually ingested.',
    },
  },
  {
    id: 'lipstick_daily',
    name: 'Lipstick (full day use, multiple applications)',
    category: 'cosmetic',
    leadContentPpm: 1.0,
    leadContentRange: { min: 0.1, max: 7.0 },
    defaultServingGrams: 0.087,
    exposureRoute: 'ingestion',
    description: 'Accounts for reapplication throughout the day',
    exposureExplanation: {
      pathway: 'Lips → Licked/eaten/drinking → GI tract',
      details: 'With typical reapplication 2-3 times daily, FDA estimates ~87mg of lipstick is applied per day. Studies show essentially all of this is eventually ingested through normal activities.',
      effectiveDose: '~87mg/day applied. Absorption: 50% of ingested lead (adult GI absorption).',
    },
  },
  {
    id: 'kohl_surma',
    name: 'Kohl / Surma (traditional eye cosmetic)',
    category: 'cosmetic',
    leadContentPpm: 500,
    leadContentRange: { min: 1, max: 800000 },
    defaultServingGrams: 0.02,
    exposureRoute: 'ingestion',
    description: 'WARNING: Traditional kohl often contains extremely high lead levels.',
    exposureExplanation: {
      pathway: 'Eyes → Tear ducts → Nasolacrimal duct → Throat → GI tract',
      details: 'Material applied around the eyes drains through the tear ducts into the nasolacrimal duct, which empties into the throat. An estimated 10-30% of applied material reaches the GI tract this way. This is the same pathway tears take.',
      effectiveDose: '~20mg applied per use. ~2-6mg reaches GI tract (10-30%). Some traditional kohl is 50-80% lead sulfide.',
    },
  },
  {
    id: 'foundation',
    name: 'Foundation / Face powder',
    category: 'cosmetic',
    leadContentPpm: 0.5,
    leadContentRange: { min: 0.1, max: 2.0 },
    defaultServingGrams: 1,
    exposureRoute: 'dermal',
    description: 'Applied to skin. Dermal absorption is low (~1%).',
    exposureExplanation: {
      pathway: 'Skin → Dermal absorption (minimal)',
      details: 'Lead has very low dermal absorption through intact skin (~1%). Most applied to face stays on surface and is removed by washing. Some may be inadvertently ingested via hand-to-mouth contact.',
      effectiveDose: '~1g applied. Only ~1% absorbed dermally = ~0.01g effective dose.',
    },
  },
  {
    id: 'hair_dye',
    name: 'Hair dye (lead acetate-based)',
    category: 'cosmetic',
    leadContentPpm: 6000,
    leadContentRange: { min: 0, max: 6000 },
    defaultServingGrams: 0.1,
    exposureRoute: 'dermal',
    description: 'Lead acetate hair dyes were banned by FDA in 2022. Some may still be available.',
    exposureExplanation: {
      pathway: 'Scalp → Dermal absorption (minimal)',
      details: 'These "progressive" hair dyes contained lead acetate to gradually darken hair. FDA banned them in 2022. Dermal absorption is low but scalp may absorb slightly more than other skin.',
      effectiveDose: 'Variable based on application method. Scalp contact is brief during application.',
    },
  },
  {
    id: 'hair_dye_regular',
    name: 'Hair dye (regular/modern)',
    category: 'cosmetic',
    leadContentPpm: 0.5,
    leadContentRange: { min: 0.1, max: 2.0 },
    defaultServingGrams: 0.5,
    exposureRoute: 'dermal',
    description: 'Modern hair dyes without lead acetate',
    exposureExplanation: {
      pathway: 'Scalp → Dermal absorption (minimal)',
      details: 'Modern hair dyes may contain trace lead as a contaminant. Contact with scalp is brief and dermal absorption is very low (~1%).',
      effectiveDose: 'Brief scalp contact during application. ~1% dermal absorption.',
    },
  },
]

/**
 * Custom product template for user-entered values
 */
export const CUSTOM_PRODUCT: Product = {
  id: 'custom',
  name: 'Custom product',
  category: 'custom',
  leadContentPpm: 0,
  defaultServingGrams: 100,
  exposureRoute: 'ingestion',
  description: 'Enter your own lead concentration',
}

/**
 * All products combined
 */
export const ALL_PRODUCTS: Product[] = [
  ...FOOD_PRODUCTS,
  ...BABY_FOOD_PRODUCTS,
  ...COSMETIC_PRODUCTS,
]

/**
 * Get products by category
 */
export function getProductsByCategory(category: Product['category']): Product[] {
  return ALL_PRODUCTS.filter(p => p.category === category)
}

/**
 * Search products by name
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery)
  )
}
