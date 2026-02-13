import React from 'react';
import { Link } from 'react-router-dom';

export default function InquiryDetail() {
  return (
    <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <nav className="flex items-center text-sm font-medium">
          <Link to="/inquiries" className="text-secondary hover:text-primary cursor-pointer">Заявки</Link>
          <span className="material-symbols-outlined mx-2 text-secondary text-[16px]">chevron_right</span>
          <span className="text-white">Заявка #9821</span>
        </nav>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-white text-sm font-medium hover:bg-surfaceHover transition-colors">
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Печать</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            <span>Редактировать</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black tracking-tight text-white">2024 Tesla Model S Plaid</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400 border border-yellow-800">На рассмотрении</span>
            </div>
            <p className="text-secondary">ID Заявки: #9821 • Создана 24 Окт, 2023</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-secondary mb-1">Расчетная Стоимость</p>
            <p className="text-3xl font-bold text-blue-400">9 450 000 ₽</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8 group">
              <img alt="Tesla" className="w-full h-full object-contain drop-shadow-2xl rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLtpdsG5zmyaWkkND7YDb31xFG4788mnmssYnWUuTu-Pwa4SJiE3fxDcU0QWw3VYKgwQFSgVMZoteeAY-E_tI0O9HmGyQPVP_Cxt3Oh72gmycrDZya-MLChToZwfAEa1RzT6adcjt3wMTyr_Uk2I_NJTrhaUI8xZfoife4rPL5tF3rdzsL6HNpRi2Lc3XBFg0OWUVIvVNbcgIDZyRwJapRdp_DDd7NvQzw02hXllLpDe2kF_oxTUmWz3pjlshODUYrw73ReXGFjhI" />
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span> Детали Конфигурации
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border border-dashed last:border-0">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-gray-900 border border-gray-600 shadow-inner"></div>
                  <div>
                    <p className="font-medium text-white">Цвет Кузова</p>
                    <p className="text-sm text-secondary">Stealth Grey</p>
                  </div>
                </div>
                <span className="font-bold text-white">Включено</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border border-dashed last:border-0">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-gray-200 border border-border flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-500">tire_repair</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Диски</p>
                    <p className="text-sm text-secondary">21" Arachnid Wheels</p>
                  </div>
                </div>
                <span className="font-bold text-blue-400">+450 000 ₽</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Клиент</h3>
              <button className="text-primary text-xs font-bold hover:underline">Профиль</button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">АИ</div>
              <div>
                <p className="font-bold text-white">Алексей Иванов</p>
                <p className="text-xs text-secondary">Москва, Россия</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-background flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-secondary">Email</p>
                  <p className="text-sm font-medium text-white truncate">alex.ivanov@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border p-5 shadow-sm flex flex-col h-full max-h-[400px]">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-orange-500">sticky_note_2</span> Заметки менеджера
            </h3>
            <div className="flex-1 bg-[#2c241b] rounded-lg p-3 mb-3 border border-yellow-900/30">
              <textarea className="w-full h-32 bg-transparent border-none p-0 text-sm text-white resize-none focus:ring-0 placeholder-secondary/60" placeholder="Введите внутренние заметки..."></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}