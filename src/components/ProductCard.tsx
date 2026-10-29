import React from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onBuyNow }) => {
  const { addToCart, items } = useCart();

  const cartQuantity = items
    .filter((item) => item.product.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors?.[0]?.name;
    const defaultSize = product.sizes?.[0];
    addToCart(product, 1, defaultColor, defaultSize);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors?.[0]?.name;
    const defaultSize = product.sizes?.[0];
    addToCart(product, 1, defaultColor, defaultSize);
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      <div>
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
          {product.isHit && (
            <span className="bg-rose-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              ХИТ
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              NEW
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-3 relative flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="text-xs font-bold text-gray-800">{product.rating}</span>
          <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Subtitle / Key spec */}
        <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">
          {product.subtitle}
        </p>
      </div>

      {/* Price & Action */}
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between gap-1.5 mt-auto">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline">
            <span className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
              {product.price.toLocaleString('ru-RU')} ₸
            </span>
          </div>
          {product.oldPrice && (
            <span className="text-[10px] text-gray-400 line-through truncate">
              {product.oldPrice.toLocaleString('ru-RU')} ₸
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleQuickAdd}
            aria-label="Добавить в корзину"
            title="Добавить в корзину"
            className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              cartQuantity > 0
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-95'
            }`}
          >
            {cartQuantity > 0 ? (
              <span className="font-bold text-xs">{cartQuantity}</span>
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={handleBuyNow}
            aria-label="Купить сразу"
            className="h-8 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1 shadow-xs shadow-blue-500/20 cursor-pointer"
          >
            <span>Купить</span>
          </button>
        </div>
      </div>
    </div>
  );
};
