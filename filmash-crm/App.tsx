import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddVehicle from './pages/AddVehicle';
import TrimEditor from './pages/TrimEditor';
import InquiryDetail from './pages/InquiryDetail';
import Inquiries from './pages/Inquiries';
import Logistics from './pages/Logistics';
import Finance from './pages/Finance';
import Staff from './pages/Staff';
import Settings from './pages/Settings';

const SidebarItem = ({ to, icon, label, badge }: { to: string, icon: string, label: string, badge?: number }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <NavLink to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive ? 'bg-surfaceHover text-white' : 'text-slate-400 hover:text-white hover:bg-surfaceHover'}`}>
      <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`} style={{ fontSize: '20px', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {badge && <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    </NavLink>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-white font-sans">
      <aside className="w-64 bg-surface border-r border-border flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-border shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUTUi7jjXgjZ9EbMrMxquUMSoxLhsE6lkztt5-SyphGldoUuaAj_lzgMMoBw8_bFwnLWiUGQCwqndiB9BjoNBohXOTIdjha4zbguWoQwUM1i8t4jblGZZLQkdK9Qctzw4GCkhLFtadUZkvWlWUaVDKVhU6Bb8DEcub117uDy0bHtMAPnnEXP4VgwaP7YF8klw4WedkhY9LuhbiyNSWgAe4vtfGXroK83kZekQhoJ-u3XB03sEM8HO3pzTiFUCsF3r5ZkM2rvxjbwA")' }}></div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-tight">Filmash CRM</h1>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Рабочее место</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <SidebarItem to="/" icon="dashboard" label="Дашборд" />
            <SidebarItem to="/inquiries" icon="inbox" label="Заявки" badge={12} />
            <SidebarItem to="/logistics" icon="local_shipping" label="Логистика" />
            <SidebarItem to="/inventory" icon="directions_car" label="Каталог авто" />
            <SidebarItem to="/finance" icon="payments" label="Финансы" />
            <SidebarItem to="/staff" icon="group" label="Сотрудники" />
            <div className="h-px bg-border my-2 mx-3"></div>
            <SidebarItem to="/settings" icon="settings" label="Настройки" />
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 rounded-full bg-slate-700 bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMBY2e-jdKL6fxpIoG4dZUic1GbamKEbBuXkLzRuiCBgJCvGcLKhorhjfTURO6qRXqiJsKt_CJbVz9EJEIVEnHz_3ync5vi-VEnZK4fs_9O0Yp11T1hiniyG0hboD6Mg1qD6saVZtq62DcGIrX7U4-LXU8Rc3CQ58WgsBWku3nG-_wTq4WysS7ld_ncCAh3tijqem90Dn_halhINg_U0Iy4oe-bmmXYyQr3BWVMBdIbElNh42R65H77uJStm5ftjW-EYeywTwOgP4")' }}></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-white text-sm font-medium truncate">Алексей М.</p>
              <p className="text-slate-400 text-xs truncate">Старший менеджер</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-background">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/inquiries/detail" element={<InquiryDetail />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<AddVehicle />} />
          <Route path="/inventory/trim" element={<TrimEditor />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}