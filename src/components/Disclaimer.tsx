'use client'

interface DisclaimerProps {
  onAccept: () => void
}

export function Disclaimer({ onAccept }: DisclaimerProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Important Information
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            This calculator provides <strong>estimates only</strong> based on mathematical
            models derived from EPA research. It is intended for educational purposes.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h3 className="font-semibold text-amber-800 mb-2">This tool does NOT:</h3>
            <ul className="list-disc list-inside text-amber-700 space-y-1">
              <li>Replace laboratory blood lead testing</li>
              <li>Provide medical advice or diagnosis</li>
              <li>Account for all individual factors affecting lead absorption</li>
              <li>Consider existing lead body burden from past exposures</li>
            </ul>
          </div>

          <p>
            The calculations are based on EPA&apos;s Adult Lead Methodology and related
            biokinetic models. Actual blood lead levels depend on many factors including
            genetics, nutrition, age, and overall health.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="font-semibold text-blue-800 mb-2">If you are concerned about lead exposure:</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Consult with a healthcare provider</li>
              <li>Request a blood lead test for accurate measurement</li>
              <li>Contact your local health department for guidance</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500">
            Model sources: EPA All Ages Lead Model (AALM), EPA Adult Lead Methodology (ALM),
            NHANES blood lead population data.
          </p>
        </div>
      </div>

      <button
        onClick={onAccept}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        I Understand - Continue to Calculator
      </button>
    </div>
  )
}
