# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run tests (vitest)
```

## Architecture

Lead exposure blood level calculator web app using EPA biokinetic models.

### Core Model (`src/lib/`)

- **leadModel.ts** - Blood lead calculation engine based on EPA Adult Lead Methodology (ALM)
  - Core equation: `ΔPbB = Σ(Ci × IRi × AFi × BKSF × EF/AT)`
  - Supports multiple exposure routes (ingestion, dermal, inhalation)
- **parameters.ts** - Default values from NHANES and EPA guidance (baseline blood lead, absorption fractions, BKSF by age group)
- **types.ts** - TypeScript interfaces for UserProfile, Product, ExposureInput, CalculationResult

### Data Layer (`src/data/`)

- **products.ts** - Lead content database for foods, baby foods, and cosmetics with typical ppm values and serving sizes

### UI Flow (`src/components/`)

4-step wizard: Profile → Product Selection → Exposure Details → Results

Key components:
- **Calculator.tsx** - Main wizard state machine
- **ProductSelector.tsx** - Category browser with search
- **ResultsCard.tsx** - Visual results with risk gauge and breakdown
- **Disclaimer.tsx** - Required acceptance before use

### Key Model Parameters

| Age Group | BKSF | Ingestion Absorption | Baseline PbB |
|-----------|------|---------------------|--------------|
| Infant    | 0.25 | 50%                 | 0.5 µg/dL    |
| Toddler   | 0.20 | 50%                 | 0.7 µg/dL    |
| Child     | 0.16 | 45%                 | 0.6 µg/dL    |
| Adult     | 0.04 | 20%                 | 0.7 µg/dL    |

CDC reference level: 3.5 µg/dL (2021)
