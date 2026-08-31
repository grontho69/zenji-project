'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Marquee } from '@/components/Marquee';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { Footer } from '@/components/Footer';
import { PRODUCTS, Product } from '@/data/products';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  ChevronDown, 
  X, 
  Layers, 
  Sparkles,
  ArrowUpDown,
  Filter
} from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'low-stock' | 'weight-desc';
type FitOption = 'all' | 'oversized' | 'boxy' | 'tactical' | 'standard';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFit, setSelectedFit] = useState<FitOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Categories list
  const categoryFilters = [
    { id: 'all', label: 'All Artifacts', count: PRODUCTS.length },
    { id: 'hoodies', label: 'Hoodies', count: PRODUCTS.filter(p => p.category === 'hoodies').length },
    { id: 'tees', label: 'Tees', count: PRODUCTS.filter(p => p.category === 'tees').length },
    { id: 'pants', label: 'Pants', count: PRODUCTS.filter(p => p.category === 'pants').length },
    { id: 'sweaters', label: 'Knitwear', count: PRODUCTS.filter(p => p.category === 'sweaters').length },
    { id: 'accessories', label: 'Accessories', count: PRODUCTS.filter(p => p.category === 'accessories').length },
  ];

  // Fit filters
  const fitFilters: { id: FitOption; label: string }[] = [
    { id: 'all', label: 'All Fits' },
    { id: 'oversized', label: 'Oversized' },
    { id: 'boxy', label: 'Boxy Silhouette' },
    { id: 'tactical', label: 'Tactical / Articulated' },
  ];

  // Filter and sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Fit filter
    if (selectedFit !== 'all') {
      result = result.filter((p) => {
        const fitLower = p.fit.toLowerCase();
        if (selectedFit === 'oversized') return fitLower.includes('oversized');
        if (selectedFit === 'boxy') return fitLower.includes('boxy');
        if (selectedFit === 'tactical') return fitLower.includes('tactical') || fitLower.includes('taper');
        return true;
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.japaneseTitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.dropNumber.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'low-stock':
        result.sort((a, b) => a.stockCount - b.stockCount);
        break;
      case 'weight-desc':
        result.sort((a, b) => b.gsmWeight - a.gsmWeight);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedFit, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFit('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedFit !== 'all' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-obsidian text-cyber-white flex flex-col selection:bg-crimson selection:text-white">
      {/* Navigation */}
      <Navbar onCategorySelect={(cat) => setSelectedCategory(cat)} />
      <Marquee />

      {/* Header Banner */}
      <div className="border-b border-border bg-charcoal/40 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted mb-2">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                <span>ARCHIVE REPOSITORY // 全製品</span>
                <span className="text-gold">◆ DROP 001</span>
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-cyber-white uppercase">
                CATALOG ARCHIVE
              </h1>
              <p className="font-japanese text-xs sm:text-sm text-cyber-muted mt-1">
                サイバーパンク・ストリートウェア // 公式カタログ
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3.5 py-2 bg-obsidian border border-border flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-gold" />
                <span>SPEC: 300–520 GSM</span>
              </div>
              <div className="px-3.5 py-2 bg-obsidian border border-border flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-crimson" />
                <span>WORLDWIDE EXPRESS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filter & Sort Bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-obsidian/90 backdrop-blur-md border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            {/* Desktop Category Pills */}
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categoryFilters.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider transition-all whitespace-nowrap border ${
                      isActive
                        ? 'bg-crimson border-crimson text-white shadow-neon-crimson'
                        : 'bg-charcoal border-border text-cyber-gray hover:text-cyber-white hover:border-cyber-muted'
                    }`}
                  >
                    {cat.label}
                    {cat.count > 0 && (
                      <span className={`ml-1.5 text-[10px] ${isActive ? 'text-white/80' : 'text-cyber-muted'}`}>
                        ({cat.count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex md:hidden items-center justify-between gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 py-2 px-3 bg-charcoal border border-border flex items-center justify-center gap-2 font-mono text-xs font-bold text-cyber-white hover:border-crimson"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-crimson" />
                <span>FILTERS & FIT ({hasActiveFilters ? 'ACTIVE' : 'ALL'})</span>
              </button>

              <div className="w-44">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full py-2 px-2.5 bg-charcoal border border-border font-mono text-xs text-cyber-white focus:outline-none focus:border-crimson"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="low-stock">Low Stock First</option>
                  <option value="weight-desc">GSM Weight: Heavy First</option>
                </select>
              </div>
            </div>

            {/* Desktop Controls (Fit Filter, Search, Sort) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search telemetry..."
                  className="pl-8 pr-3 py-1.5 w-44 lg:w-52 bg-charcoal border border-border text-xs font-mono text-cyber-white placeholder-cyber-muted focus:outline-none focus:border-crimson transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Fit Dropdown */}
              <div className="relative">
                <select
                  value={selectedFit}
                  onChange={(e) => setSelectedFit(e.target.value as FitOption)}
                  className="py-1.5 px-3 bg-charcoal border border-border font-mono text-xs text-cyber-white focus:outline-none focus:border-crimson cursor-pointer"
                >
                  {fitFilters.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="py-1.5 px-3 bg-charcoal border border-border font-mono text-xs text-cyber-white focus:outline-none focus:border-crimson cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Sort: Price (Low → High)</option>
                  <option value="price-desc">Sort: Price (High → Low)</option>
                  <option value="low-stock">Sort: Low Stock First</option>
                  <option value="weight-desc">Sort: Heaviest GSM First</option>
                </select>
              </div>

              {/* Reset button if filtered */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  title="Reset all filters"
                  className="p-1.5 text-cyber-muted hover:text-crimson hover:bg-charcoal border border-border transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Dynamic Count Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cyber-muted">SHOWING</span>
            <span className="font-bold text-cyber-white px-2 py-0.5 bg-charcoal border border-border">
              {filteredAndSortedProducts.length}
            </span>
            <span className="text-cyber-muted">OF {PRODUCTS.length} ARCHIVE ITEMS</span>
          </div>

          <div className="flex items-center gap-3 text-cyber-muted">
            {selectedFit !== 'all' && (
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 bg-crimson/10 border border-crimson/40 text-crimson">
                FIT: {selectedFit.toUpperCase()}
              </span>
            )}
            <span className="text-gold">ALLOCATIONS FINAL</span>
          </div>
        </div>

        {/* Product Grid / Empty State */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-charcoal/30 border border-border/60 p-8">
            <div className="w-16 h-16 bg-obsidian border border-crimson/60 flex items-center justify-center text-crimson shadow-neon-crimson">
              <Filter className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-cyber-white">
                NO ARTIFACTS MATCH SELECTED TELEMETRY
              </h3>
              <p className="font-mono text-xs text-cyber-muted max-w-md mx-auto">
                Try adjusting your category, silhouette fit, or search keywords to locate corresponding archive items.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2.5 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-neon-crimson transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET ALL FILTERS</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setActiveQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div 
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-charcoal border-l border-border p-6 flex flex-col justify-between shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h3 className="font-heading font-bold text-sm text-cyber-white tracking-wider">
                    FILTER TELEMETRY
                  </h3>
                  <button 
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-cyber-muted hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <span className="font-mono text-xs text-cyber-muted block">CATEGORY</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categoryFilters.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`py-2 px-2 text-[11px] font-mono font-bold border text-left truncate ${
                          selectedCategory === cat.id
                            ? 'bg-crimson border-crimson text-white'
                            : 'bg-obsidian border-border text-cyber-gray'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fit Selection */}
                <div className="space-y-2">
                  <span className="font-mono text-xs text-cyber-muted block">SILHOUETTE / FIT</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {fitFilters.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFit(f.id)}
                        className={`py-2 px-3 text-xs font-mono font-bold border text-left ${
                          selectedFit === f.id
                            ? 'bg-crimson border-crimson text-white'
                            : 'bg-obsidian border-border text-cyber-gray'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="pt-6 border-t border-border space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs font-bold tracking-wider shadow-neon-crimson"
                >
                  APPLY FILTERS ({filteredAndSortedProducts.length})
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      resetFilters();
                      setMobileFilterOpen(false);
                    }}
                    className="w-full py-2.5 bg-obsidian border border-border text-cyber-gray hover:text-white font-mono text-xs"
                  >
                    RESET ALL
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Telemetry Modal */}
      <ProductModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
