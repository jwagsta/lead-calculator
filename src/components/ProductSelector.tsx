'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import {
  ALL_PRODUCTS,
  FOOD_PRODUCTS,
  BABY_FOOD_PRODUCTS,
  COSMETIC_PRODUCTS,
  CUSTOM_PRODUCT,
} from '@/data/products'

interface ProductSelectorProps {
  onSelect: (product: Product) => void
}

type Category = 'all' | 'food' | 'baby_food' | 'cosmetic' | 'custom'

export function ProductSelector({ onSelect }: ProductSelectorProps) {
  const [category, setCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getProducts = (): Product[] => {
    let products: Product[]

    switch (category) {
      case 'food':
        products = FOOD_PRODUCTS
        break
      case 'baby_food':
        products = BABY_FOOD_PRODUCTS
        break
      case 'cosmetic':
        products = COSMETIC_PRODUCTS
        break
      case 'custom':
        return [CUSTOM_PRODUCT]
      default:
        products = ALL_PRODUCTS
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      )
    }

    return products
  }

  const products = getProducts()

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'food', label: 'Food' },
    { value: 'baby_food', label: 'Baby Food' },
    { value: 'cosmetic', label: 'Cosmetics' },
    { value: 'custom', label: 'Custom' },
  ]

  return (
    <div className="space-y-4 font-mono">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 text-sm">
        {categories.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCategory(tab.value)}
            className={`px-3 py-1 border rounded transition-colors ${
              category === tab.value
                ? 'bg-leep-yellow border-leep-yellow text-leep-darker font-bold'
                : 'bg-leep-darker border-leep-gray text-leep-muted hover:border-leep-yellow hover:text-leep-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      {category !== 'custom' && (
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-leep-gray bg-leep-darker text-leep-light focus:border-leep-yellow focus:outline-none font-mono text-sm rounded"
        />
      )}

      {/* Product list */}
      <div className="max-h-72 overflow-y-auto border border-leep-gray rounded">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            className={`w-full text-left p-3 hover:bg-leep-gray/30 transition-colors ${
              index !== products.length - 1 ? 'border-b border-leep-gray' : ''
            }`}
          >
            <div className="text-sm font-bold text-leep-light">{product.name}</div>
            {product.description && (
              <div className="text-xs text-leep-muted mt-1">{product.description}</div>
            )}
            <div className="text-xs text-leep-gray mt-1">
              {product.category === 'custom' ? (
                'Enter your own values'
              ) : (
                <>
                  {product.leadContentPpm} ppm
                  {product.leadContentRange && (
                    <span className="text-leep-gray">
                      {' '}(range: {product.leadContentRange.min}-{product.leadContentRange.max})
                    </span>
                  )}
                </>
              )}
            </div>
          </button>
        ))}

        {products.length === 0 && (
          <div className="text-center text-leep-muted py-8 text-sm">
            No products found
          </div>
        )}
      </div>
    </div>
  )
}
