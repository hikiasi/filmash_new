'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload } from 'lucide-react';

export default function VisualOptionsEditor({ initialColors, initialWheels, initialInteriors, initialSteering, initialOptions, modelId }: any) {
  const [colors, setColors] = useState(initialColors || []);
  const [wheels, setWheels] = useState(initialWheels || []);
  const [interiors, setInteriors] = useState(initialInteriors || []);
  const [steering, setSteering] = useState(initialSteering || []);
  const [options, setOptions] = useState(initialOptions || []);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('folder', folder);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, image_url: result.url });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenModal = (type: string) => {
    setFormData({});
    setActiveModal(type);
  };

  const handleAddColor = () => {
    if (formData.name && formData.hex_code) {
      setColors([...colors, { ...formData, id: `new-${Date.now()}` }]);
      setActiveModal(null);
    }
  };

  const handleAddWheel = () => {
    if (formData.name && formData.size) {
      setWheels([...wheels, { ...formData, id: `new-${Date.now()}` }]);
      setActiveModal(null);
    }
  };

  const handleAddInterior = () => {
    if (formData.name) {
      setInteriors([...interiors, { ...formData, id: `new-${Date.now()}` }]);
      setActiveModal(null);
    }
  };

  const handleAddSteering = () => {
    if (formData.name) {
      setSteering([...steering, { ...formData, id: `new-${Date.now()}` }]);
      setActiveModal(null);
    }
  };

  const handleAddOption = () => {
    if (formData.name) {
      setOptions([...options, { ...formData, id: `new-${Date.now()}` }]);
      setActiveModal(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Colors */}
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">palette</span>
                    Цвета
                </h3>
                <button
                  onClick={() => handleOpenModal('color')}
                  className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>
            <div className="space-y-3 relative z-10">
                {colors.map((color: any) => (
                    <div key={color.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="size-10 rounded-full border border-zinc-800 overflow-hidden relative" style={{ backgroundColor: color.hex_code }}>
                             {color.image_url && <img src={color.image_url} className="absolute inset-0 size-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{color.name}</p>
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
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">tire_repair</span>
                    Диски
                </h3>
                <button
                  onClick={() => handleOpenModal('wheel')}
                  className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>
            <div className="space-y-3 relative z-10">
                {wheels.map((wheel: any) => (
                    <div key={wheel.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                            {wheel.image_url && <img src={wheel.image_url} alt={wheel.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{wheel.name}</p>
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
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">chair</span>
                    Интерьер
                </h3>
                <button
                  onClick={() => handleOpenModal('interior')}
                  className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>
            <div className="space-y-3 relative z-10">
                {interiors.map((interior: any) => (
                    <div key={interior.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                            {interior.image_url && <img src={interior.image_url} alt={interior.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{interior.name}</p>
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
          <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
              <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">sports_steeringwheel</span>
                      Варианты руля
                  </h3>
                  <button
                    onClick={() => handleOpenModal('steering')}
                    className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all"
                  >
                      <span className="material-symbols-outlined text-sm">add</span>
                  </button>
              </div>
              <div className="space-y-3 relative z-10">
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
          <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
              <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">add_circle</span>
                      Дополнительные опции
                  </h3>
                  <button
                    onClick={() => handleOpenModal('option')}
                    className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all"
                  >
                      <span className="material-symbols-outlined text-sm">add</span>
                  </button>
              </div>
              <div className="space-y-3 relative z-10">
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

      {/* Modals */}
      <Dialog open={activeModal !== null} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
              {activeModal === 'color' && 'Добавить Цвет'}
              {activeModal === 'wheel' && 'Добавить Диски'}
              {activeModal === 'interior' && 'Добавить Интерьер'}
              {activeModal === 'steering' && 'Добавить Вариант руля'}
              {activeModal === 'option' && 'Добавить Опцию'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Название</Label>
              <Input
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Название..."
                className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:border-primary text-white italic"
              />
            </div>

            {activeModal === 'color' && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">HEX Код</Label>
                <div className="flex gap-2">
                   <Input
                    value={formData.hex_code || ''}
                    onChange={e => setFormData({ ...formData, hex_code: e.target.value })}
                    placeholder="#FFFFFF"
                    className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:border-primary text-white flex-1 italic"
                  />
                  <div className="size-12 rounded-xl border border-zinc-800 shrink-0" style={{ backgroundColor: formData.hex_code || '#000' }} />
                </div>
              </div>
            )}

            {activeModal === 'wheel' && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Размер (напр. 21")</Label>
                <Input
                  value={formData.size || ''}
                  onChange={e => setFormData({ ...formData, size: e.target.value })}
                placeholder="21''"
                  className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:border-primary text-white italic"
                />
              </div>
            )}

            {activeModal === 'interior' && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Материал</Label>
                <Input
                  value={formData.material || ''}
                  onChange={e => setFormData({ ...formData, material: e.target.value })}
                  placeholder="Кожа Наппа"
                  className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:border-primary text-white italic"
                />
              </div>
            )}

            {activeModal === 'option' && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Описание</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание опции..."
                  className="bg-zinc-900 border-zinc-800 rounded-xl focus:border-primary text-white min-h-[100px] italic"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Изображение</Label>
              <div className="flex gap-4">
                 <Input
                    value={formData.image_url || ''}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="/uploads/..."
                    className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:border-primary text-white italic flex-1"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, activeModal || 'misc')}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <Button variant="outline" className="h-12 w-12 rounded-xl bg-zinc-900 border-zinc-800 p-0">
                       {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                    </Button>
                  </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                if (activeModal === 'color') handleAddColor();
                if (activeModal === 'wheel') handleAddWheel();
                if (activeModal === 'interior') handleAddInterior();
                if (activeModal === 'steering') handleAddSteering();
                if (activeModal === 'option') handleAddOption();
              }}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic"
            >
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
