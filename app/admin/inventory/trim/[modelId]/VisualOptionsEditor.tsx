'use client';

import React, { useState } from 'react';

export default function VisualOptionsEditor({ initialColors, initialWheels, initialInteriors, initialSteering, initialOptions, modelId }: any) {
  const [colors, setColors] = useState(initialColors || []);
  const [wheels, setWheels] = useState(initialWheels || []);
  const [interiors, setInteriors] = useState(initialInteriors || []);
  const [steering, setSteering] = useState(initialSteering || []);
  const [options, setOptions] = useState(initialOptions || []);

  const addColor = () => {
    const name = prompt('Название цвета:');
    const hex = prompt('HEX код (напр. #FFFFFF):');
    const imageUrl = prompt('URL картинки (опционально):');
    if (name && hex) {
        setColors([...colors, { id: Math.random().toString(), name, hex_code: hex, image_url: imageUrl, price: 0 }]);
    }
  };

  const addWheel = () => {
    const name = prompt('Название дисков:');
    const size = prompt('Размер (напр. 21"):');
    const imageUrl = prompt('URL картинки:');
    if (name && size) {
        setWheels([...wheels, { id: Math.random().toString(), name, size, image_url: imageUrl, price: 0 }]);
    }
  };

  const addInterior = () => {
    const name = prompt('Название интерьера:');
    const material = prompt('Материал:');
    const imageUrl = prompt('URL картинки:');
    if (name) {
        setInteriors([...interiors, { id: Math.random().toString(), name, material, image_url: imageUrl, price: 0 }]);
    }
  };

  const addSteering = () => {
    const name = prompt('Название руля:');
    const imageUrl = prompt('URL картинки:');
    if (name) {
        setSteering([...steering, { id: Math.random().toString(), name, image_url: imageUrl, price: 0 }]);
    }
  };

  const addOption = () => {
    const name = prompt('Название опции:');
    const desc = prompt('Описание:');
    const imageUrl = prompt('URL картинки/GIF:');
    if (name) {
        setOptions([...options, { id: Math.random().toString(), name, description: desc, image_url: imageUrl, price: 0 }]);
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Colors */}
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">palette</span>
                    Цвета
                </h3>
                <button onClick={addColor} className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>
            <div className="space-y-3">
                {colors.map((color: any) => (
                    <div key={color.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="size-10 rounded-full border border-zinc-800 overflow-hidden relative" style={{ backgroundColor: color.hex_code }}>
                             {color.image_url && <img src={color.image_url} className="absolute inset-0 size-full object-cover" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{color.name}</p>
                            <p className="text-[10px] text-zinc-600">{color.hex_code}</p>
                        </div>
                        <button onClick={() => setColors(colors.filter((c: any) => c.id !== color.id))} className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* Wheels */}
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">tire_repair</span>
                    Диски
                </h3>
                <button onClick={addWheel} className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>
            <div className="space-y-3">
                {wheels.map((wheel: any) => (
                    <div key={wheel.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                            {wheel.image_url && <img src={wheel.image_url} alt={wheel.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{wheel.name}</p>
                            <p className="text-[10px] text-zinc-600">{wheel.size}</p>
                        </div>
                        <button onClick={() => setWheels(wheels.filter((w: any) => w.id !== wheel.id))} className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* Interior */}
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">chair</span>
                    Интерьер
                </h3>
                <button onClick={addInterior} className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>
            <div className="space-y-3">
                {interiors.map((interior: any) => (
                    <div key={interior.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                            {interior.image_url && <img src={interior.image_url} alt={interior.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{interior.name}</p>
                            <p className="text-[10px] text-zinc-600">{interior.material}</p>
                        </div>
                        <button onClick={() => setInteriors(interiors.filter((i: any) => i.id !== interior.id))} className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Steering Wheels */}
          <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">sports_steeringwheel</span>
                      Варианты руля
                  </h3>
                  <button onClick={addSteering} className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all">
                      <span className="material-symbols-outlined text-sm">add</span>
                  </button>
              </div>
              <div className="space-y-3">
                  {steering.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                          <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                              {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1">
                              <p className="text-white text-[10px] font-black uppercase tracking-widest">{item.name}</p>
                          </div>
                          <button onClick={() => setSteering(steering.filter((s: any) => s.id !== item.id))} className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                              <span className="material-symbols-outlined text-lg">close</span>
                          </button>
                      </div>
                  ))}
              </div>
          </section>

          {/* Additional Options */}
          <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">add_circle</span>
                      Дополнительные опции
                  </h3>
                  <button onClick={addOption} className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all">
                      <span className="material-symbols-outlined text-sm">add</span>
                  </button>
              </div>
              <div className="space-y-3">
                  {options.map((opt: any) => (
                      <div key={opt.id} className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                          <div className="size-12 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
                              {opt.image_url && <img src={opt.image_url} alt={opt.name} className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1 min-w-0">
                              <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{opt.name}</p>
                              <p className="text-[10px] text-zinc-600 line-clamp-2 mt-1 italic">{opt.description}</p>
                          </div>
                          <button onClick={() => setOptions(options.filter((o: any) => o.id !== opt.id))} className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                              <span className="material-symbols-outlined text-lg">close</span>
                          </button>
                      </div>
                  ))}
              </div>
          </section>
      </div>
    </div>
  );
}
