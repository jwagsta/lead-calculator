'use client'

import { CalculationResult, Product, ExposureInput, UserProfile } from '@/lib/types'
import { formatBloodLead, getContributionRiskLevel } from '@/lib/leadModel'
import { getModelParameters } from '@/lib/parameters'

interface ResultsCardProps {
  result: CalculationResult
  product: Product
  exposure: ExposureInput
  profile: UserProfile
}

export function ResultsCard({ result, product, exposure, profile }: ResultsCardProps) {
  const params = getModelParameters(profile.ageGroup, profile.country, profile.bodyWeightKg)

  // Assess the contribution itself, not the total
  const contributionRisk = getContributionRiskLevel(result.bloodLeadContributionUgDl, result.cdcReferenceLevel)

  // Calculate what percentage of reference level this exposure represents
  const contributionAsPercentOfRef = (result.bloodLeadContributionUgDl / result.cdcReferenceLevel) * 100

  // Get lead content display
  const getLeadContentDisplay = () => {
    if (exposure.leadUnit === 'ug_per_serving' && exposure.customLeadUgPerServing !== undefined) {
      return `${exposure.customLeadUgPerServing} µg/serving`
    }
    return `${exposure.customLeadPpm ?? product.leadContentPpm} ppm`
  }

  return (
    <div className="space-y-6 font-mono">
      {/* Primary output: Exposure contribution */}
      <div className="border-2 border-leep-yellow bg-leep-darker p-6 rounded">
        <div className="text-center">
          <div className="text-sm text-leep-muted mb-2">THIS EXPOSURE ADDS</div>
          <div className="text-4xl font-bold text-leep-yellow">
            +{formatBloodLead(result.bloodLeadContributionUgDl)} µg/dL
          </div>
          <div className="text-sm text-leep-muted mt-2">to your blood lead level</div>
        </div>
      </div>

      {/* Context section */}
      <div className="border border-leep-gray p-4 rounded">
        <div className="text-xs text-leep-muted mb-3">Context</div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-leep-muted">Baseline ({params.countryName}):</span>
            <span className="text-leep-light">{params.baselineBloodLead} µg/dL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-leep-muted">+ This exposure:</span>
            <span className="text-leep-yellow font-bold">+{formatBloodLead(result.bloodLeadContributionUgDl)} µg/dL</span>
          </div>
          <div className="border-t border-leep-gray pt-2 flex justify-between">
            <span className="text-leep-muted">Estimated total:</span>
            <span className="text-leep-light font-bold">{formatBloodLead(result.estimatedBloodLeadUgDl)} µg/dL</span>
          </div>
        </div>

        {/* Reference thresholds */}
        <div className="mt-4 pt-3 border-t border-leep-gray">
          <div className="text-xs text-leep-muted mb-2">Reference thresholds</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-leep-gray">CDC reference (2021):</span>
              <span className={result.estimatedBloodLeadUgDl > result.referenceThresholds.cdc ? 'text-orange-400' : 'text-leep-gray'}>
                {result.referenceThresholds.cdc} µg/dL
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-leep-gray">WHO action level:</span>
              <span className={result.estimatedBloodLeadUgDl > result.referenceThresholds.whoAction ? 'text-orange-400' : 'text-leep-gray'}>
                {result.referenceThresholds.whoAction} µg/dL
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-leep-gray">WHO elevated level:</span>
              <span className={result.estimatedBloodLeadUgDl > result.referenceThresholds.whoElevated ? 'text-red-400' : 'text-leep-gray'}>
                {result.referenceThresholds.whoElevated} µg/dL
              </span>
            </div>
          </div>
          <p className="text-xs text-leep-gray mt-2 italic">
            Note: WHO states there is no safe level of lead exposure.
          </p>
        </div>
      </div>

      {/* Contribution risk indicator */}
      <div className={`border p-3 text-sm rounded ${
        contributionRisk === 'low' ? 'border-green-600 bg-green-900/20' :
        contributionRisk === 'moderate' ? 'border-leep-yellow bg-yellow-900/20' :
        contributionRisk === 'elevated' ? 'border-orange-500 bg-orange-900/20' :
        'border-red-500 bg-red-900/20'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`font-bold ${
            contributionRisk === 'low' ? 'text-green-400' :
            contributionRisk === 'moderate' ? 'text-leep-yellow' :
            contributionRisk === 'elevated' ? 'text-orange-400' :
            'text-red-400'
          }`}>
            {contributionRisk === 'low' && '○'}
            {contributionRisk === 'moderate' && '◐'}
            {contributionRisk === 'elevated' && '◑'}
            {contributionRisk === 'high' && '●'}
          </span>
          <span className="text-leep-light">
            {contributionRisk === 'low' && 'Minimal contribution'}
            {contributionRisk === 'moderate' && 'Moderate contribution'}
            {contributionRisk === 'elevated' && 'Significant contribution'}
            {contributionRisk === 'high' && 'High contribution - consider reducing'}
          </span>
        </div>
        <div className="text-xs text-leep-muted mt-1 ml-5">
          This exposure adds ~{contributionAsPercentOfRef.toFixed(1)}% of the CDC reference level
        </div>
      </div>

      {/* Calculation breakdown (collapsible feel) */}
      <details className="border border-leep-gray rounded">
        <summary className="p-3 cursor-pointer text-sm text-leep-light hover:bg-leep-gray/20">
          Calculation breakdown
        </summary>
        <div className="p-4 border-t border-leep-gray bg-leep-darker text-xs space-y-3">
          <div>
            <div className="text-leep-muted mb-1">Input:</div>
            <div className="pl-2 space-y-1 text-leep-light">
              <div>Product: {product.name}</div>
              <div>Lead content: {getLeadContentDisplay()}</div>
              <div>Amount: {exposure.amountGrams}g × {exposure.frequencyPerWeek >= 7
                ? `${exposure.frequencyPerWeek / 7}/day`
                : `${exposure.frequencyPerWeek}/week`}
              </div>
            </div>
          </div>

          <div>
            <div className="text-leep-muted mb-1">Calculation:</div>
            <div className="pl-2 space-y-1 font-mono bg-leep-dark p-2 border border-leep-gray rounded text-leep-light">
              <div>Daily intake: {result.dailyLeadIntakeUg.toFixed(3)} µg/day</div>
              <div>× Absorption ({(params.absorptionFractions[product.exposureRoute] * 100).toFixed(0)}%): {result.dailyAbsorbedLeadUg.toFixed(3)} µg/day</div>
              <div>× BKSF ({params.bksf}): <span className="text-leep-yellow font-bold">+{formatBloodLead(result.bloodLeadContributionUgDl)} µg/dL</span></div>
            </div>
          </div>

          {/* Exposure pathway for cosmetics */}
          {product.exposureExplanation && (
            <div>
              <div className="text-leep-muted mb-1">Exposure pathway:</div>
              <div className="pl-2 text-leep-light">
                {product.exposureExplanation.pathway}
              </div>
            </div>
          )}
        </div>
      </details>

      {/* Brief note (not a blocking disclaimer) */}
      <div className="text-xs text-leep-gray pt-2 border-t border-leep-gray">
        Estimate based on EPA biokinetic models. Individual results vary.
        For accurate measurement, get a blood lead test.
      </div>
    </div>
  )
}
