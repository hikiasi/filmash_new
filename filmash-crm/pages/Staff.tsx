import React from 'react';

const StaffRow = ({ name, email, role, lastLogin, avatar, roleColor }: any) => (
  <tr className="border-t border-border hover:bg-surfaceHover transition-colors">
    <td className="px-4 py-4 text-white text-sm font-medium leading-normal flex items-center gap-3">
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" style={{ backgroundImage: `url("${avatar}")` }}></div>
      {name}
    </td>
    <td className="hidden md:table-cell px-4 py-4 text-secondary text-sm font-normal leading-normal">{email}</td>
    <td className="px-4 py-4 text-sm font-normal leading-normal">
      <div className={`inline-flex items-center justify-center rounded-full h-7 px-3 bg-${roleColor}-500/10 text-${roleColor}-400 text-xs font-bold border border-${roleColor}-500/20`}>{role}</div>
    </td>
    <td className="hidden sm:table-cell px-4 py-4 text-secondary text-sm font-normal leading-normal">{lastLogin}</td>
    <td className="px-4 py-4 text-right">
      <button className="text-secondary hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-[20px]">more_vert</span>
      </button>
    </td>
  </tr>
);

export default function Staff() {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5 overflow-y-auto">
      <div className="flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Сотрудники</h1>
            <p className="text-secondary text-base font-normal leading-normal">Управление командой, ролями и доступами.</p>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="material-symbols-outlined mr-2 text-[20px]">add</span>
            Добавить
          </button>
        </div>

        <div className="flex flex-wrap gap-4 p-4">
           {['Всего: 24:group:text-primary', 'Админы: 3:verified_user:text-green-500', 'Менеджеры: 8:manage_accounts:text-purple-500', 'Логисты: 13:local_shipping:text-orange-500'].map(stat => {
             const [label, val, icon, color] = stat.split(':');
             return (
               <div key={label} className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border bg-surface shadow-sm">
                 <div className="flex items-center gap-2">
                   <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                   <p className="text-white text-base font-medium leading-normal">{label}</p>
                 </div>
                 <p className="text-white text-2xl font-bold leading-tight">{val}</p>
               </div>
             )
           })}
        </div>

        <div className="px-4 py-3">
          <div className="flex overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <table className="flex-1 w-full">
              <thead>
                <tr className="bg-surfaceHover">
                  <th className="px-4 py-4 text-left text-white w-[25%] text-sm font-semibold">Имя</th>
                  <th className="hidden md:table-cell px-4 py-4 text-left text-white w-[30%] text-sm font-semibold">Email</th>
                  <th className="px-4 py-4 text-left text-white w-[20%] text-sm font-semibold">Роль</th>
                  <th className="hidden sm:table-cell px-4 py-4 text-left text-white w-[15%] text-sm font-semibold">Входил</th>
                  <th className="px-4 py-4 text-right text-secondary w-[10%] text-sm font-semibold">Действия</th>
                </tr>
              </thead>
              <tbody>
                <StaffRow name="Алексей М." email="alex@filmash.com" role="Администратор" lastLogin="2 мин назад" avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBw3AZ6osUVsrdNpaOEt8Q61CJSjmWrj1Wf8DxdzxzXsvoEdzEq3k1Pa-E2UISdsIodXjvQ6D2p6N8xxtjBaEp4GXvjxVaUD1PNNMDrNs4z3mVQnwlde492wKiVnvKSmLm8s_95k4bWyAdcj4CZxdA39t6lh94CIRWhsViNRwQWoEiiz787CfHsorGc7dEUo28Utcjd6dOzSMrUaJWhyGvfEPNrGsQA_LpJivqbs7936ySJRjxnzBLfeFgzcUa77jD6Yu3zD6czfIk" roleColor="red" />
                <StaffRow name="Сара К." email="sarah@filmash.com" role="Менеджер" lastLogin="1 час назад" avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCFe-IyRewdDPYdYH12pFMmHmSfKtK0nL8prcd55Pt5IbgvtBrT1qM8xE4XBZPVKLojwmCvLJuVVGLRnDDEQX_dqptVUhzTcu4BF6ms5Usqip-8i7AvoEtKPRpqPFW_plGnPROaFgrv2C2ztHTuEp6s0v1WmYpsG4dfl7_TxtcphXtb6rp8oaX-gTkoRENXq3_1hkiAbK5cMtKLnUys0Oo6ABnreOiDZiprsMWKfTT4A45bG5Yo5Sjnx6dmUp2ZJFHPBsfRWa6QKwc" roleColor="purple" />
                <StaffRow name="Джеймс Б." email="007@filmash.com" role="Логист" lastLogin="1 день назад" avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBbljXhEIvpRhV5Xaw3X_Ktarb6qmB123SOHqQEpsU_z0asTWCU4i9UL0pUPPV6J8_Q-Y2mLNKSMdHIw1V6gm-Bh7EY8YPYIVhpkB8e7sb7OQ4kAS_HKIY-mCuZb4xwskEh7Z25Jl9fVOj6lar8RTjx72kzHuNDY-n4vpHmhJq51MF0i1qzm-MQ4VeqWZAo4UqKRPRQza7gR6X-tA8uYSUCoKzdcYsgy4j6L0TZSHmXWp7ImK1oxBIcVfKmDK3SaEK1xoy5vxyky9I" roleColor="blue" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}