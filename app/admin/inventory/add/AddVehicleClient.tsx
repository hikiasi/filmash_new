'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddVehicleClient({ brands }: { brands: any[] }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    brand_id: '',
    name: '',
    body_type: 'Внедорожник',
    year: new Date().getFullYear(),
    image_url: '',
    description: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'cars');

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

  const handleSave = async () => {
    if (!formData.brand_id || !formData.name) {
      alert('Заполните обязательные поля');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/admin/inventory');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">
              <Link href="/admin/inventory" className="hover:text-primary transition-colors">Инвентарь</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-zinc-300">Новая модель</span>
            </div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Добавить <span className="text-zinc-600">Автомобиль</span></h1>
          </div>
          <div className="flex gap-4">
             <Link href="/admin/inventory" className="h-14 px-8 bg-zinc-900 text-zinc-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:text-white transition-all italic border border-zinc-800 flex items-center">
                Отмена
             </Link>
             <button
              onClick={handleSave}
              disabled={isSaving}
              className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 disabled:opacity-50"
             >
                {isSaving ? 'Сохранение...' : 'Сохранить модель'}
             </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Основная информация
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Марка (Бренд)</label>
                        <select
                          value={formData.brand_id}
                          onChange={e => setFormData({ ...formData, brand_id: e.target.value })}
                          className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary appearance-none"
                        >
                            <option value="">Выберите бренд...</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Название модели</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="напр. Model X, G-Class"
                          className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Тип кузова</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['Внедорожник', 'Седан', 'Купе', 'Пикап'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setFormData({ ...formData, body_type: type })}
                                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${formData.body_type === type ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-800 bg-zinc-900 text-zinc-600 hover:border-zinc-700'}`}
                                >
                                    <span className="material-symbols-outlined">directions_car</span>
                                    <span className="text-[10px] font-black uppercase tracking-tight">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Год выпуска</label>
                        <input
                          type="number"
                          value={formData.year}
                          onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                          className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary"
                        />
                    </div>
                </div>
            </section>

             <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black text-white mb-10 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">image</span>
                    Главное изображение
                </h3>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-3xl border border-zinc-800 border-dashed flex items-center justify-center overflow-hidden relative">
                             {formData.image_url ? (
                               <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" />
                             ) : (
                               <Car className="size-16 text-zinc-800" />
                             )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Загрузить файл</label>
                            <div className="relative">
                                <input
                                  type="file"
                                  onChange={handleFileUpload}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  accept="image/*"
                                />
                                <Button className="w-full h-14 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-black uppercase italic tracking-widest rounded-2xl flex items-center gap-3">
                                   {isUploading ? <Loader2 className="size-5 animate-spin" /> : <Upload className="size-5" />}
                                   ВЫБРАТЬ ФАЙЛ
                                </Button>
                            </div>
                            <p className="text-[9px] text-zinc-700 uppercase font-bold px-2">Рекомендуется прозрачный фон (PNG) для лучшего отображения в каталоге.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Описание
                </h3>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Введите описание модели..."
                  className="w-full min-h-[150px] bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 text-white font-black italic outline-none focus:border-primary"
                />
            </section>
        </div>
      </div>
    </div>
  );
}
