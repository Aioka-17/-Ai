import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Sparkles, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface CatalogPageProps {
  onSelectProduct: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelectProduct, onBuyNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'Все') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.oldPrice ? (a.oldPrice - a.price) : 0;
          const discountB = b.oldPrice ? (b.oldPrice - b.price) : 0;
          return discountB - discountA;
        });
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0) || b.reviewsCount - a.reviewsCount);
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pb-24 pt-2">
      {/* Search Input Bar */}
      <div className="px-4 mb-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по товарам и категориям..."
            className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full"
              aria-label="Очистить поиск"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Banner */}
      {!searchQuery && selectedCategory === 'Все' && (
        <div className="px-4 mb-4">
          <div className="relative rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-5 text-white overflow-hidden shadow-lg shadow-indigo-500/15">
            <div className="relative z-10 max-w-[75%]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" /> Спецпредложение
              </span>
              <h2 className="text-xl font-extrabold tracking-tight leading-tight mb-1">
                Гаджеты нового поколения
              </h2>
              <p className="text-xs text-blue-100 mb-3">
                Бесплатная доставка по всему Казахстану при заказе от 25 000 ₸
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold bg-amber-400 text-gray-950 px-2.5 py-1 rounded-lg">
                  Промокод: SALE10 (-10%)
                </span>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute right-2 -bottom-4 w-32 h-32 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />
            <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />
          </div>
        </div>
      )}

      {/* Categories Scroll */}
      <div className="mb-4">
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/80 active:scale-95'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters & Sorting Bar */}
      <div className="px-4 mb-3 flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">
          Найдено: <strong className="text-gray-900">{filteredProducts.length}</strong>
        </span>

        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent font-medium text-gray-700 hover:text-gray-900 cursor-pointer focus:outline-none pr-1"
          >
            <option value="popular">По популярности</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="rating">По рейтингу</option>
            <option value="discount">По размеру скидки</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
            <div className="w-12 h-12 rounded-full bg-gray-200/70 flex items-center justify-center mx-auto mb-3 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Ничего не нашлось</h3>
            <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
              Попробуйте изменить поисковый запрос или выберите другую категорию.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Все');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Advantages Banner */}
      <div className="px-4 mt-8">
        <div className="bg-gradient-to-b from-gray-50 to-gray-100/70 rounded-2xl p-4 border border-gray-200/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Преимущества SULŪ Store
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-gray-900 leading-tight">100% Оригинал</span>
              <span className="text-[10px] text-gray-500">Гарантия 1 год</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-gray-900 leading-tight">Доставка за 24ч</span>
              <span className="text-[10px] text-gray-500">По Алматы и РК</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                <RefreshCw className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-gray-900 leading-tight">14 дней обмен</span>
              <span className="text-[10px] text-gray-500">Без лишних слов</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
