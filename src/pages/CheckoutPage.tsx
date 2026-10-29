import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  AlertCircle,
  Loader2,
  Lock,
  ChevronDown,
  ShoppingBag,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData, PlacedOrder } from '../types';

// Constants specified at the very top
const TOKEN = "9041523081:AAGvMqgdQlBZFKxFyuNS9yS30aA-bNXrF-M";
const CHAT_ID = "1617436632";

interface CheckoutPageProps {
  onOrderSuccess: (order: PlacedOrder) => void;
  onBack: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderSuccess, onBack }) => {
  const { items, total, subtotal, shipping, discount, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showItemsList, setShowItemsList] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }

    const cleanPhone = formData.phone.trim();
    if (!cleanPhone) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона';
    } else if (cleanPhone.replace(/\D/g, '').length < 6) {
      newErrors.phone = 'Номер телефона слишком короткий (укажите хотя бы 6 цифр)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickFill = () => {
    setFormData({
      name: 'Айдар',
      phone: '+7 (707) 777-88-99',
      address: 'г. Алматы, ул. Толе би 59',
      comment: 'Позвонить за 30 минут до приезда'
    });
    setErrors({});
  };

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    if (items.length === 0) {
      setErrorMessage('В корзине нет товаров. Добавьте товары перед оформлением.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = `KZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const formattedDate = now.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Compose Russian message strictly according to specification:
      // “🛒 Новый заказ”, items with quantity and price, total, name, phone, address, comment, date and time
      const itemsText = items
        .map((item, idx) => {
          const variant = [item.selectedColor, item.selectedSize].filter(Boolean).join(', ');
          const title = variant ? `${item.product.title} (${variant})` : item.product.title;
          const cost = item.product.price * item.quantity;
          return `${idx + 1}. ${title}\n   Количество: ${item.quantity} шт. × ${item.product.price.toLocaleString('ru-RU')} ₸ = ${cost.toLocaleString('ru-RU')} ₸`;
        })
        .join('\n\n');

      const message = `🛒 Новый заказ №${orderNumber}

📦 Товары:
${itemsText}

💰 Итого: ${total.toLocaleString('ru-RU')} ₸
(Товары: ${subtotal.toLocaleString('ru-RU')} ₸${discount > 0 ? `, Скидка: -${discount.toLocaleString('ru-RU')} ₸` : ''}, Доставка: ${shipping === 0 ? 'Бесплатно' : `${shipping.toLocaleString('ru-RU')} ₸`})

👤 Контактные данные:
• Имя: ${formData.name.trim()}
• Телефон: ${formData.phone.trim()}
• Адрес доставки: ${formData.address.trim() ? formData.address.trim() : 'Не указан (уточнить у клиента)'}
• Комментарий: ${formData.comment.trim() ? formData.comment.trim() : 'Нет комментария'}

📅 Дата и время: ${formattedDate}`;

      // Send to Telegram Bot API without custom headers as instructed
      let data: any = null;
      try {
        const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
          method: "POST",
          body: new URLSearchParams({
            chat_id: CHAT_ID,
            text: message
          })
        });
        data = await response.json();
      } catch (directErr) {
        // Fallback: if browser adblocker/CORS/firewall blocked direct connection to api.telegram.org
        console.warn('Direct Telegram fetch blocked or failed, using server proxy fallback:', directErr);
        try {
          const fallbackResponse = await fetch("/api/telegram-proxy/bot" + TOKEN + "/sendMessage", {
            method: "POST",
            body: new URLSearchParams({
              chat_id: CHAT_ID,
              text: message
            })
          });
          data = await fallbackResponse.json();
        } catch (proxyErr) {
          throw new Error('Не удалось связаться с Telegram. Проверьте соединение и попробуйте еще раз.');
        }
      }

      // Show thank-you page and clear cart ONLY if Telegram returns ok: true
      if (data && data.ok === true) {
        const completedOrder: PlacedOrder = {
          orderNumber,
          items: [...items],
          totalAmount: total,
          customer: { ...formData },
          createdAt: formattedDate
        };

        clearCart();
        onOrderSuccess(completedOrder);
      } else {
        const errorDesc = data?.description || 'Telegram Bot API вернул ошибку при отправке сообщения.';
        throw new Error(errorDesc);
      }
    } catch (err: any) {
      console.error('Telegram order submission error:', err);
      setErrorMessage(
        err.message ||
          'Не удалось отправить заказ в Telegram. Проверьте интернет-соединение и попробуйте снова.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-36 pt-2 px-4 max-w-xl mx-auto">
      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
          Оформление заказа
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Заполните данные для доставки. Оплата производится при получении товара.
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 animate-in shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold mb-1">Ошибка отправки заказа</h4>
            <p className="leading-relaxed">{errorMessage}</p>
            <p className="mt-2 text-[11px] text-rose-600 font-medium">
              Корзина сохранена. Вы можете попробовать нажать «Оформить заказ» еще раз.
            </p>
          </div>
        </div>
      )}

      {/* Order items accordion summary */}
      <div className="mb-5 bg-white rounded-2xl border border-gray-100 p-3.5 shadow-xs">
        <button
          type="button"
          onClick={() => setShowItemsList(!showItemsList)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span>Ваш заказ ({items.reduce((s, i) => s + i.quantity, 0)} тов.)</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="font-extrabold text-gray-900">{total.toLocaleString('ru-RU')} ₸</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showItemsList ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {showItemsList && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2.5">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-9 h-9 rounded-lg object-cover shrink-0 border border-gray-100"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{item.product.title}</p>
                    <p className="text-[11px] text-gray-400">
                      {item.quantity} шт. × {item.product.price.toLocaleString('ru-RU')} ₸
                    </p>
                  </div>
                </div>
                <span className="font-bold text-gray-900 shrink-0">
                  {(item.quantity * item.product.price).toLocaleString('ru-RU')} ₸
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick autofill helper */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-gray-500 font-medium">Контактные данные:</span>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-blue-600 hover:text-blue-800 text-[11px] font-semibold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 cursor-pointer active:scale-95 transition-all"
          >
            Заполнить для теста
          </button>
        </div>

        {/* Name input (Required) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Ваше имя и фамилия <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Например, Айдар Касымов"
              className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-gray-200 focus:border-blue-500 focus:bg-white'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone input (Required) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Номер телефона <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="+7 (707) 123-45-67"
              className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-gray-200 focus:border-blue-500 focus:bg-white'
              }`}
            />
          </div>
          {errors.phone ? (
            <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          ) : (
            <p className="text-[10px] text-gray-400 mt-1">
              Менеджер свяжется с вами для подтверждения заказа
            </p>
          )}
        </div>

        {/* Address input */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Адрес доставки <span className="text-gray-400 font-normal">(город, улица, дом, кв.)</span>
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="г. Алматы, пр. Абая 52, кв. 14"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Comment input */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            Комментарий к заказу <span className="text-gray-400 font-normal">(необязательно)</span>
          </label>
          <div className="relative flex items-start">
            <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <textarea
              rows={2}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Удобное время доставки, код домофона, пожелания..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
            />
          </div>
        </div>

        {/* Payment notice: No real payments, pay on receipt */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-blue-950 mb-0.5">Оплата при получении</h4>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Без онлайн-оплаты и ввода данных банковских карт. Вы сможете осмотреть товар и оплатить курьеру наличными или через Kaspi QR / перевод.
            </p>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 p-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="py-3.5 px-4 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
            >
              Назад
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Отправка заказа...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Оформить заказ • {total.toLocaleString('ru-RU')} ₸</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
