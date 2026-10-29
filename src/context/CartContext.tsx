import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, delta: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  toastMessage: string | null;
  hideToast: () => void;
}

const CART_STORAGE_KEY = 'sulu_store_cart_v1';
const FREE_SHIPPING_THRESHOLD = 25000;
const STANDARD_SHIPPING_COST = 1500;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2600);
  };

  const hideToast = () => setToastMessage(null);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const nextItems = [...prevItems];
        nextItems[existingIndex] = {
          ...nextItems[existingIndex],
          quantity: nextItems[existingIndex].quantity + quantity
        };
        return nextItems;
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity,
            selectedColor,
            selectedSize
          }
        ];
      }
    });

    showToast(`«${product.title}» добавлен в корзину`);
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    delta: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear cart storage:', e);
    }
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SALE10' || clean === 'PROMO10' || clean === 'SULU10') {
      setAppliedPromo('10% скидка на весь заказ');
      return { success: true, message: 'Промокод применен: скидка 10%!' };
    } else if (clean === 'KZ5000' && subtotal >= 30000) {
      setAppliedPromo('Скидка 5 000 ₸');
      return { success: true, message: 'Скидка 5 000 ₸ успешно применена!' };
    }
    return { success: false, message: 'Неверный или неактивный промокод' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.includes('10%')) {
      return Math.round(subtotal * 0.1);
    }
    if (appliedPromo.includes('5 000')) {
      return Math.min(5000, subtotal);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  }, [subtotal]);

  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discount + shipping);
  }, [subtotal, discount, shipping]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        discount,
        shipping,
        total,
        promoCode: appliedPromo || '',
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toastMessage,
        hideToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
