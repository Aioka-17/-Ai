import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Page } from '../types';

interface ToastProps {
  onNavigate: (page: Page) => void;
}

export const Toast: React.FC<ToastProps> = ({ onNavigate }) => {
  const { toastMessage, hideToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-4 right-4 z-50 max-w-md mx-auto pointer-events-auto">
      <div className="bg-gray-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-gray-800 animate-in slide-in-from-top-4 duration-200">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium truncate text-gray-100">{toastMessage}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              hideToast();
              onNavigate('cart');
            }}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>В корзину</span>
          </button>
          <button
            onClick={hideToast}
            aria-label="Закрыть уведомление"
            className="text-gray-400 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
