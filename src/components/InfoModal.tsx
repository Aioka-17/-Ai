import React from 'react';
import { X, Truck, CreditCard, ShieldCheck, MapPin, Phone, Clock } from 'lucide-react';

interface InfoModalProps {
  type: 'delivery' | 'contact' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h2 className="text-base font-extrabold text-gray-900">
            {type === 'delivery' ? 'Условия доставки и оплаты' : 'Служба поддержки и контакты'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'delivery' ? (
          <div className="space-y-4 text-xs text-gray-600">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
              <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Курьерская доставка по Алматы</h4>
                <p className="leading-relaxed">
                  Доставка день-в-день при заказе до 15:00. При заказе от 25 000 ₸ — <strong>бесплатно</strong>, иначе 1 500 ₸.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Доставка по всему Казахстану</h4>
                <p className="leading-relaxed">
                  Астана, Шымкент, Караганда, Актобе, Атырау, Павлодар и другие населенные пункты — 1-3 рабочих дня экспресс-службами (СДЭК, Казпочта).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <CreditCard className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Оплата без риска</h4>
                <p className="leading-relaxed">
                  Никаких онлайн предоплат! Вы проверяете целостность товара в руках курьера и оплачиваете наличными или через Kaspi QR.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Гарантия и возврат</h4>
                <p className="leading-relaxed">
                  1 год гарантии на всю технику и электронику. Обмен или возврат в течение 14 дней согласно законодательству РК.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-gray-600">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-0.5">Горячая линия</h4>
                <p className="text-sm font-extrabold text-blue-600 mb-1">+7 (727) 355-88-99</p>
                <p className="text-[11px] text-gray-400">Звонки по Казахстану бесплатны</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-0.5">График работы службы заботы</h4>
                <p className="leading-relaxed">Ежедневно с 09:00 до 21:00 (по времени Астаны)</p>
                <p className="text-[11px] text-gray-400">Заказы на сайте принимаются круглосуточно 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-0.5">Пункт выдачи и шоурум</h4>
                <p className="leading-relaxed">г. Алматы, пр. Достык 180, БЦ «Кок-Тобе»</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-all cursor-pointer"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
