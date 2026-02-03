
import React from 'react';
import { View } from '../types';
import { Car, LayoutGrid, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 group"
          onClick={() => setView(View.CATALOG)}
        >
          <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
            <Car size={20} className="text-black group-hover:text-white" />
          </div>
          <span>FILMASH</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: View.CATALOG, label: 'Каталог', icon: <LayoutGrid size={18} /> },
            { id: View.AI_GEN, label: 'Генератор Авто', icon: <Sparkles size={18} /> },
            { id: View.ADMIN, label: 'Панель управления', icon: <ShieldCheck size={18} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${
                currentView === item.id ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:+79991234455" className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-xs text-zinc-500">Горячая линия</span>
            <span className="text-sm font-bold">+7 999 123 44 55</span>
          </a>
          <button className="bg-zinc-100 text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all flex items-center gap-2">
            <PhoneCall size={16} />
            Связаться
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
