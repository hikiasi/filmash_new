'use client';

import React from 'react';

const StaffRow = ({ name, email, role, lastLogin, avatar, roleColor }: any) => (
  <tr className="group hover:bg-zinc-900/30 transition-all border-b border-zinc-900/50 last:border-0">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full border border-zinc-800 bg-zinc-900 bg-center bg-cover overflow-hidden" style={{ backgroundImage: avatar ? `url("${avatar}")` : 'none' }}>
           {!avatar && <span className="material-symbols-outlined text-zinc-700 m-2">person</span>}
        </div>
        <div>
          <p className="text-white font-black uppercase italic tracking-tight">{name}</p>
          <p className="text-[10px] text-zinc-500 font-bold tracking-tight">{email}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
        roleColor === 'red' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
        roleColor === 'purple' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
        'bg-blue-500/10 text-blue-500 border-blue-500/20'
      }`}>
        {role}
      </div>
    </td>
    <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
      {lastLogin}
    </td>
    <td className="px-8 py-5 text-right">
      <button className="size-10 flex items-center justify-center rounded-xl text-zinc-700 hover:text-white transition-colors">
        <span className="material-symbols-outlined">more_vert</span>
      </button>
    </td>
  </tr>
);

export default function StaffPage() {
  const handleNewStaff = () => {
    const name = prompt('Имя сотрудника:');
    if (name) alert(`Сотрудник ${name} добавлен (демо)`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Команда <span className="text-zinc-600">FILMASH</span></h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Управление доступом и ролями</p>
          </div>
          <button
            onClick={handleNewStaff}
            className="h-14 px-8 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic flex items-center gap-3 shadow-lg shadow-primary/10"
          >
            <span className="material-symbols-outlined font-black">person_add</span>
            Новый сотрудник
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Всего', val: '24', icon: 'group', color: 'text-primary' },
              { label: 'Админы', val: '3', icon: 'verified_user', color: 'text-red-500' },
              { label: 'Менеджеры', val: '8', icon: 'manage_accounts', color: 'text-purple-500' },
              { label: 'Логисты', val: '13', icon: 'local_shipping', color: 'text-blue-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                </div>
                <div className="text-4xl font-black text-white italic">{stat.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Сотрудник</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Роль</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Последний вход</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600 text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                <StaffRow name="Алексей М." email="alex@filmash.com" role="Администратор" lastLogin="2 мин назад" avatar="" roleColor="red" />
                <StaffRow name="Сара К." email="sarah@filmash.com" role="Менеджер" lastLogin="1 час назад" avatar="" roleColor="purple" />
                <StaffRow name="Джеймс Б." email="007@filmash.com" role="Логист" lastLogin="1 день назад" avatar="" roleColor="blue" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
