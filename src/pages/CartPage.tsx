import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Truck,
  RotateCcw
} from 'lucide-react';
import { Page, Product } from '../types';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setInputCode('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  if (items.length === 0) {
    return (
      <div className="px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Ваша корзина пуста</h2>
        <p className="text-xs text-gray-500 mb-6 max-w-xs mx-auto leading-relaxed">
          Самое время выбрать что-нибудь классное из нашего каталога электроники и аксессуаров.
        </p>
        <button
          onClick={() => onNavigate('catalog')}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
        >
          Перейти к покупкам
        </button>
      </div>
    );
  }

  const freeShippingRemainder = Math.max(0, 25000 - subtotal);

  return (
    <div className="pb-36 pt-2 px-4 max-w-xl mx-auto">
      {/* Header and Clear Cart button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-extrabold text-gray-900">Корзина покупок</h1>
          <p className="text-xs text-gray-500">
            {items.reduce((s, i) => s + i.quantity, 0)} товаров на сумму{' '}
            <strong className="text-gray-900">{subtotal.toLocaleString('ru-RU')} ₸</strong>
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Очистить</span>
        </button>
      </div>

      {/* Free shipping progress bar */}
      <div className="mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="flex items-center gap-1.5 text-gray-700 font-medium">
            <Truck className="w-4 h-4 text-blue-600" />
            {freeShippingRemainder > 0
              ? `До бесплатной доставки: ${freeShippingRemainder.toLocaleString('ru-RU')} ₸`
              : 'Бесплатная доставка активна!'}
          </span>
          <span className="font-bold text-blue-600">
            {Math.min(100, Math.round((subtotal / 25000) * 100))}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (subtotal / 25000) * 100)}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3 mb-6">
        {items.map((item, index) => {
          const itemKey = `${item.product.id}-${item.selectedColor || 'def'}-${item.selectedSize || 'def'}-${index}`;
          const itemTotal = item.product.price * item.quantity;

          return (
            <div
              key={itemKey}
              className="bg-white rounded-2xl border border-gray-100 p-3 shadow-xs flex gap-3 items-center relative"
            >
              {/* Image */}
              <div
                onClick={() => onSelectProduct(item.product)}
                className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden shrink-0 cursor-pointer border border-gray-100"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0 pr-6">
                <h3
                  onClick={() => onSelectProduct(item.product)}
                  className="text-xs font-bold text-gray-900 leading-snug truncate hover:text-blue-600 cursor-pointer"
                >
                  {item.product.title}
                </h3>

                {(item.selectedColor || item.selectedSize) && (
                  <div className="flex flex-wrap gap-1.5 mt-0.5 mb-1 text-[11px] text-gray-500">
                    {item.selectedColor && (
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded-md">
                        {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded-md">
                        {item.selectedSize}
                      </span>
                    )}
                  </div>
                )}

                <div className="text-xs font-semibold text-gray-500">
                  {item.product.price.toLocaleString('ru-RU')} ₸ / шт.
                </div>

                <div className="mt-2 flex items-center justify-between">
                  {/* Stepper */}
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, -1, item.selectedColor, item.selectedSize)
                      }
                      className="p-1 px-2 text-gray-600 hover:bg-gray-200/70 cursor-pointer"
                      aria-label="Уменьшить"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, 1, item.selectedColor, item.selectedSize)
                      }
                      className="p-1 px-2 text-gray-600 hover:bg-gray-200/70 cursor-pointer"
                      aria-label="Увеличить"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-extrabold text-gray-950">
                    {itemTotal.toLocaleString('ru-RU')} ₸
                  </span>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() =>
                  removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                }
                className="absolute top-2.5 right-2.5 text-gray-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                aria-label="Удалить товар"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Promo Code Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3.5 shadow-xs mb-5">
        <div className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Промокод на скидку</span>
        </div>

        {appliedPromo ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{appliedPromo}</span>
            </div>
            <button
              onClick={removePromoCode}
              className="text-xs text-rose-500 font-medium hover:underline cursor-pointer"
            >
              Отменить
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Введите SALE10"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium uppercase placeholder:normal-case focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Применить
            </button>
          </form>
        )}

        {promoMessage && (
          <p
            className={`text-[11px] mt-2 font-medium ${
              promoMessage.isError ? 'text-rose-500' : 'text-emerald-600'
            }`}
          >
            {promoMessage.text}
          </p>
        )}
      </div>

      {/* Order Summary Calculations */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/60 mb-6 space-y-2.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Сумма товаров:</span>
          <span className="font-semibold text-gray-900">
            {subtotal.toLocaleString('ru-RU')} ₸
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Скидка по промокоду:</span>
            <span>-{discount.toLocaleString('ru-RU')} ₸</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Доставка:</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold">Бесплатно</span>
            ) : (
              `${shipping.toLocaleString('ru-RU')} ₸`
            )}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-sm">
          <span className="font-extrabold text-gray-900">Итого к оплате:</span>
          <span className="text-xl font-extrabold text-blue-600">
            {total.toLocaleString('ru-RU')} ₸
          </span>
        </div>
      </div>

      {/* Floating Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 p-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-gray-400 font-medium">К оплате:</div>
            <div className="text-base font-extrabold text-gray-900">
              {total.toLocaleString('ru-RU')} ₸
            </div>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/30 transition-all cursor-pointer active:scale-95"
          >
            <span>Перейти к оформлению</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
