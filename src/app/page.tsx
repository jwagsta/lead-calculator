import { Calculator } from '@/components/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-leep-darker py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 font-mono">
          <h1 className="text-xl font-bold text-leep-yellow tracking-wide">
            LEAD EXPOSURE CALCULATOR
          </h1>
          <p className="text-sm text-leep-muted mt-2">
            Estimate blood lead contribution from products
          </p>
        </div>

        <Calculator />

        <div className="mt-8 text-center text-xs text-leep-gray font-mono">
          <p>Based on EPA biokinetic models</p>
          <p className="mt-1">
            <a
              href="https://leadelimination.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-leep-muted hover:text-leep-yellow transition-colors"
            >
              leadelimination.org
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
