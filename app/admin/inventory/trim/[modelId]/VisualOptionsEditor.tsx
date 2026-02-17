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
import { Loader2, Upload, Plus, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VisualOptionsEditor({
  initialColors,
  initialWheels,
  initialInteriors,
  initialSteering,
  initialOptions,
  trimId
}: any) {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenModal = (type: string, item: any = null) => {
    setEditingItem(item);
    setFormData(item || { is_premium: false });
    setActiveModal(type);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('folder', folder);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
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
    setIsSaving(true);
    const method = editingItem ? 'PATCH' : 'POST';
    const type = activeModal; // color, wheel, etc.
    const pluralMap: any = { color: 'colors', wheel: 'wheels', interior: 'interiors', steering: 'steering', option: 'options' };

    // Construct URL
    const url = editingItem
        ? `/api/admin/${pluralMap[type!]}/${editingItem.id}`
        : `/api/admin/trims/${trimId}/${pluralMap[type!]}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setActiveModal(null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Удалить этот элемент?')) return;
    const pluralMap: any = { color: 'colors', wheel: 'wheels', interior: 'interiors', steering: 'steering', option: 'options' };
    try {
      const res = await fetch(`/api/admin/${pluralMap[type]}/${id}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Colors */}
        <Section
            title="Цвета"
            icon="palette"
            items={initialColors}
            onAdd={() => handleOpenModal('color')}
            onEdit={(item: any) => handleOpenModal('color', item)}
            onDelete={(id: string) => handleDelete('color', id)}
            renderItem={(item: any) => (
                <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full border border-zinc-800 overflow-hidden relative bg-zinc-900">
                        {item.image_url && <img src={item.image_url} className="absolute inset-0 size-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{item.name}</p>
                        {item.is_premium && <p className="text-[9px] text-primary font-bold uppercase">+ Премиум</p>}
                    </div>
                </div>
            )}
        />

        {/* Wheels */}
        <Section
            title="Диски"
            icon="tire_repair"
            items={initialWheels}
            onAdd={() => handleOpenModal('wheel')}
            onEdit={(item: any) => handleOpenModal('wheel', item)}
            onDelete={(id: string) => handleDelete('wheel', id)}
            renderItem={(item: any) => (
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{item.name}</p>
                        <p className="text-[10px] text-zinc-600">{item.size}</p>
                    </div>
                </div>
            )}
        />

        {/* Interior */}
        <Section
            title="Интерьер"
            icon="chair"
            items={initialInteriors}
            onAdd={() => handleOpenModal('interior')}
            onEdit={(item: any) => handleOpenModal('interior', item)}
            onDelete={(id: string) => handleDelete('interior', id)}
            renderItem={(item: any) => (
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{item.name}</p>
                        <p className="text-[10px] text-zinc-600">{item.material}</p>
                    </div>
                </div>
            )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Section
            title="Варианты руля"
            icon="sports_steeringwheel"
            items={initialSteering}
            onAdd={() => handleOpenModal('steering')}
            onEdit={(item: any) => handleOpenModal('steering', item)}
            onDelete={(id: string) => handleDelete('steering', id)}
            renderItem={(item: any) => (
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest">{item.name}</p>
                    </div>
                </div>
            )}
          />

          <Section
            title="Дополнительные опции"
            icon="add_circle"
            items={initialOptions}
            onAdd={() => handleOpenModal('option')}
            onEdit={(item: any) => handleOpenModal('option', item)}
            onDelete={(id: string) => handleDelete('option', id)}
            renderItem={(item: any) => (
                <div className="flex items-start gap-4">
                    <div className="size-12 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{item.name}</p>
                        <p className="text-[10px] text-zinc-600 line-clamp-2 mt-1 italic">{item.description}</p>
                    </div>
                </div>
            )}
          />
      </div>

      {/* Unified Modal */}
      <Dialog open={activeModal !== null} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
              {editingItem ? 'Редактировать' : 'Добавить'} {
                activeModal === 'color' ? 'Цвет' :
                activeModal === 'wheel' ? 'Диски' :
                activeModal === 'interior' ? 'Интерьер' :
                activeModal === 'steering' ? 'Вариант руля' : 'Опцию'
              }
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

            {activeModal === 'wheel' && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Размер (напр. 21'')</Label>
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

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Доп. цена (CNY)</Label>
              <Input
                type="number"
                value={formData.additional_price_cny || 0}
                onChange={e => setFormData({ ...formData, additional_price_cny: parseFloat(e.target.value) })}
                className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:border-primary text-white italic"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={isSaving}
              onClick={handleSave}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic"
            >
              {isSaving ? 'Сохранение...' : (editingItem ? 'Сохранить изменения' : 'Добавить')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({ title, icon, items, onAdd, onEdit, onDelete, renderItem }: any) {
    return (
        <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{icon}</span>
                    {title}
                </h3>
                <button
                  onClick={onAdd}
                  className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800 hover:bg-zinc-800 transition-all"
                >
                    <Plus className="size-4" />
                </button>
            </div>
            <div className="space-y-3 relative z-10">
                {items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl group">
                        <div className="flex-1 min-w-0">
                            {renderItem(item)}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => onEdit(item)} className="size-8 rounded-lg bg-zinc-950 flex items-center justify-center text-zinc-500 hover:text-primary border border-zinc-800">
                                <Pencil className="size-3.5" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="size-8 rounded-lg bg-zinc-950 flex items-center justify-center text-zinc-500 hover:text-red-500 border border-zinc-800">
                                <Trash2 className="size-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section> section
    );
}
