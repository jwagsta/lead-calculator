/**
 * Lead Exposure Blood Level Calculator
 *
 * Implements a simplified linear model based on EPA's Adult Lead Methodology (ALM)
 * for estimating blood lead concentrations from environmental exposures.
 *
 * Core Equation:
 * ΔPbB = Σ(Ci × IRi × AFi × BKSF × EF/AT)
 *
 * Where:
 * - ΔPbB = change in blood lead concentration (µg/dL)
 * - Ci = lead concentration in media i (µg/g = ppm)
 * - IRi = intake rate of media i (g/day)
 * - AFi = absorption fraction for media i
 * - BKSF = biokinetic slope factor (µg/dL per µg/day absorbed)
 * - EF = exposure frequency (days/year)
 * - AT = averaging time (365 days/year)
 *
 * References:
 * - EPA AALM: https://www.epa.gov/land-research/all-ages-lead-model-aalm
 * - EPA ALM: https://www.epa.gov/superfund/lead-superfund-sites-frequent-questions-risk-assessors-adult-lead-methodology
 */

import {
  ExposureInput,
  CalculationResult,
  UserProfile,
  ReferenceThresholds,
} from './types'
import { getModelParameters, WHO_THRESHOLDS } from './parameters'

/**
 * Calculate blood lead contribution from a single exposure
 */
/**
 * Calculate lead content in µg per serving from either PPM or direct µg input
 */
function getLeadUgPerServing(exposure: ExposureInput): number {
  // If user provided µg per serving directly, use that
  if (exposure.leadUnit === 'ug_per_serving' && exposure.customLeadUgPerServing !== undefined) {
    return exposure.customLeadUgPerServing
  }

  // Otherwise calculate from PPM (µg/g) × serving size (g)
  const leadPpm = exposure.customLeadPpm ?? exposure.product.leadContentPpm
  return leadPpm * exposure.amountGrams
}

export function calculateBloodLead(
  exposure: ExposureInput,
  profile: UserProfile
): CalculationResult {
  const params = getModelParameters(profile.ageGroup, profile.country, profile.bodyWeightKg)

  // Get lead per serving in µg
  const leadUgPerServing = getLeadUgPerServing(exposure)

  // Calculate daily lead intake (µg/day)
  // frequency is per week, convert to daily
  const dailyLeadIntakeUg = (leadUgPerServing * exposure.frequencyPerWeek) / 7

  // Get absorption fraction for exposure route
  const absorptionFraction = params.absorptionFractions[exposure.product.exposureRoute]

  // Calculate daily absorbed lead (µg/day)
  const dailyAbsorbedLeadUg = dailyLeadIntakeUg * absorptionFraction

  // Calculate blood lead contribution using BKSF
  // For chronic exposure (EF/AT = 1), simplifies to:
  // ΔPbB = absorbed_lead × BKSF
  const bloodLeadContributionUgDl = dailyAbsorbedLeadUg * params.bksf

  // Total estimated blood lead
  const estimatedBloodLeadUgDl = params.baselineBloodLead + bloodLeadContributionUgDl

  // Calculate uncertainty range using log-normal distribution
  // 5th and 95th percentiles
  const logGsd = Math.log(params.gsd)
  const range = {
    low: estimatedBloodLeadUgDl * Math.exp(-1.645 * logGsd),
    high: estimatedBloodLeadUgDl * Math.exp(1.645 * logGsd),
  }

  // Reference thresholds for context
  const referenceThresholds: ReferenceThresholds = {
    cdc: params.cdcReferenceLevel,
    whoAction: WHO_THRESHOLDS.actionLevel,
    whoElevated: WHO_THRESHOLDS.elevatedLevel,
  }

  return {
    bloodLeadContributionUgDl,
    estimatedBloodLeadUgDl,
    range,
    exceedsCdcReference: estimatedBloodLeadUgDl > params.cdcReferenceLevel,
    cdcReferenceLevel: params.cdcReferenceLevel,
    referenceThresholds,
    dailyLeadIntakeUg,
    dailyAbsorbedLeadUg,
  }
}

/**
 * Calculate cumulative blood lead from multiple exposures
 */
