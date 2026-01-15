/**
 * Default parameters for lead exposure calculations
 * Based on EPA Adult Lead Methodology (ALM) and NHANES data
 *
 * Sources:
 * - EPA AALM: https://www.epa.gov/land-research/all-ages-lead-model-aalm
 * - EPA ALM: https://www.epa.gov/superfund/lead-superfund-sites-frequent-questions-risk-assessors-adult-lead-methodology
 * - NHANES 2009-2014 blood lead data
 */

import { AgeGroup, Country, ModelParameters } from './types'

/**
 * Country display names
 */
export const COUNTRY_NAMES: Record<Country, string> = {
  us: 'United States',
  uk: 'United Kingdom',
  eu: 'European Union',
  india: 'India',
  china: 'China',
  other: 'Other',
}

/**
 * Default body weights by age group (kg)
 * Based on CDC growth charts and EPA defaults
 */
export const DEFAULT_BODY_WEIGHTS: Record<AgeGroup, number> = {
  infant: 7.5,    // 6-12 months
  toddler: 12,    // 1-3 years
  child: 22,      // 4-7 years
  adult: 70,      // Adults
  pregnant: 70,   // Pregnant women
}

/**
 * Baseline blood lead levels by country and age group (µg/dL)
 *
 * Sources:
 * - US: NHANES 2009-2014 geometric means
 * - UK: UK Biobank studies
 * - EU: DEMOCOPHES study
 * - India: Various studies (higher due to less regulation)
 * - China: Various studies
 * - Other: Global average estimate
 */
export const BASELINE_BLOOD_LEAD: Record<Country, Record<AgeGroup, number>> = {
  us: {
    infant: 0.5,
    toddler: 0.7,
    child: 0.6,
    adult: 0.7,
    pregnant: 0.5,
  },
  uk: {
    infant: 0.8,
    toddler: 1.0,
    child: 0.9,
    adult: 1.0,
    pregnant: 0.7,
  },
  eu: {
    infant: 0.7,
    toddler: 0.9,
    child: 0.8,
    adult: 0.9,
    pregnant: 0.6,
  },
  india: {
    infant: 3.0,
    toddler: 4.0,
    child: 3.5,
    adult: 4.0,
    pregnant: 3.0,
  },
  china: {
    infant: 2.5,
    toddler: 3.5,
    child: 3.0,
    adult: 3.5,
    pregnant: 2.5,
  },
  other: {
    infant: 1.5,
    toddler: 2.0,
    child: 1.8,
    adult: 2.0,
    pregnant: 1.5,
  },
}

/**
 * CDC Blood Lead Reference Values (µg/dL)
 * As of 2021, the reference value is 3.5 µg/dL for all ages
 * Previously was 5 µg/dL for children
 */
export const CDC_REFERENCE_LEVELS: Record<AgeGroup, number> = {
  infant: 3.5,
  toddler: 3.5,
  child: 3.5,
  adult: 3.5,
  pregnant: 3.5, // More conservative for fetal protection
}

/**
 * WHO Reference Thresholds (µg/dL)
 *
 * WHO states there is NO safe level of lead exposure.
 * These are action/intervention thresholds, not "safe" levels.
 *
 * - 5 µg/dL: Level at which WHO/CDC historically recommended public health action
 * - 10 µg/dL: Historical "elevated blood lead level" threshold (pre-2012)
 *
 * Note: WHO withdrew its provisional tolerable weekly intake (PTWI)
 * for lead in 2010 because no threshold for adverse effects could be established.
 */
export const WHO_THRESHOLDS = {
  // Level at which intervention is recommended
  actionLevel: 5.0,
  // Historical elevated threshold (still referenced in some guidelines)
  elevatedLevel: 10.0,
}

/**
 * Biokinetic Slope Factor (BKSF)
 * µg/dL blood lead per µg/day lead absorbed
 *
 * Literature values range from 0.04 to 0.4 depending on:
 * - Age (children absorb more efficiently)
 * - Nutritional status
 * - Individual variation
 *
 * We use age-adjusted values based on EPA guidance
 */
export const BKSF: Record<AgeGroup, number> = {
  // Children have higher slope factors due to:
  // 1. Lower body weight
  // 2. Higher GI absorption
  // 3. More active bone remodeling
  infant: 0.25,
  toddler: 0.20,
  child: 0.16,
  adult: 0.04,
  pregnant: 0.04,
}

/**
 * Absorption fractions by exposure route
 *
 * Ingestion: EPA default is 50% for food/water in children,
 *            lower for adults. We use conservative estimates.
 *
 * Dermal: Very low (~1%) for intact skin, higher for damaged skin
 *
 * Inhalation: High absorption (30-50%) but rare for consumer products
 */
export const ABSORPTION_FRACTIONS = {
  ingestion: {
    infant: 0.50,    // 50% - higher in young children
    toddler: 0.50,
    child: 0.45,
    adult: 0.20,     // 20% - adults absorb less
    pregnant: 0.20,
  },
  dermal: {
    infant: 0.01,
    toddler: 0.01,
    child: 0.01,
    adult: 0.01,
    pregnant: 0.01,
  },
  inhalation: {
    infant: 0.40,
    toddler: 0.40,
    child: 0.35,
    adult: 0.30,
    pregnant: 0.30,
  },
}

/**
 * Geometric Standard Deviation (GSD)
 * Used to calculate uncertainty ranges
 * From NHANES population variability data
 */
export const GSD: Record<AgeGroup, number> = {
  infant: 1.8,
  toddler: 1.8,
  child: 1.7,
  adult: 1.7,
  pregnant: 1.7,
}

/**
 * Get model parameters for a specific age group and country
 */
export function getModelParameters(
  ageGroup: AgeGroup,
  country: Country,
  bodyWeightKg?: number
): ModelParameters {
  return {
    baselineBloodLead: BASELINE_BLOOD_LEAD[country][ageGroup],
    bksf: BKSF[ageGroup],
    absorptionFractions: {
      ingestion: ABSORPTION_FRACTIONS.ingestion[ageGroup],
      dermal: ABSORPTION_FRACTIONS.dermal[ageGroup],
      inhalation: ABSORPTION_FRACTIONS.inhalation[ageGroup],
    },
    gsd: GSD[ageGroup],
    cdcReferenceLevel: CDC_REFERENCE_LEVELS[ageGroup],
    bodyWeightKg: bodyWeightKg ?? DEFAULT_BODY_WEIGHTS[ageGroup],
    countryName: COUNTRY_NAMES[country],
  }
}
