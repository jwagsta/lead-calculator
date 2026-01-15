'use client'

import { useState } from 'react'
import { AgeGroup, Country, ExposureInput, UserProfile, Product, CalculationResult, LeadUnit } from '@/lib/types'
import { calculateBloodLead } from '@/lib/leadModel'
import { COUNTRY_NAMES } from '@/lib/parameters'
import { ProductSelector } from './ProductSelector'
import { ResultsCard } from './ResultsCard'

type Step = 'profile' | 'product' | 'exposure' | 'results'

const STEPS: Step[] = ['profile', 'product', 'exposure', 'results']
const STEP_LABELS: Record<Step, string> = {
  profile: 'Profile',
  product: 'Product',
  exposure: 'Exposure',
  results: 'Results',
}

export function Calculator() {
  const [step, setStep] = useState<Step>('profile')
  const [profile, setProfile] = useState<UserProfile>({ ageGroup: 'adult', country: 'us' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [exposure, setExposure] = useState<Partial<ExposureInput>>({})
  const [result, setResult] = useState<CalculationResult | null>(null)

  const currentStepIndex = STEPS.indexOf(step)

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('product')
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setExposure({
      product,
      amountGrams: product.defaultServingGrams,
      frequencyPerWeek: 7,
      customLeadPpm: undefined,
    })
    setStep('exposure')
  }

  const handleExposureSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    const fullExposure: ExposureInput = {
      product: selectedProduct,
      amountGrams: exposure.amountGrams ?? selectedProduct.defaultServingGrams,
      frequencyPerWeek: exposure.frequencyPerWeek ?? 7,
      customLeadPpm: exposure.customLeadPpm,
      customLeadUgPerServing: exposure.customLeadUgPerServing,
      leadUnit: exposure.leadUnit,
    }

    const calculationResult = calculateBloodLead(fullExposure, profile)
    setResult(calculationResult)
    setStep('results')
  }

  const handleStartOver = () => {
    setStep('profile')
    setProfile({ ageGroup: 'adult', country: 'us' })
    setSelectedProduct(null)
    setExposure({})
    setResult(null)
  }

  // Check if product has high variability in lead content
  const hasVariableLead = selectedProduct?.leadContentRange &&
    (selectedProduct.leadContentRange.max / selectedProduct.leadContentRange.min > 10)

  return (
    <div className="bg-leep-dark border border-leep-gray p-6 font-mono">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  i === currentStepIndex
                    ? 'bg-leep-yellow text-leep-darker border-leep-yellow'
                    : i < currentStepIndex
                    ? 'bg-leep-gray text-leep-light border-leep-gray'
                    : 'bg-transparent text-leep-gray border-leep-gray'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs mt-2 ${
                i === currentStepIndex ? 'text-leep-yellow' : 'text-leep-gray'
              }`}>
                {STEP_LABELS[s]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Profile */}
      {step === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-leep-muted mb-2">Age Group</label>
            <select
              value={profile.ageGroup}
              onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value as AgeGroup })}
              className="w-full p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
            >
              <option value="infant">Infant (6-12 months)</option>
              <option value="toddler">Toddler (1-3 years)</option>
              <option value="child">Child (4-7 years)</option>
              <option value="adult">Adult</option>
              <option value="pregnant">Pregnant or nursing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-leep-muted mb-2">Country</label>
            <select
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value as Country })}
              className="w-full p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
            >
              {(Object.keys(COUNTRY_NAMES) as Country[]).map((c) => (
                <option key={c} value={c}>{COUNTRY_NAMES[c]}</option>
              ))}
            </select>
            <p className="text-xs text-leep-gray mt-1">
              Affects baseline blood lead estimate
            </p>
          </div>

          <div>
            <label className="block text-sm text-leep-muted mb-2">
              Body Weight <span className="text-leep-gray">(optional)</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Auto"
                value={profile.bodyWeightKg ?? ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bodyWeightKg: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-24 p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
              />
              <span className="text-leep-muted">kg</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-leep-yellow hover:brightness-110 text-leep-darker font-bold py-3 px-4 rounded transition-colors"
          >
            Continue
          </button>
        </form>
      )}

      {/* Step 2: Product Selection */}
      {step === 'product' && (
        <div className="space-y-4">
          <ProductSelector onSelect={handleProductSelect} />
          <button
            onClick={() => setStep('profile')}
            className="text-sm text-leep-muted hover:text-leep-yellow transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3: Exposure Details */}
      {step === 'exposure' && selectedProduct && (
        <form onSubmit={handleExposureSubmit} className="space-y-6">
          {/* Product info */}
          <div className="bg-leep-darker border border-leep-gray rounded p-4">
            <div className="font-bold text-leep-light">{selectedProduct.name}</div>
            {selectedProduct.description && (
              <div className="text-sm text-leep-muted mt-1">{selectedProduct.description}</div>
            )}

            {/* Exposure pathway for cosmetics */}
            {selectedProduct.exposureExplanation && (
              <div className="mt-4 pt-4 border-t border-leep-gray">
                <div className="text-xs text-leep-yellow mb-2">Exposure pathway</div>
                <div className="text-sm text-leep-light">
                  {selectedProduct.exposureExplanation.pathway}
                </div>
                <div className="text-xs text-leep-muted mt-2">
                  {selectedProduct.exposureExplanation.details}
                </div>
              </div>
            )}
          </div>

          {/* Lead content selector for variable products */}
          {hasVariableLead && selectedProduct.leadContentRange && (
            <div>
              <label className="block text-sm text-leep-muted mb-2">
                Lead Content
                <span className="text-leep-yellow ml-2">
                  (varies widely: {selectedProduct.leadContentRange.min} - {selectedProduct.leadContentRange.max} ppm)
                </span>
              </label>
              <select
                value={exposure.customLeadPpm ?? selectedProduct.leadContentPpm}
                onChange={(e) => setExposure({ ...exposure, customLeadPpm: Number(e.target.value) })}
                className="w-full p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
              >
                <option value={selectedProduct.leadContentRange.min}>
                  Low ({selectedProduct.leadContentRange.min} ppm) - Modern/regulated product
                </option>
                <option value={selectedProduct.leadContentPpm}>
                  Typical ({selectedProduct.leadContentPpm} ppm) - Average
                </option>
                <option value={selectedProduct.leadContentRange.max * 0.1}>
                  High ({(selectedProduct.leadContentRange.max * 0.1).toFixed(0)} ppm) - Traditional/unregulated
                </option>
                <option value={selectedProduct.leadContentRange.max}>
                  Very High ({selectedProduct.leadContentRange.max} ppm) - Worst case
                </option>
              </select>
              <p className="text-xs text-leep-gray mt-1">
                Lead content varies significantly by source and product
              </p>
            </div>
          )}

          {/* Amount per use */}
          <div>
            <label className="block text-sm text-leep-muted mb-2">Amount per use</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.001"
                value={exposure.amountGrams ?? selectedProduct.defaultServingGrams}
                onChange={(e) => setExposure({ ...exposure, amountGrams: Number(e.target.value) })}
                className="w-28 p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
              />
              <span className="text-leep-muted">grams</span>
            </div>
            <p className="text-xs text-leep-gray mt-1">
              Default: {selectedProduct.defaultServingGrams}g
            </p>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm text-leep-muted mb-2">Frequency</label>
            <select
              value={exposure.frequencyPerWeek ?? 7}
              onChange={(e) => setExposure({ ...exposure, frequencyPerWeek: Number(e.target.value) })}
              className="w-full p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
            >
              <option value={0.25}>Once a month</option>
              <option value={0.5}>Twice a month</option>
              <option value={1}>Once a week</option>
              <option value={2}>Twice a week</option>
              <option value={3}>3x per week</option>
              <option value={5}>5x per week</option>
              <option value={7}>Daily</option>
              <option value={14}>Twice daily</option>
              <option value={21}>Three times daily</option>
            </select>
          </div>

          {/* Custom lead content for custom products */}
          {selectedProduct.category === 'custom' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-leep-muted mb-2">Lead content unit</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setExposure({ ...exposure, leadUnit: 'ppm', customLeadUgPerServing: undefined })}
                    className={`flex-1 py-2 px-3 rounded border text-sm transition-colors ${
                      (exposure.leadUnit ?? 'ppm') === 'ppm'
                        ? 'bg-leep-yellow border-leep-yellow text-leep-darker font-bold'
                        : 'bg-leep-darker border-leep-gray text-leep-muted hover:border-leep-yellow'
                    }`}
                  >
                    ppm (µg/g)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExposure({ ...exposure, leadUnit: 'ug_per_serving', customLeadPpm: undefined })}
                    className={`flex-1 py-2 px-3 rounded border text-sm transition-colors ${
                      exposure.leadUnit === 'ug_per_serving'
                        ? 'bg-leep-yellow border-leep-yellow text-leep-darker font-bold'
                        : 'bg-leep-darker border-leep-gray text-leep-muted hover:border-leep-yellow'
                    }`}
                  >
                    µg/serving
                  </button>
                </div>
              </div>

              {(exposure.leadUnit ?? 'ppm') === 'ppm' ? (
                <div>
                  <label className="block text-sm text-leep-muted mb-2">Lead content (ppm)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={exposure.customLeadPpm ?? ''}
                    onChange={(e) => setExposure({ ...exposure, customLeadPpm: Number(e.target.value) })}
                    className="w-full p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
                    placeholder="Enter ppm (µg per gram)"
                    required
                  />
                  <p className="text-xs text-leep-gray mt-1">
                    ppm = parts per million = µg lead per gram of product
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-leep-muted mb-2">Lead per serving (µg)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={exposure.customLeadUgPerServing ?? ''}
                    onChange={(e) => setExposure({ ...exposure, customLeadUgPerServing: Number(e.target.value) })}
                    className="w-full p-3 border border-leep-gray bg-leep-darker text-leep-light rounded focus:border-leep-yellow focus:outline-none"
                    placeholder="Enter µg per serving"
                    required
                  />
                  <p className="text-xs text-leep-gray mt-1">
                    Total micrograms of lead per serving/use
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep('product')}
              className="flex-1 bg-leep-darker hover:bg-leep-gray/30 text-leep-light font-bold py-3 px-4 rounded border border-leep-gray transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-leep-yellow hover:brightness-110 text-leep-darker font-bold py-3 px-4 rounded transition-colors"
            >
              Calculate
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Results */}
      {step === 'results' && result && selectedProduct && (
        <div className="space-y-6">
          <ResultsCard
            result={result}
            product={selectedProduct}
            exposure={exposure as ExposureInput}
            profile={profile}
          />
          <button
            onClick={handleStartOver}
            className="w-full bg-leep-darker hover:bg-leep-gray/30 text-leep-light font-bold py-3 px-4 rounded border border-leep-gray transition-colors"
          >
            Calculate Another
          </button>
        </div>
      )}
    </div>
  )
}
