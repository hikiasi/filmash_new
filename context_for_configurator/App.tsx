
import React, { useState, useEffect } from 'react';
import { View, Car, Lead, AppState } from './types';
import { MOCK_CARS, MOCK_LEADS, INITIAL_EXCHANGE_RATE } from './constants';
import Header from './components/Header';
import Catalog from './components/Catalog';
import Configurator from './components/Configurator';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';
import ImageGen from './components/ImageGen';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.CATALOG);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [appState, setAppState] = useState<AppState>({
    cars: MOCK_CARS,
    leads: MOCK_LEADS,
    exchangeRate: INITIAL_EXCHANGE_RATE
  });

  // Simulation of database persistence
  useEffect(() => {
    const saved = localStorage.getItem('filmash_state');
    if (saved) {
      try {
        setAppState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filmash_state', JSON.stringify(appState));
  }, [appState]);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    setCurrentView(View.CONFIGURATOR);
  };

  const updateCar = (updatedCar: Car) => {
    setAppState(prev => ({
      ...prev,
      cars: prev.cars.map(c => c.id === updatedCar.id ? updatedCar : c)
    }));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setAppState(prev => ({
      ...prev,
      leads: [newLead, ...prev.leads]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {currentView === View.CATALOG && (
          <Catalog 
            cars={appState.cars} 
            exchangeRate={appState.exchangeRate} 
            onSelect={handleCarSelect} 
          />
        )}
        
        {currentView === View.CONFIGURATOR && selectedCar && (
          <Configurator 
            car={selectedCar} 
            exchangeRate={appState.exchangeRate} 
            onOrder={addLead}
          />
        )}

        {currentView === View.ADMIN && (
          <AdminPanel 
            appState={appState} 
            setAppState={setAppState} 
          />
        )}

        {currentView === View.AI_GEN && (
          <ImageGen />
        )}
      </main>

      <ChatBot />

      <footer className="border-t border-zinc-900 py-12 bg-zinc-950">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 opacity-60">
          <div>
            <h3 className="font-bold mb-4 text-white">FILMASH</h3>
            <p className="text-sm">Премиальный сервис подбора и доставки электромобилей из Китая.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Каталог</h4>
            <ul className="text-sm space-y-2">
              <li>Lixiang</li>
              <li>Zeekr</li>
              <li>Avatr</li>
              <li>Yangwang</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Компания</h4>
            <ul className="text-sm space-y-2">
              <li>О нас</li>
              <li>Контакты</li>
              <li>Доставка</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Соцсети</h4>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-white">Telegram</span>
              <span className="cursor-pointer hover:text-white">YouTube</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
