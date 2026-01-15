# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Deploy Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build (static export to /out)
npm run lint         # Run ESLint
```

**Deployment**: GitHub Pages via GitHub Actions. Push to `main` triggers automatic deploy to https://jwagsta.github.io/lead-calculator/

## Project Overview

Lead exposure blood level calculator for the Lead Exposure Elimination Project (LEEP). Estimates blood lead contribution (ΔPbB) from food and cosmetic products using EPA biokinetic models.

**Live site**: https://jwagsta.github.io/lead-calculator/

## Architecture

### Core Model (`src/lib/`)

- **leadModel.ts** - Blood lead calculation engine based on EPA Adult Lead Methodology (ALM)
  - Core equation: `ΔPbB = Σ(Ci × IRi × AFi × BKSF × EF/AT)`
  - Supports multiple exposure routes (ingestion, dermal, inhalation)
  - `calculateBloodLead()` - Single exposure calculation
  - `getContributionRiskLevel()` - Assesses contribution as % of CDC reference
- **parameters.ts** - Model constants from NHANES and EPA guidance
  - Country-specific baseline blood lead levels (US, UK, EU, India, China)
  - Age-specific BKSF (biokinetic slope factor) and absorption fractions
  - CDC (3.5 µg/dL) and WHO (5.0, 10.0 µg/dL) reference thresholds
- **types.ts** - TypeScript interfaces for UserProfile, Product, ExposureInput, CalculationResult

### Data Layer (`src/data/`)

- **products.ts** - Lead content database with verified values from:
  - FDA Total Diet Study 2018-2020
  - FDA Baby Food Action Levels (Jan 2025)
  - FDA Cosmetics Testing
  - Pure Earth Kohl Study 2025
  - Consumer Reports chocolate testing
  - PMC turmeric adulteration studies

### UI Components (`src/components/`)

4-step wizard: Profile → Product Selection → Exposure Details → Results

- **Calculator.tsx** - Main wizard state machine, handles variable lead content selector
- **ProductSelector.tsx** - Category browser (Food, Baby Food, Cosmetics, Custom) with search
- **ResultsCard.tsx** - Results display with CDC/WHO thresholds, calculation breakdown

### Key Model Parameters

| Age Group | BKSF | Ingestion Absorption | US Baseline |
|-----------|------|---------------------|-------------|
| Infant    | 0.25 | 50%                 | 0.5 µg/dL   |
| Toddler   | 0.20 | 50%                 | 0.7 µg/dL   |
| Child     | 0.16 | 45%                 | 0.6 µg/dL   |
| Adult     | 0.04 | 20%                 | 0.7 µg/dL   |

Country baselines vary significantly (e.g., India: 3-4 µg/dL due to less regulation).

### Reference Thresholds

- **CDC reference (2021)**: 3.5 µg/dL
- **WHO action level**: 5.0 µg/dL
- **WHO elevated level**: 10.0 µg/dL

Note: WHO states there is NO safe level of lead exposure.

## Design System

**LEEP Color Palette** (defined in `tailwind.config.ts`):
- `leep-yellow`: #ffba5a (primary accent)
- `leep-gray`: #55677f (secondary)
- `leep-dark`: #2d3748 (card backgrounds)
- `leep-darker`: #1a202c (page background)
- `leep-light`: #e2e8f0 (text)
- `leep-muted`: #a0aec0 (secondary text)

**Typography**: IBM Plex Mono (monospace)

## Important Notes

- Products with high variability (max/min > 10) show a lead content selector
- "High" option uses geometric mean: `√(typical × max)`
- Kohl/Surma has two entries: modern (1-100 ppm) vs traditional (1,000-800,000 ppm)
- Custom products support both ppm and µg/serving input units
- Risk assessment evaluates the **contribution**, not total blood lead

## Data Sources

Key references (cited in products.ts):
1. FDA Total Diet Study: https://www.tandfonline.com/doi/full/10.1080/19440049.2024.2396910
2. FDA Baby Food Action Levels: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-action-levels-lead-processed-food-intended-babies-and-young-children
3. FDA Cosmetics: https://www.fda.gov/cosmetics/potential-contaminants-cosmetics/lead-cosmetics
4. Pure Earth Kohl: https://www.pureearth.org/pure-earth-researchers-investigate-lead-contaminated-kohl-sold-in-the-u-s/
5. Turmeric Adulteration: https://pmc.ncbi.nlm.nih.gov/articles/PMC5415259/
