/**
 * Lead content database for common products
 *
 * Lead concentrations are in parts per million (ppm) = µg/g
 *
 * Sources:
 * - FDA Total Diet Study 2018-2020: https://www.tandfonline.com/doi/full/10.1080/19440049.2024.2396910
 * - FDA Baby Food Action Levels (Jan 2025): https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-action-levels-lead-processed-food-intended-babies-and-young-children
 * - FDA Cosmetics Testing: https://www.fda.gov/cosmetics/potential-contaminants-cosmetics/lead-cosmetics
 * - Consumer Reports chocolate testing (2022-2023)
 * - Pure Earth kohl study (2025): https://www.pureearth.org/pure-earth-researchers-investigate-lead-contaminated-kohl-sold-in-the-u-s/
 * - PMC turmeric study: https://pmc.ncbi.nlm.nih.gov/articles/PMC5415259/
 *
 * Notes:
 * - Values represent typical/median concentrations from published studies
 * - Actual products may vary significantly
 * - "ND" (not detected) values are represented as detection limit
 */

import { Product } from '@/lib/types'

/**
 * Food products - Lead levels from FDA Total Diet Study 2018-2020
 * Most foods have mean lead levels of 1-10 ppb (0.001-0.01 ppm)
 */
export const FOOD_PRODUCTS: Product[] = [
  // Produce - FDA TDS data
  {
    id: 'leafy_greens',
    name: 'Leafy greens (spinach, lettuce, kale)',
    category: 'food',
    leadContentPpm: 0.005,
    leadContentRange: { min: 0.001, max: 0.02 },
    defaultServingGrams: 85,
    exposureRoute: 'ingestion',
    description: 'Fresh leafy vegetables - FDA TDS mean ~5 ppb',
  },
  {
    id: 'root_vegetables',
    name: 'Root vegetables (carrots, potatoes, beets)',
    category: 'food',
    leadContentPpm: 0.015,
    leadContentRange: { min: 0.005, max: 0.04 },
    defaultServingGrams: 150,
    exposureRoute: 'ingestion',
    description: 'Can absorb lead from soil - FDA TDS higher than other veg',
  },
  {
    id: 'fruit_fresh',
    name: 'Fresh fruit (apples, berries, citrus)',
    category: 'food',
    leadContentPpm: 0.003,
    leadContentRange: { min: 0.001, max: 0.01 },
    defaultServingGrams: 150,
    exposureRoute: 'ingestion',
    description: 'FDA TDS mean ~3 ppb',
  },

  // Grains - FDA TDS data
  {
    id: 'rice',
    name: 'Rice (white or brown)',
    category: 'food',
    leadContentPpm: 0.008,
    leadContentRange: { min: 0.003, max: 0.02 },
    defaultServingGrams: 185,
    exposureRoute: 'ingestion',
    description: 'FDA TDS - brown rice slightly higher',
  },
  {
    id: 'bread_wheat',
    name: 'Bread (wheat/white)',
    category: 'food',
    leadContentPpm: 0.008,
    leadContentRange: { min: 0.003, max: 0.02 },
    defaultServingGrams: 30,
    exposureRoute: 'ingestion',
    description: 'FDA TDS mean ~8 ppb',
  },

  // Proteins - FDA TDS data
  {
    id: 'beef',
    name: 'Beef (ground or steak)',
    category: 'food',
    leadContentPpm: 0.005,
    leadContentRange: { min: 0.002, max: 0.015 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'FDA TDS - meats generally low in lead',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    category: 'food',
    leadContentPpm: 0.003,
    leadContentRange: { min: 0.001, max: 0.01 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'FDA TDS mean ~3 ppb',
  },
  {
    id: 'fish',
    name: 'Fish (salmon, tuna, etc.)',
    category: 'food',
    leadContentPpm: 0.01,
    leadContentRange: { min: 0.005, max: 0.03 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'Varies by species and source',
  },

  // Spices - HIGH VARIABILITY due to adulteration risk
  // Source: PMC5415259, FDA testing
  {
    id: 'spices_general',
    name: 'Spices (general - oregano, basil, etc.)',
    category: 'food',
    leadContentPpm: 0.3,
    leadContentRange: { min: 0.1, max: 2.0 },
    defaultServingGrams: 1,
    exposureRoute: 'ingestion',
    description: 'Spices can have elevated lead levels',
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    category: 'food',
    leadContentPpm: 2.0,
    leadContentRange: { min: 0.1, max: 500 },
    defaultServingGrams: 3,
    exposureRoute: 'ingestion',
    description: 'WARNING: Some turmeric adulterated with lead chromate. Boston study found 0.5-100 ppm typical, up to 483 ppm adulterated.',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    category: 'food',
    leadContentPpm: 0.3,
    leadContentRange: { min: 0.05, max: 2.0 },
    defaultServingGrams: 2.5,
    exposureRoute: 'ingestion',
    description: 'FDA testing - generally lower risk than turmeric/chili',
  },
  {
    id: 'chili_powder',
    name: 'Chili powder / Paprika',
    category: 'food',
    leadContentPpm: 0.5,
    leadContentRange: { min: 0.1, max: 5.0 },
    defaultServingGrams: 2.5,
    exposureRoute: 'ingestion',
    description: 'Red spices may have higher lead from processing/adulteration',
  },

  // Chocolate - Consumer Reports 2022-2023 testing
  {
    id: 'dark_chocolate',
    name: 'Dark chocolate (70%+ cocoa)',
    category: 'food',
    leadContentPpm: 0.1,
    leadContentRange: { min: 0.02, max: 0.3 },
    defaultServingGrams: 40,
    exposureRoute: 'ingestion',
    description: 'Consumer Reports: lead accumulates during drying. CA MADL 0.5 µg/day.',
  },
  {
    id: 'milk_chocolate',
    name: 'Milk chocolate',
    category: 'food',
    leadContentPpm: 0.03,
    leadContentRange: { min: 0.01, max: 0.1 },
    defaultServingGrams: 40,
    exposureRoute: 'ingestion',
    description: 'Lower cocoa content = lower lead',
  },

  // Beverages
  {
    id: 'fruit_juice',
    name: 'Fruit juice',
    category: 'beverage',
    leadContentPpm: 0.003,
    leadContentRange: { min: 0.001, max: 0.01 },
    defaultServingGrams: 240,
    exposureRoute: 'ingestion',
    description: 'FDA TDS - generally very low',
  },
  {
    id: 'wine',
    name: 'Wine',
    category: 'beverage',
    leadContentPpm: 0.015,
    leadContentRange: { min: 0.005, max: 0.05 },
    defaultServingGrams: 150,
    exposureRoute: 'ingestion',
    description: 'Can vary by vintage and storage',
  },
]

/**
 * Baby food products - FDA Action Levels finalized January 2025
 * Action levels: 10 ppb for most foods, 20 ppb for cereals and root vegetables
 * Source: FDA Final Guidance Jan 2025
 */
export const BABY_FOOD_PRODUCTS: Product[] = [
  {
    id: 'baby_cereal',
    name: 'Baby cereal (rice/oat)',
    category: 'baby_food',
    leadContentPpm: 0.012,
    leadContentRange: { min: 0.003, max: 0.020 },
    defaultServingGrams: 30,
    exposureRoute: 'ingestion',
    description: 'FDA action level: 20 ppb (0.02 ppm)',
  },
  {
    id: 'baby_puree_fruit',
    name: 'Baby food puree (fruits)',
    category: 'baby_food',
    leadContentPpm: 0.005,
    leadContentRange: { min: 0.001, max: 0.010 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'FDA action level: 10 ppb (0.01 ppm)',
  },
  {
    id: 'baby_puree_veg',
    name: 'Baby food puree (vegetables)',
    category: 'baby_food',
    leadContentPpm: 0.008,
    leadContentRange: { min: 0.002, max: 0.010 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'FDA action level: 10 ppb (0.01 ppm)',
  },
  {
    id: 'baby_puree_root',
    name: 'Baby food puree (root vegetables)',
    category: 'baby_food',
    leadContentPpm: 0.012,
    leadContentRange: { min: 0.005, max: 0.020 },
    defaultServingGrams: 113,
    exposureRoute: 'ingestion',
    description: 'FDA action level: 20 ppb (0.02 ppm) - sweet potato, carrot higher',
  },
  {
    id: 'baby_snacks',
    name: 'Baby snacks (puffs, teething biscuits)',
    category: 'baby_food',
    leadContentPpm: 0.008,
    leadContentRange: { min: 0.003, max: 0.020 },
    defaultServingGrams: 14,
    exposureRoute: 'ingestion',
    description: 'FDA TDS: teething biscuits ~18 ppb',
  },
  {
    id: 'infant_formula',
    name: 'Infant formula (prepared)',
    category: 'baby_food',
    leadContentPpm: 0.002,
    leadContentRange: { min: 0.001, max: 0.004 },
    defaultServingGrams: 240,
    exposureRoute: 'ingestion',
    description: 'Most samples below 4 ppb detection limit',
  },
]

/**
 * Cosmetics and personal care products
 * Sources: FDA testing, Pure Earth kohl study 2025, CDC case studies
 */
export const COSMETIC_PRODUCTS: Product[] = [
  {
    id: 'lipstick',
    name: 'Lipstick / Lip gloss',
    category: 'cosmetic',
    leadContentPpm: 1.0,
    leadContentRange: { min: 0.026, max: 7.19 },
    defaultServingGrams: 0.024,
    exposureRoute: 'ingestion',
    description: 'FDA survey: 0.026-7.19 ppm, mean 1.0 ppm. FDA limit 10 ppm.',
    exposureExplanation: {
      pathway: 'Lips -> Licked/eaten/drinking -> GI tract',
      details: 'Lipstick applied to lips is gradually ingested through licking, eating, and drinking. FDA estimates that lipstick wearers ingest most of what they apply over the course of the day.',
      effectiveDose: '~24mg per application, ~87mg/day with reapplication. Nearly all eventually ingested.',
    },
  },
  {
    id: 'lipstick_daily',
    name: 'Lipstick (full day use, multiple applications)',
    category: 'cosmetic',
    leadContentPpm: 1.0,
    leadContentRange: { min: 0.026, max: 7.19 },
    defaultServingGrams: 0.087,
    exposureRoute: 'ingestion',
    description: 'Accounts for reapplication throughout the day',
    exposureExplanation: {
      pathway: 'Lips -> Licked/eaten/drinking -> GI tract',
      details: 'With typical reapplication 2-3 times daily, FDA estimates ~87mg of lipstick is applied per day. Studies show essentially all of this is eventually ingested through normal activities.',
      effectiveDose: '~87mg/day applied. Absorption: 20% of ingested lead (adult GI absorption).',
    },
  },
  {
    id: 'kohl_surma_modern',
    name: 'Kohl / Kajal (modern, regulated)',
    category: 'cosmetic',
    leadContentPpm: 10,
    leadContentRange: { min: 1, max: 100 },
    defaultServingGrams: 0.02,
    exposureRoute: 'ingestion',
    description: 'Modern regulated products - FDA limit 10 ppm. Pure Earth: 47% of samples under 10 ppm.',
    exposureExplanation: {
      pathway: 'Eyes -> Tear ducts -> Nasolacrimal duct -> Throat -> GI tract',
      details: 'Material applied around the eyes drains through the tear ducts into the nasolacrimal duct, which empties into the throat. An estimated 10-30% of applied material reaches the GI tract.',
      effectiveDose: '~20mg applied per use. ~2-6mg reaches GI tract (10-30%).',
    },
  },
  {
    id: 'kohl_surma_traditional',
    name: 'Kohl / Surma (traditional, unregulated)',
    category: 'cosmetic',
    leadContentPpm: 50000,
    leadContentRange: { min: 1000, max: 800000 },
    defaultServingGrams: 0.02,
    exposureRoute: 'ingestion',
    description: 'WARNING: Traditional kohl often 29-98% lead (galena/PbS). Pure Earth 2025: samples up to 320,000 ppm. CDC cases up to 980,000 ppm.',
    exposureExplanation: {
      pathway: 'Eyes -> Tear ducts -> Nasolacrimal duct -> Throat -> GI tract',
      details: 'Traditional kohl is often made from galena (lead sulfide) and can be 50-80% pure lead by weight. This drains through tear ducts into the throat.',
      effectiveDose: '~20mg applied per use. At 50% lead, that is 10mg lead per use, with 1-3mg reaching GI tract.',
    },
  },
  {
    id: 'foundation',
    name: 'Foundation / Face powder',
    category: 'cosmetic',
    leadContentPpm: 0.64,
    leadContentRange: { min: 0.1, max: 2.0 },
    defaultServingGrams: 1,
    exposureRoute: 'dermal',
    description: 'FDA testing mean 0.64 ppm. Applied to skin - dermal absorption ~1%.',
    exposureExplanation: {
      pathway: 'Skin -> Dermal absorption (minimal)',
      details: 'Lead has very low dermal absorption through intact skin (~1%). Most applied to face stays on surface and is removed by washing. Some may be inadvertently ingested via hand-to-mouth contact.',
      effectiveDose: '~1g applied. Only ~1% absorbed dermally = ~0.01g effective dose.',
    },
  },
  {
    id: 'eye_shadow',
    name: 'Eye shadow',
    category: 'cosmetic',
    leadContentPpm: 4.2,
    leadContentRange: { min: 0.1, max: 14 },
    defaultServingGrams: 0.05,
    exposureRoute: 'dermal',
    description: 'FDA testing mean 4.2 ppm. Some absorption via tear ducts possible.',
    exposureExplanation: {
      pathway: 'Eyelids -> Dermal absorption + some tear duct drainage',
      details: 'Primarily dermal exposure with low absorption. Small amount may enter tear ducts and be ingested. FDA found levels up to 14 ppm in some products.',
      effectiveDose: '~50mg applied. Mostly dermal (~1% absorption) with minor ingestion component.',
    },
  },
  {
    id: 'hair_dye_lead_acetate',
    name: 'Hair dye (lead acetate-based) - BANNED',
    category: 'cosmetic',
    leadContentPpm: 6000,
    leadContentRange: { min: 5000, max: 6000 },
    defaultServingGrams: 0.1,
    exposureRoute: 'dermal',
    description: 'BANNED by FDA in 2022. Progressive hair dyes contained lead acetate. Should not be sold in US.',
    exposureExplanation: {
      pathway: 'Scalp -> Dermal absorption (minimal)',
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
    description: 'Modern hair dyes without lead acetate - trace contaminant only',
    exposureExplanation: {
      pathway: 'Scalp -> Dermal absorption (minimal)',
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
