'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SidebarItem = ({ href, icon, label, badge }: { href: string, icon: string, label: string, badge?: number }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));

  return (
    <Link href={href} className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
        isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
    )}>
      <span className={cn(
          "material-symbols-outlined text-[20px]",
          isActive ? 'text-primary' : 'text-zinc-500 group-hover:text-white'
      )} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {badge && <span className="bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    </Link>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-black font-black">dashboard</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-black italic leading-tight uppercase tracking-tighter">Filmash <span className="text-primary">CRM</span></h1>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Рабочее место</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <SidebarItem href="/admin" icon="dashboard" label="Дашборд" />
            <SidebarItem href="/admin/inquiries" icon="inbox" label="Заявки" />
            <SidebarItem href="/admin/logistics" icon="local_shipping" label="Логистика" />
            <SidebarItem href="/admin/inventory" icon="directions_car" label="Каталог авто" />
            <SidebarItem href="/admin/finance" icon="payments" label="Финансы" />
            <SidebarItem href="/admin/staff" icon="group" label="Сотрудники" />
            <div className="h-px bg-zinc-900 my-2 mx-3"></div>
            <SidebarItem href="/admin/settings" icon="settings" label="Настройки" />
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-zinc-900">
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="size-8 rounded-full bg-zinc-800" />
            <div className="flex flex-col overflow-hidden flex-1">
              <p className="text-white text-xs font-bold truncate uppercase tracking-tighter italic">Алексей М.</p>
              <p className="text-zinc-500 text-[9px] truncate uppercase font-black tracking-widest opacity-70">Старший менеджер</p>
            </div>
            <button
              onClick={() => {
                document.cookie = 'filmash-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                window.location.href = '/admin/login';
              }}
              className="text-zinc-600 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden bg-black flex flex-col">
        {children}
      </main>
    </div>
  );
}
