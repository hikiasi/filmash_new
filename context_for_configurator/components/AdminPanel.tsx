
import React, { useState } from 'react';
import { AppState, Car, Lead } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Car as CarIcon, TrendingUp, Search, Plus, Trash2, Edit3, Settings } from 'lucide-react';

interface AdminPanelProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ appState, setAppState }) => {
  const [tab, setTab] = useState<'stats' | 'leads' | 'cars' | 'settings'>('stats');
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const statsData = [
    { name: 'Пн', leads: 4 },
    { name: 'Вт', leads: 7 },
    { name: 'Ср', leads: 5 },
    { name: 'Чт', leads: 12 },
    { name: 'Пт', leads: 8 },
    { name: 'Сб', leads: 3 },
    { name: 'Вс', leads: 6 },
  ];

  const deleteCar = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот автомобиль из каталога?')) {
      setAppState(prev => ({
        ...prev,
        cars: prev.cars.filter(c => c.id !== id)
      }));
    }
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setAppState(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, status } : l)
    }));
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden min-h-[600px]">
      <div className="flex flex-col md:flex-row border-b border-zinc-800">
        <div className="md:w-64 border-r border-zinc-800 p-6 flex flex-col gap-2">
          <button 
            onClick={() => setTab('stats')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'stats' ? 'bg-zinc-100 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            <TrendingUp size={18} />
            Аналитика
          </button>
          <button 
            onClick={() => setTab('leads')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'leads' ? 'bg-zinc-100 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            <Users size={18} />
            Заявки
            <span className="ml-auto bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{appState.leads.length}</span>
          </button>
          <button 
            onClick={() => setTab('cars')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'cars' ? 'bg-zinc-100 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            <CarIcon size={18} />
            Управление авто
          </button>
          <button 
            onClick={() => setTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'settings' ? 'bg-zinc-100 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            <Settings size={18} />
            Настройки
          </button>
        </div>

        <div className="flex-1 p-8">
          {tab === 'stats' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Всего заявок" value={appState.leads.length} change="+12%" />
                <StatCard title="Авто в продаже" value={appState.cars.length} change="+1" />
                <StatCard title="Ср. чек" value="5.2 млн ₽" change="+2%" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl h-80">
                <h3 className="text-lg font-bold mb-6">Динамика заявок (неделя)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="name" stroke="#71717a" />
                    <YAxis stroke="#71717a" />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
                    <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === 'leads' && (
            <div className="animate-in fade-in duration-500">
              <h3 className="text-xl font-bold mb-6">Журнал входящих заявок</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-800">
                      <th className="pb-4 font-bold">Клиент</th>
                      <th className="pb-4 font-bold">Конфигурация</th>
                      <th className="pb-4 font-bold">Дата</th>
                      <th className="pb-4 font-bold">Статус</th>
                      <th className="pb-4 font-bold">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {appState.leads.map(lead => (
                      <tr key={lead.id} className="text-sm group hover:bg-zinc-800/30">
                        <td className="py-4">
                          <div className="font-bold">{lead.userName}</div>
                          <div className="text-zinc-500 text-xs">{lead.userPhone}</div>
                        </td>
                        <td className="py-4 max-w-xs">
                          <div className="font-medium truncate">{lead.carName}</div>
                          <div className="text-zinc-500 text-xs truncate">{lead.config}</div>
                        </td>
                        <td className="py-4 text-zinc-400">{lead.date}</td>
                        <td className="py-4">
                          <select 
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                              lead.status === 'new' ? 'bg-indigo-500/20 text-indigo-400' : 
                              lead.status === 'contacted' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
                            } bg-zinc-800 border-none outline-none`}
                          >
                            <option value="new">Новая</option>
                            <option value="contacted">В работе</option>
                            <option value="sold">Продано</option>
                          </select>
                        </td>
                        <td className="py-4 font-bold">{(lead.priceRUB / 1000000).toFixed(1)} млн</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'cars' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Управление каталогом</h3>
                <button className="bg-zinc-100 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white">
                  <Plus size={16} />
                  Добавить авто
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {appState.cars.map(car => (
                  <div key={car.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-6">
                    <img src={car.mainImage} alt="" className="w-24 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <div className="text-xs text-zinc-500 font-bold uppercase">{car.brand}</div>
                      <div className="font-bold">{car.name}</div>
                    </div>
                    <div className="text-right px-6 border-r border-zinc-800">
                      <div className="text-xs text-zinc-500 uppercase font-bold">Цена от</div>
                      <div className="font-bold">{car.basePriceCNY.toLocaleString()} ¥</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteCar(car.id)}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="animate-in fade-in duration-500 max-w-md">
              <h3 className="text-xl font-bold mb-6">Настройки системы</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Курс Юаня (CNY/RUB)</label>
                  <input 
                    type="number" 
                    value={appState.exchangeRate}
                    onChange={(e) => setAppState(prev => ({ ...prev, exchangeRate: parseFloat(e.target.value) }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" 
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Используется для пересчета цен во всем приложении.</p>
                </div>
                <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl text-sm">
                  Сохранить настройки
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; change: string }> = ({ title, value, change }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
    <div className="text-xs text-zinc-500 uppercase font-bold mb-1">{title}</div>
    <div className="flex items-end gap-3">
      <div className="text-3xl font-black">{value}</div>
      <div className="text-xs text-green-500 font-bold mb-1">{change}</div>
    </div>
  </div>
);

export default AdminPanel;
