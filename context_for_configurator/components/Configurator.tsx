
import React, { useState, useMemo } from 'react';
import { Car, CarModel, CarColor, CarWheels, CarInterior, TechSpecs } from '../types';
import { ChevronRight, Info, CheckCircle2, Zap, Timer, Compass, Ruler } from 'lucide-react';

interface ConfiguratorProps {
  car: Car;
  exchangeRate: number;
  onOrder: (lead: { carName: string; config: string; priceRUB: number; userName: string; userPhone: string }) => void;
}

const Configurator: React.FC<ConfiguratorProps> = ({ car, exchangeRate, onOrder }) => {
  const [selectedModel, setSelectedModel] = useState(car.models[0]);
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [selectedWheels, setSelectedWheels] = useState(car.wheels[0]);
  const [selectedInterior, setSelectedInterior] = useState(car.interiors[0]);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const totalPriceCNY = useMemo(() => {
    return car.basePriceCNY + 
           selectedModel.priceModifierCNY + 
           selectedColor.priceModifierCNY + 
           selectedWheels.priceModifierCNY + 
           selectedInterior.priceModifierCNY;
  }, [car, selectedModel, selectedColor, selectedWheels, selectedInterior]);

  const totalPriceRUB = totalPriceCNY * exchangeRate;

  // Logic for displaying the correct image based on configuration
  // In a real app, these would be layered or specifically rendered shots
  const currentImage = useMemo(() => {
    // Priority: Color determines the base look
    return selectedColor.image;
  }, [selectedColor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const configString = `${selectedModel.name} / ${selectedColor.name} / ${selectedWheels.name} / ${selectedInterior.name}`;
    onOrder({
      carName: car.name,
      config: configString,
      priceRUB: totalPriceRUB,
      userName,
      userPhone
    });
    alert('Заявка успешно отправлена! Наш менеджер свяжется с вами.');
    setShowForm(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: Visualization */}
      <div className="lg:w-2/3 space-y-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <img 
            src={currentImage} 
            alt="Configured Car" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-700" 
          />
          <div className="absolute bottom-6 left-6 flex gap-4">
             <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/10">
               <span className="text-zinc-400">Цвет: </span>
               <span className="font-bold">{selectedColor.name}</span>
             </div>
             <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/10">
               <span className="text-zinc-400">Диски: </span>
               <span className="font-bold">{selectedWheels.name}</span>
             </div>
          </div>
        </div>

        {/* Technical Specs Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SpecItem icon={<Timer size={20} />} label="0-100 км/ч" value={car.specs.acceleration} />
          <SpecItem icon={<Compass size={20} />} label="Запас хода" value={car.specs.range} />
          <SpecItem icon={<Zap size={20} />} label="Мощность" value={car.specs.power} />
          <SpecItem icon={<Ruler size={20} />} label="Привод" value={car.specs.drive} />
        </div>

        <div className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="text-zinc-500" />
            Технические характеристики
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            <div className="flex justify-between py-2 border-b border-zinc-800">
               <span className="text-zinc-400">Габариты</span>
               <span className="font-medium">{car.specs.dimensions}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
               <span className="text-zinc-400">Привод</span>
               <span className="font-medium">{car.specs.drive}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
               <span className="text-zinc-400">Модель</span>
               <span className="font-medium">{selectedModel.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
               <span className="text-zinc-400">Версия</span>
               <span className="font-medium">2024 (Latest)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="lg:w-1/3 space-y-6">
        <div className="sticky top-24 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">{car.brand}</h2>
            <h1 className="text-4xl font-bold mb-6">{car.name}</h1>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-zinc-400 font-medium">Итоговая цена</span>
                <div className="text-right">
                  <div className="text-3xl font-black">{totalPriceRUB.toLocaleString()} ₽</div>
                  <div className="text-sm text-zinc-500">{totalPriceCNY.toLocaleString()} ¥</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowForm(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              Заказать расчет
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Configuration Options */}
          <div className="space-y-8">
            {/* Model Selection */}
            <div>
              <h4 className="text-sm font-bold uppercase text-zinc-500 mb-3 px-2">Модификация</h4>
              <div className="grid grid-cols-1 gap-2">
                {car.models.map(m => (
                  <OptionItem 
                    key={m.id} 
                    label={m.name} 
                    active={selectedModel.id === m.id} 
                    price={m.priceModifierCNY}
                    onClick={() => setSelectedModel(m)} 
                  />
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="text-sm font-bold uppercase text-zinc-500 mb-3 px-2">Цвет кузова</h4>
              <div className="flex flex-wrap gap-3 px-2">
                {car.colors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.id === c.id ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.id === c.id && <CheckCircle2 size={16} className="text-white mix-blend-difference" />}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-zinc-400 px-2">{selectedColor.name} (+{selectedColor.priceModifierCNY} ¥)</div>
            </div>

            {/* Wheels */}
            <div>
              <h4 className="text-sm font-bold uppercase text-zinc-500 mb-3 px-2">Диски</h4>
              <div className="grid grid-cols-1 gap-2">
                {car.wheels.map(w => (
                  <OptionItem 
                    key={w.id} 
                    label={w.name} 
                    active={selectedWheels.id === w.id} 
                    price={w.priceModifierCNY}
                    onClick={() => setSelectedWheels(w)} 
                  />
                ))}
              </div>
            </div>

            {/* Interior */}
            <div>
              <h4 className="text-sm font-bold uppercase text-zinc-500 mb-3 px-2">Интерьер</h4>
              <div className="grid grid-cols-1 gap-2">
                {car.interiors.map(i => (
                  <OptionItem 
                    key={i.id} 
                    label={i.name} 
                    active={selectedInterior.id === i.id} 
                    price={i.priceModifierCNY}
                    onClick={() => setSelectedInterior(i)} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">Оформить заявку</h2>
            <p className="text-zinc-400 text-sm mb-6">Оставьте ваши контакты, и мы подготовим для вас персональное предложение на {car.name}.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Ваше имя</label>
                <input 
                  type="text" 
                  required
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" 
                  placeholder="Александр"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Телефон</label>
                <input 
                  type="tel" 
                  required
                  value={userPhone}
                  onChange={e => setUserPhone(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" 
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <button className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:bg-zinc-200 transition-colors">
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const OptionItem: React.FC<{ label: string; active: boolean; price: number; onClick: () => void }> = ({ label, active, price, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all ${
      active ? 'bg-zinc-100 text-black border-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
    }`}
  >
    <span className="font-bold text-sm">{label}</span>
    <span className={`text-xs ${active ? 'text-zinc-600' : 'text-zinc-500'}`}>
      {price > 0 ? `+${price.toLocaleString()} ¥` : 'Стандарт'}
    </span>
  </button>
);

const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl flex flex-col items-center text-center">
    <div className="text-zinc-500 mb-2">{icon}</div>
    <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">{label}</div>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

export default Configurator;
