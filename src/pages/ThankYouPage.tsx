import React from 'react';
import {
  CheckCircle2,
  Package,
  Calendar,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { PlacedOrder, Page } from '../types';

interface ThankYouPageProps {
  order: PlacedOrder | null;
  onNavigate: (page: Page) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onNavigate }) => {
  if (!order) {
    return (
      <div className="px-4 py-16 text-center max-w-md mx-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Заказ не найден</h2>
        <button
          onClick={() => onNavigate('catalog')}
          className="py-3 px-6 rounded-2xl bg-blue-600 text-white font-bold text-xs"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 max-w-xl mx-auto">
      {/* Success Hero Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-sm shadow-emerald-500/20 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          Заказ принят
        </span>
        <h1 className="text-2xl font-black text-gray-950 mt-2 mb-1 tracking-tight">
          Спасибо за ваш заказ!
        </h1>
        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
          Менеджер уже обрабатывает вашу заявку и позвонит вам для подтверждения времени доставки.
        </p>
      </div>

      {/* Order info badge */}
      <div className="bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-3xl p-5 mb-5 shadow-lg shadow-gray-950/10">
        <div className="flex items-center justify-between pb-3 border-b border-gray-700/80">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              Номер заказа
            </span>
            <div className="text-lg font-black tracking-tight text-white">
              #{order.orderNumber}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              К оплате
            </span>
            <div className="text-lg font-black text-emerald-400">
              {order.totalAmount.toLocaleString('ru-RU')} ₸
            </div>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between text-xs text-gray-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" /> {order.createdAt}
          </span>
          <span className="flex items-center gap-1.5 text-blue-300">
            <CreditCard className="w-3.5 h-3.5" /> Оплата при получении
          </span>
        </div>
      </div>

      {/* Customer summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs mb-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
          Данные получателя
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
              <span className="text-[11px] font-bold">И</span>
            </div>
            <div>
              <span className="text-gray-400">Имя: </span>
              <strong className="text-gray-900">{order.customer.name}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
              <Phone className="w-3 h-3" />
            </div>
            <div>
              <span className="text-gray-400">Телефон: </span>
              <strong className="text-gray-900">{order.customer.phone}</strong>
            </div>
          </div>

          {order.customer.address && (
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
                <MapPin className="w-3 h-3" />
              </div>
              <div>
                <span className="text-gray-400">Адрес: </span>
                <strong className="text-gray-900">{order.customer.address}</strong>
              </div>
            </div>
          )}

          {order.customer.comment && (
            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 italic">
              «{order.customer.comment}»
            </div>
          )}
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs mb-6">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-blue-600" />
          <span>Товары в заказе</span>
        </h3>

        <div className="divide-y divide-gray-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{item.product.title}</p>
                  {(item.selectedColor || item.selectedSize) && (
                    <p className="text-[10px] text-gray-400">
                      {[item.selectedColor, item.selectedSize].filter(Boolean).join(', ')}
                    </p>
                  )}
                  <p className="text-[11px] text-gray-500">
                    {item.quantity} шт. × {item.product.price.toLocaleString('ru-RU')} ₸
                  </p>
                </div>
              </div>

              <div className="font-bold text-gray-900 shrink-0">
                {(item.quantity * item.product.price).toLocaleString('ru-RU')} ₸
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety and support reminder */}
      <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-blue-900 text-xs flex items-center gap-3 mb-6">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          Оплата курьеру наличными или через Kaspi QR при получении заказа. Проверьте комплектацию перед оплатой.
        </p>
      </div>

      {/* Action button */}
      <button
        onClick={() => onNavigate('catalog')}
        className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Продолжить покупки</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
