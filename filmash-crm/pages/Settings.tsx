import React from 'react';

export default function Settings() {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-10 overflow-y-auto">
      <div className="flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4 border-b border-border">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Системные Настройки</h1>
            <p className="text-secondary text-base font-normal leading-normal">Управление конфигурацией CRM, шаблонами и интеграциями.</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-white tracking-light text-2xl font-bold leading-tight px-4 text-left pb-4 pt-2">Брендинг</h3>
          <div className="flex flex-col md:flex-row gap-6 px-4">
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <div className="w-full gap-1 overflow-hidden bg-surface border border-border aspect-[3/2] rounded-lg flex items-center justify-center relative group">
                <div className="w-full h-full bg-center bg-no-repeat bg-contain p-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDcQZRJBtt6BIAhAg-hQj9IfzL6f-XW7w-D-3Sul2IcVlEa9R5T81_TInE3v9HAm0I-2GcEjKrvzquhiu3OfQIkiME6P2X2GCy_SuUUvBYWEkDF4Zbs-K7aLhA_javsVP8dhg68bWmwEbJWVEarh82g-UpEGQ8rlkO1-lQfJUAAli-OdeGLsKI0EZaHDY2Dd_uyiIzeMyoswh7_dTR10rWHAdKTBbJD-iOnKNLCICmKItmkHkPKC4Y2ksJ_-cxulBowbFDprsYGQo")' }}></div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 w-full md:w-2/3">
              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Логотип компании</label>
                <p className="text-secondary text-sm">Рекомендуемый размер: 500x300px. PNG или SVG с прозрачным фоном.</p>
              </div>
              <div className="flex justify-start">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-surfaceHover hover:bg-border text-white gap-2 text-sm font-bold transition-colors">
                  <span className="material-symbols-outlined text-white text-[20px]">upload_file</span>
                  <span className="truncate">Выбрать файл</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-white tracking-light text-2xl font-bold leading-tight px-4 text-left pb-4 pt-2">Email Шаблоны</h3>
          <div className="px-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Авто-ответ на заявку</label>
              <textarea className="w-full bg-surface text-white border border-border rounded-lg p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-secondary" defaultValue={`Тема: Мы получили ваш запрос\n\nЗдравствуйте, {Customer_Name},\n\nСпасибо за обращение в Filmash. Мы получили вашу заявку на импорт автомобиля.`}></textarea>
              <p className="text-xs text-secondary">Переменные: {'{Customer_Name}'}, {'{Inquiry_ID}'}, {'{Car_Model}'}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 mb-8">
          <h3 className="text-white tracking-light text-2xl font-bold leading-tight px-4 text-left pb-4 pt-2">API Интеграции</h3>
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">API Ключ ЦБ РФ</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 material-symbols-outlined text-secondary">account_balance</span>
                <input className="w-full bg-surface text-white border border-border rounded-lg h-12 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary/50" type="password" value="sk_live_51J..." readOnly />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 mx-4 mt-6 p-4 rounded-xl bg-surface border border-border shadow-lg flex justify-between items-center z-10">
          <span className="text-sm text-secondary hidden sm:block">Сохранено: Сегодня в 10:42</span>
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <button className="px-6 h-10 rounded-lg border border-border text-white hover:bg-surfaceHover font-bold text-sm transition-colors">Отмена</button>
            <button className="px-6 h-10 rounded-lg bg-primary text-white hover:bg-blue-600 font-bold text-sm flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-lg">save</span>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}