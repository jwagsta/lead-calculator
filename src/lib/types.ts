/**
 * Types for the lead exposure calculator
 */

export type AgeGroup = 'infant' | 'toddler' | 'child' | 'adult' | 'pregnant'

export type ExposureRoute = 'ingestion' | 'dermal' | 'inhalation'

export type ProductCategory = 'food' | 'beverage' | 'baby_food' | 'cosmetic' | 'custom'

export type Country = 'us' | 'uk' | 'eu' | 'india' | 'china' | 'other'

export interface UserProfile {
  ageGroup: AgeGroup
  country: Country
  bodyWeightKg?: number // Optional, uses defaults if not provided
  isPregnantOrNursing?: boolean
}

export interface ExposureExplanation {
  pathway: string // e.g., "Applied to lips → Licked/eaten → GI tract"
  details: string // More detailed explanation
  effectiveDose?: string // e.g., "~24mg applied, most ingested"
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  leadContentPpm: number // parts per million (µg/g)
  leadContentRange?: { min: number; max: number }
  defaultServingGrams: number
  exposureRoute: ExposureRoute
  description?: string
  exposureExplanation?: ExposureExplanation // For cosmetics explaining route
}

export type LeadUnit = 'ppm' | 'ug_per_serving'

export interface ExposureInput {
  product: Product
  amountGrams: number // How much per use
  frequencyPerWeek: number // How many times per week
  customLeadPpm?: number // Override product default (ppm = µg/g)
  customLeadUgPerServing?: number // Alternative: µg per serving
  leadUnit?: LeadUnit // Which unit is being used for custom input
}

export interface ReferenceThresholds {
  cdc: number // CDC Blood Lead Reference Value (3.5 µg/dL as of 2021)
  whoAction: number // WHO level of concern for action (5 µg/dL)
  whoElevated: number // Historical elevated level (10 µg/dL)
}

export interface CalculationResult {
  // Blood lead contribution from this exposure
  bloodLeadContributionUgDl: number

  // Total estimated blood lead (baseline + contribution)
  estimatedBloodLeadUgDl: number

  // Uncertainty range (using GSD)
  range: {
    low: number // 5th percentile
    high: number // 95th percentile
  }

  // Risk assessment
  exceedsCdcReference: boolean
  cdcReferenceLevel: number

  // Reference thresholds for context
  referenceThresholds: ReferenceThresholds

  // Daily lead intake in micrograms
  dailyLeadIntakeUg: number

  // Daily absorbed lead in micrograms
  dailyAbsorbedLeadUg: number
}

export interface ModelParameters {
  // Baseline blood lead (µg/dL)
  baselineBloodLead: number

  // Biokinetic slope factor (µg/dL per µg/day absorbed)
  bksf: number

  // Absorption fractions by route
  absorptionFractions: {
    ingestion: number
    dermal: number
    inhalation: number
  }

  // Geometric standard deviation for uncertainty
  gsd: number

  // CDC blood lead reference value
  cdcReferenceLevel: number

  // Body weight in kg
  bodyWeightKg: number

  // Country name for display
  countryName: string
}
