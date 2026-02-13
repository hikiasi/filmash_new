import React from 'react';
import { Link } from 'react-router-dom';

export default function AddVehicle() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-secondary text-sm mb-1">
              <Link to="/inventory">Каталог</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span>Автомобили</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white">Новый</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Добавить Модель</h1>
            <p className="text-secondary text-base">Создание новой записи автомобиля для импорта.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-secondary hover:text-white hover:bg-surfaceHover transition-colors">
            <span className="material-symbols-outlined text-sm">save</span>
            Сохранить черновик
          </button>
        </div>

        <div className="w-full bg-surface rounded-xl p-6 border border-border">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-primary text-sm font-bold uppercase tracking-wider">Шаг 1 из 4</span>
                <h3 className="text-white text-lg font-medium">Основная Информация</h3>
              </div>
              <span className="text-secondary text-sm font-medium">25% Заполнено</span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-surface/50 border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface">
              <h2 className="text-white text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Детали
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-secondary text-sm font-medium">Марка (Бренд)</span>
                <div className="relative">
                  <select className="w-full h-12 bg-background border border-border text-white text-sm rounded-lg px-4 focus:ring-2 focus:ring-primary outline-none">
                    <option disabled selected value="">Выберите бренд...</option>
                    <option value="toyota">Toyota</option>
                    <option value="bmw">BMW</option>
                  </select>
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-secondary text-sm font-medium">Модель</span>
                <input className="w-full h-12 bg-background border border-border text-white text-sm rounded-lg px-4 focus:ring-2 focus:ring-primary outline-none placeholder-secondary/50" placeholder="напр. Land Cruiser, X5" type="text" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-secondary text-sm font-medium">Год выпуска</span>
                <input className="w-full h-12 bg-background border border-border text-white text-sm rounded-lg px-4 focus:ring-2 focus:ring-primary outline-none placeholder-secondary/50" placeholder="2024" type="number" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-secondary text-sm font-medium">Тип кузова</span>
                <div className="grid grid-cols-4 gap-2">
                  {['Внедорожник', 'Седан', 'Пикап', 'Купе'].map(type => (
                    <div key={type} className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg border border-border bg-background hover:bg-surfaceHover text-secondary hover:text-white cursor-pointer h-20 transition-all">
                      <span className="material-symbols-outlined">directions_car</span>
                      <span className="text-xs">{type}</span>
                    </div>
                  ))}
                </div>
              </label>
            </div>
          </div>

          <div className="bg-surface/50 border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface">
              <h2 className="text-white text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">category</span>
                Классификация
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                <span className="text-secondary text-sm font-medium">Доступные цвета</span>
                <div className="flex flex-wrap gap-2 p-3 bg-background border border-border rounded-lg min-h-[60px]">
                  <div className="flex items-center gap-2 bg-surfaceHover px-3 py-1.5 rounded-full text-xs text-white">
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                    Alpine White
                  </div>
                  <div className="flex items-center gap-2 bg-surfaceHover px-3 py-1.5 rounded-full text-xs text-white">
                    <span className="w-3 h-3 rounded-full bg-black border border-gray-600"></span>
                    Jet Black
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-secondary text-secondary hover:text-primary hover:border-primary text-xs transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 pb-20 border-t border-border">
            <button className="px-6 py-3 rounded-lg text-white font-medium hover:bg-surfaceHover transition-colors">Отмена</button>
            <button className="px-8 py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium transition-colors shadow-lg shadow-primary/25 flex items-center gap-2">
              Далее
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}