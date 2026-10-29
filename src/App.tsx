/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Constants at the very top of the code as specified:
export const TOKEN = "9041523081:AAGvMqgdQlBZFKxFyuNS9yS30aA-bNXrF-M";
export const CHAT_ID = "1617436632";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Page, Product, PlacedOrder } from './types';
import { PRODUCTS } from './data/products';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { InfoModal } from './components/InfoModal';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ThankYouPage } from './pages/ThankYouPage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [infoModal, setInfoModal] = useState<'delivery' | 'contact' | null>(null);
  const { totalCount, total } = useCart();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBuyNowFromCatalog = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('checkout');
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    setLastOrder(order);
    setCurrentPage('thank-you');
  };

  const handleBack = () => {
    if (currentPage === 'product') {
      setCurrentPage('catalog');
    } else if (currentPage === 'cart') {
      setCurrentPage('catalog');
    } else if (currentPage === 'checkout') {
      setCurrentPage('cart');
    } else if (currentPage === 'thank-you') {
      setCurrentPage('catalog');
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'product':
        return 'О товаре';
      case 'cart':
        return 'Корзина';
      case 'checkout':
        return 'Оформление';
      case 'thank-you':
        return 'Заказ оформлен';
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col items-center">
      {/* Mobile-first wrapper container */}
      <div className="w-full max-w-lg min-h-screen bg-white shadow-2xl shadow-gray-200/50 flex flex-col relative border-x border-gray-100">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onBack={currentPage !== 'catalog' ? handleBack : undefined}
          pageTitle={getPageTitle()}
        />

        {/* Global Toast */}
        <Toast onNavigate={setCurrentPage} />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {currentPage === 'catalog' && (
            <CatalogPage
              onSelectProduct={handleSelectProduct}
              onBuyNow={handleBuyNowFromCatalog}
            />
          )}

          {currentPage === 'product' && selectedProduct && (
            <ProductPage
              product={selectedProduct}
              onNavigate={setCurrentPage}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentPage === 'cart' && (
            <CartPage
              onNavigate={setCurrentPage}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentPage === 'checkout' && (
            <CheckoutPage
              onOrderSuccess={handleOrderSuccess}
              onBack={() => setCurrentPage('cart')}
            />
          )}

          {currentPage === 'thank-you' && (
            <ThankYouPage
              order={lastOrder}
              onNavigate={setCurrentPage}
            />
          )}
        </main>

        {/* Persistent Floating Quick Checkout Bar when cart has items on catalog */}
        {totalCount > 0 && currentPage === 'catalog' && (
          <div className="fixed bottom-14 left-0 right-0 z-40 px-3 pb-1 pointer-events-none">
            <div className="max-w-lg mx-auto pointer-events-auto">
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white p-3 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-between font-bold text-xs transition-all cursor-pointer border border-blue-500"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-white text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0">
                    {totalCount}
                  </span>
                  <span className="truncate">В корзине на {total.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl uppercase tracking-wider text-[11px] shrink-0">
                  <span>Оформить заказ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenDeliveryInfo={() => setInfoModal('delivery')}
          onOpenContactInfo={() => setInfoModal('contact')}
        />

        {/* Modals for delivery & help */}
        <InfoModal
          type={infoModal}
          onClose={() => setInfoModal(null)}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
