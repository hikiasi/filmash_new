import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const data = [
  { name: 'Mon', value: 12.1 },
  { name: 'Tue', value: 12.2 },
  { name: 'Wed', value: 12.15 },
  { name: 'Thu', value: 12.3 },
  { name: 'Fri', value: 12.35 },
  { name: 'Sat', value: 12.4 },
  { name: 'Sun', value: 12.45 },
];

export default function Finance() {
  return (
    <div className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="flex flex-col max-w-[1024px] flex-1 gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Контроль Курсов</h1>
          <p className="text-secondary text-base font-normal leading-normal">Управление обменным курсом CNY к RUB в реальном времени.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 rounded-xl p-6 bg-surface border border-border shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-secondary text-sm font-medium uppercase tracking-wider">Текущий CNY/RUB</p>
              <span className="material-symbols-outlined text-green-500">trending_up</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-white text-5xl font-bold tracking-tight">12.45 ₽</p>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <span className="bg-green-500/20 text-green-500 text-xs font-bold px-2 py-1 rounded">+1.2%</span>
              <span className="text-secondary text-sm">к вчерашнему</span>
            </div>
            <p className="text-secondary text-xs mt-2">Источник: ЦБ РФ API (Авто-обновление)</p>
          </div>

          <div className="md:col-span-2 flex flex-col rounded-xl p-6 bg-surface border border-border shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 z-10">
              <div>
                <p className="text-white text-lg font-bold">Недельная динамика</p>
                <p className="text-secondary text-sm">История курса CNY к RUB</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-border text-xs text-white hover:bg-surfaceHover">1Н</button>
                <button className="px-3 py-1 rounded bg-transparent text-xs text-secondary hover:bg-border">1М</button>
              </div>
            </div>
            <div className="w-full h-40 mt-auto relative">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#137fec" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis hide domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                  <Area type="monotone" dataKey="value" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-surface border border-border p-6 shadow-lg">
          <h3 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tune</span>
            Настройки курса
          </h3>
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <label className="relative flex h-[32px] w-[56px] cursor-pointer items-center rounded-full border-none bg-background p-1 has-[:checked]:justify-end has-[:checked]:bg-primary transition-colors duration-200">
                <div className="h-[24px] w-[24px] rounded-full bg-white shadow-sm"></div>
                <input type="checkbox" className="peer invisible absolute" />
              </label>
              <div className="flex flex-col">
                <p className="text-white text-base font-bold leading-tight">Ручная установка</p>
                <p className="text-secondary text-sm font-normal leading-normal">Зафиксировать курс для расчетов.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-end">
              <div className="w-full sm:w-64">
                <label className="block text-xs font-medium text-secondary mb-1.5 uppercase tracking-wide">Курс (CNY/RUB)</label>
                <div className="flex w-full items-stretch rounded-lg bg-background border border-border focus-within:border-primary transition-colors">
                  <input type="number" step="0.01" className="flex-1 bg-transparent border-none text-white p-3 focus:ring-0 placeholder-secondary" placeholder="например 12.50" defaultValue="12.45" />
                  <div className="flex items-center justify-center px-3 text-secondary bg-surfaceHover border-l border-border rounded-r-lg">
                    <span className="material-symbols-outlined text-[20px]">currency_ruble</span>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto h-[50px] bg-primary hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>
                Обновить
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">history</span>
            Журнал изменений
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surfaceHover">
                  <th className="p-4 text-sm font-medium text-secondary uppercase tracking-wider">Дата & Время</th>
                  <th className="p-4 text-sm font-medium text-secondary uppercase tracking-wider">Менеджер</th>
                  <th className="p-4 text-sm font-medium text-secondary uppercase tracking-wider">Действие</th>
                  <th className="p-4 text-sm font-medium text-secondary uppercase tracking-wider text-right">Старый курс</th>
                  <th className="p-4 text-sm font-medium text-secondary uppercase tracking-wider text-right">Новый курс</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { date: '24 Окт 2023', time: '14:32', user: 'Алексей М.', initial: 'А', action: 'Ручное обновление', old: '12.30', new: '12.45', type: 'manual' },
                  { date: '23 Окт 2023', time: '09:15', user: 'Система', initial: 'С', action: 'Авто-синхр', old: '12.28', new: '12.30', type: 'auto' }
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-surfaceHover transition-colors">
                    <td className="p-4 text-sm text-white">{row.date} <span className="text-secondary text-xs ml-1">{row.time}</span></td>
                    <td className="p-4 text-sm text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{row.initial}</div>
                      {row.user}
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${row.type === 'manual' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'}`}>
                        {row.action}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-secondary text-right">{row.old} ₽</td>
                    <td className="p-4 text-sm text-white font-bold text-right">{row.new} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}