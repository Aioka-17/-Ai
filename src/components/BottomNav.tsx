import React from 'react';
import { LayoutGrid, ShoppingBag, Truck, PhoneCall } from 'lucide-react';
import { Page } from '../types';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenDeliveryInfo: () => void;
  onOpenContactInfo: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenDeliveryInfo,
  onOpenContactInfo
}) => {
  const { totalCount } = useCart();

  // If on checkout or thank-you page, don't obstruct the action buttons
  if (currentPage === 'checkout' || currentPage === 'thank-you') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-xl mx-auto px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            currentPage === 'catalog'
              ? 'text-blue-600 font-bold'
              : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[11px]">Каталог</span>
        </button>

        <button
          onClick={() => onNavigate('cart')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            currentPage === 'cart'
              ? 'text-blue-600 font-bold'
              : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-blue-600 text-white font-bold text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[11px]">Корзина</span>
        </button>

        <button
          onClick={onOpenDeliveryInfo}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all cursor-pointer"
        >
          <Truck className="w-5 h-5" />
          <span className="text-[11px]">Доставка</span>
        </button>

        <button
          onClick={onOpenContactInfo}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all cursor-pointer"
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-[11px]">Помощь</span>
        </button>
      </div>
    </nav>
  );
};
