import React from 'react';
import { ShoppingBag, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { Page } from '../types';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onBack?: () => void;
  pageTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onBack,
  pageTitle
}) => {
  const { totalCount } = useCart();

  const isHome = currentPage === 'catalog';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && onBack ? (
            <button
              onClick={onBack}
              aria-label="Назад"
              className="p-2 -ml-2 rounded-xl text-gray-700 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
          )}

          <div
            onClick={() => onNavigate('catalog')}
            className="cursor-pointer select-none"
          >
            {pageTitle && !isHome ? (
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                {pageTitle}
              </h1>
            ) : (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 bg-clip-text text-transparent">
                    SULŪ STORE
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    KZ ₸
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">
                  Официальный магазин • Алматы
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('cart')}
            aria-label="Корзина"
            className="relative p-2.5 rounded-xl bg-gray-50 text-gray-800 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-75">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Trust banner */}
      {isHome && (
        <div className="bg-slate-900 text-slate-200 text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Быстрая доставка по Казахстану • Оплата при получении Kaspi / Наличными</span>
        </div>
      )}
    </header>
  );
};
