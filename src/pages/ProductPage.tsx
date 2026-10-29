import React, { useState } from 'react';
import {
  Star,
  Check,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { Product, Page } from '../types';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface ProductPageProps {
  product: Product;
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onNavigate,
  onSelectProduct
}) => {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onNavigate('checkout');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pb-32 pt-2">
      {/* Breadcrumb */}
      <div className="px-4 mb-2 flex items-center gap-1.5 text-xs text-gray-500 overflow-hidden">
        <button
          onClick={() => onNavigate('catalog')}
          className="hover:text-blue-600 transition-colors cursor-pointer shrink-0"
        >
          Каталог
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-gray-400 truncate shrink-0">{product.category}</span>
      </div>

      {/* Main Image Gallery */}
      <div className="px-4 mb-4">
        <div className="w-full aspect-square rounded-3xl bg-gray-50 overflow-hidden relative shadow-sm border border-gray-100 flex items-center justify-center">
          <img
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-amber-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-sm">
              -{discountPercent}%
            </div>
          )}

          {product.isHit && (
            <div className="absolute top-4 right-4 bg-rose-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
              ХИТ ПРОДАЖ
            </div>
          )}
        </div>

        {/* Thumbnail selector */}
        {product.images.length > 1 && (
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  selectedImageIndex === index
                    ? 'border-blue-600 ring-2 ring-blue-500/20'
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Превью" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="px-4">
        {/* Rating and SKU */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-sm font-bold text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewsCount} отзывов)</span>
          </div>

          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <Check className="w-3 h-3" /> В наличии
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-extrabold text-gray-900 leading-snug mb-1">
          {product.title}
        </h1>
        <p className="text-xs text-gray-500 mb-4">{product.subtitle}</p>

        {/* Price Card */}
        <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Стоимость</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-950">
                {product.price.toLocaleString('ru-RU')} ₸
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₸
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
              Выгода {((product.oldPrice || product.price) - product.price).toLocaleString('ru-RU')} ₸
            </span>
          </div>
        </div>

        {/* Color Variant Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Цвет:{' '}
              <span className="font-normal text-gray-500">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size / Capacity Variant Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-700 mb-2">Размер / Конфигурация:</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">Количество:</span>
          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-2 text-gray-600 hover:bg-gray-200/60 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-gray-600 hover:bg-gray-200/60 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Описание</h2>
          <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-2.5">Характеристики</h2>
          <div className="bg-gray-50 rounded-2xl p-3 divide-y divide-gray-200/60 text-xs border border-gray-100">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="py-2 flex justify-between gap-3">
                <span className="text-gray-500 font-normal">{key}</span>
                <span className="text-gray-900 font-semibold text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Warranty info */}
        <div className="space-y-2.5 mb-8">
          <div className="flex items-start gap-3 p-3 bg-blue-50/60 border border-blue-100 rounded-2xl">
            <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-950">Доставка по Казахстану</h4>
              <p className="text-[11px] text-blue-800">
                Курьером по Алматы в день заказа (бесплатно от 25 000 ₸). В Астану, Шымкент и другие города — 1-3 дня.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Официальная гарантия</h4>
              <p className="text-[11px] text-emerald-800">
                12 месяцев гарантии. Обмен или возврат в течение 14 дней.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/70 rounded-2xl">
            <RotateCcw className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Оплата при получении</h4>
              <p className="text-[11px] text-slate-600">
                Наличными курьеру или картой / Kaspi QR после проверки товара.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Вам также может понравиться</h3>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectProduct(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-2xl border border-gray-100 bg-white shadow-xs cursor-pointer hover:shadow-md transition-all"
                >
                  <img
                    src={rel.images[0]}
                    alt={rel.title}
                    className="w-full aspect-square object-cover rounded-xl mb-2"
                  />
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">
                    {rel.title}
                  </h4>
                  <div className="font-extrabold text-xs text-gray-950 mt-1">
                    {rel.price.toLocaleString('ru-RU')} ₸
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 p-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-xl mx-auto flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Добавлено в корзину</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>В корзину • {(product.price * quantity).toLocaleString('ru-RU')} ₸</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30 transition-all cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>Купить сразу</span>
          </button>
        </div>
      </div>
    </div>
  );
};