export function calculateCumulativeBloodLead(
  exposures: ExposureInput[],
  profile: UserProfile
): CalculationResult {
  const params = getModelParameters(profile.ageGroup, profile.country, profile.bodyWeightKg)

  let totalDailyLeadIntakeUg = 0
  let totalDailyAbsorbedLeadUg = 0

  for (const exposure of exposures) {
    const leadUgPerServing = getLeadUgPerServing(exposure)
    const dailyLeadIntakeUg = (leadUgPerServing * exposure.frequencyPerWeek) / 7
    const absorptionFraction = params.absorptionFractions[exposure.product.exposureRoute]

    totalDailyLeadIntakeUg += dailyLeadIntakeUg
    totalDailyAbsorbedLeadUg += dailyLeadIntakeUg * absorptionFraction
  }

  const bloodLeadContributionUgDl = totalDailyAbsorbedLeadUg * params.bksf
  const estimatedBloodLeadUgDl = params.baselineBloodLead + bloodLeadContributionUgDl

  const logGsd = Math.log(params.gsd)
  const range = {
    low: estimatedBloodLeadUgDl * Math.exp(-1.645 * logGsd),
    high: estimatedBloodLeadUgDl * Math.exp(1.645 * logGsd),
  }

  // Reference thresholds for context
  const referenceThresholds: ReferenceThresholds = {
    cdc: params.cdcReferenceLevel,
    whoAction: WHO_THRESHOLDS.actionLevel,
    whoElevated: WHO_THRESHOLDS.elevatedLevel,
  }

  return {
    bloodLeadContributionUgDl,
    estimatedBloodLeadUgDl,
    range,
    exceedsCdcReference: estimatedBloodLeadUgDl > params.cdcReferenceLevel,
    cdcReferenceLevel: params.cdcReferenceLevel,
    referenceThresholds,
    dailyLeadIntakeUg: totalDailyLeadIntakeUg,
    dailyAbsorbedLeadUg: totalDailyAbsorbedLeadUg,
  }
}

/**
 * Format blood lead result for display
 */
export function formatBloodLead(value: number): string {
  if (value < 0.01) {
    return '< 0.01'
  }
  if (value < 1) {
    return value.toFixed(2)
  }
  return value.toFixed(1)
}

/**
 * Get contribution risk level description
 *
 * This assesses how significant the CONTRIBUTION is, not the total blood lead.
 * Based on what percentage of the CDC reference level this single exposure adds.
 *
 * Thresholds:
 * - < 1% of reference: negligible/low
 * - 1-5% of reference: moderate
 * - 5-15% of reference: elevated
 * - > 15% of reference: high
 */
export function getContributionRiskLevel(
  contribution: number,
  cdcReference: number
): 'low' | 'moderate' | 'elevated' | 'high' {
  const percentOfReference = (contribution / cdcReference) * 100

  if (percentOfReference < 1) return 'low'
  if (percentOfReference < 5) return 'moderate'
  if (percentOfReference < 15) return 'elevated'
  return 'high'
}

/**
 * Get total blood lead risk level
 * Based on how total blood lead compares to reference thresholds
 */
export function getTotalRiskLevel(
  totalBloodLead: number,
  cdcReference: number
): 'low' | 'moderate' | 'elevated' | 'high' {
  const ratio = totalBloodLead / cdcReference

  if (ratio < 0.5) return 'low'
  if (ratio < 1.0) return 'moderate'
  if (ratio < 2.0) return 'elevated'
  return 'high'
}

/**
 * @deprecated Use getContributionRiskLevel or getTotalRiskLevel instead
 */
export function getRiskLevel(
  estimatedBloodLead: number,
  cdcReference: number
): 'low' | 'moderate' | 'elevated' | 'high' {
  return getTotalRiskLevel(estimatedBloodLead, cdcReference)
}

/**
 * Get risk level color for UI (using LEEP colors)
 */
export function getRiskColor(riskLevel: 'low' | 'moderate' | 'elevated' | 'high'): string {
  switch (riskLevel) {
    case 'low':
      return 'text-green-600'
    case 'moderate':
      return 'text-leep-yellow'
    case 'elevated':
      return 'text-orange-500'
    case 'high':
      return 'text-red-600'
  }
}
