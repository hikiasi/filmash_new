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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2, Upload, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ImageOptimized from '@/components/shared/ImageOptimized';

export default function ConfigImageEditor({
  trimId,
  configImages,
  colors,
  wheels,
  interiors,
  steeringWheels
}: any) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    type: 'exterior',
    color_id: null,
    wheel_id: null,
    interior_id: null,
    steering_wheel_id: null,
    image_url: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        type: item.type,
        color_id: item.color_id || 'none',
        wheel_id: item.wheel_id || 'none',
        interior_id: item.interior_id || 'none',
        steering_wheel_id: item.steering_wheel_id || 'none',
        image_url: item.image_url
      });
    } else {
      setEditingItem(null);
      setFormData({
        type: 'exterior',
        color_id: 'none',
        wheel_id: 'none',
        interior_id: 'none',
        steering_wheel_id: 'none',
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'config-views');

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
    const url = editingItem
        ? `/api/admin/config-images/${editingItem.id}`
        : `/api/admin/trims/${trimId}/config-images`;

    // Clean up "none" values to null for DB
    const payload = {
        ...formData,
        color_id: formData.color_id === 'none' ? null : formData.color_id,
        wheel_id: formData.wheel_id === 'none' ? null : formData.wheel_id,
        interior_id: formData.interior_id === 'none' ? null : formData.interior_id,
        steering_wheel_id: formData.steering_wheel_id === 'none' ? null : formData.steering_wheel_id,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту визуализацию?')) return;
    try {
      const res = await fetch(`/api/admin/config-images/${id}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl relative">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">visibility</span>
            Визуализации (Рендеры авто)
          </h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Свяжите комбинации опций с картинками высокого разрешения</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="h-10 px-6 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic flex items-center gap-2"
        >
          <Plus className="size-4" />
          Добавить ракурс
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {configImages?.map((img: any) => (
          <div key={img.id} className="group bg-zinc-900/50 border border-zinc-900 rounded-3xl overflow-hidden hover:border-primary/30 transition-all">
             <div className="aspect-[16/10] relative bg-black">
                <ImageOptimized src={img.image_url} alt="Config View" fill imgClassName="object-contain" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                        {img.type === 'exterior' ? 'Экстерьер' : 'Интерьер'}
                    </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleOpenModal(img)} className="size-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-primary transition-colors border border-white/10">
                        <Pencil className="size-3.5" />
                    </button>
                    <button onClick={() => handleDelete(img.id)} className="size-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-red-500 transition-colors border border-white/10">
                        <Trash2 className="size-3.5" />
                    </button>
                </div>
             </div>
             <div className="p-5 space-y-3">
                <div className="flex flex-wrap gap-2">
                    {img.color && <Tag icon="palette" label={img.color.name} />}
                    {img.wheel && <Tag icon="tire_repair" label={img.wheel.name} />}
                    {img.interior && <Tag icon="chair" label={img.interior.name} />}
                    {img.steering_wheel && <Tag icon="sports_steeringwheel" label={img.steering_wheel.name} />}
                </div>
             </div>
          </div>
        ))}
        {configImages?.length === 0 && (
            <div className="col-span-full py-20 border-2 border-dashed border-zinc-900 rounded-[2rem] flex flex-col items-center justify-center text-zinc-700">
                <span className="material-symbols-outlined text-5xl mb-4">photo_library</span>
                <p className="text-[10px] font-black uppercase tracking-widest italic">Пока нет загруженных ракурсов</p>
            </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-xl rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
              {editingItem ? 'Редактировать Ракурс' : 'Добавить Ракурс'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Тип вида</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                  <SelectItem value="exterior">Экстерьер</SelectItem>
                  <SelectItem value="interior">Интерьер</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2 italic">Файл изображения</Label>
              <div className="relative">
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <Button variant="outline" className="w-full h-12 bg-zinc-900 border-zinc-800 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 text-white font-black text-[10px] uppercase italic tracking-widest">
                  {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                  {formData.image_url ? 'Файл выбран' : 'Загрузить PNG/JPG'}
                </Button>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
                {formData.type === 'exterior' ? (
                    <>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Цвет кузова</Label>
                            <Select value={formData.color_id || 'none'} onValueChange={(v) => setFormData({ ...formData, color_id: v })}>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                                    <SelectItem value="none">Любой (базовый)</SelectItem>
                                    {colors?.map((c: any) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Диски</Label>
                            <Select value={formData.wheel_id || 'none'} onValueChange={(v) => setFormData({ ...formData, wheel_id: v })}>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                                    <SelectItem value="none">Стандартные</SelectItem>
                                    {wheels?.map((w: any) => (
                                        <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Интерьер</Label>
                            <Select value={formData.interior_id || 'none'} onValueChange={(v) => setFormData({ ...formData, interior_id: v })}>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                                    <SelectItem value="none">Стандартный</SelectItem>
                                    {interiors?.map((i: any) => (
                                        <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Руль</Label>
                            <Select value={formData.steering_wheel_id || 'none'} onValueChange={(v) => setFormData({ ...formData, steering_wheel_id: v })}>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                                    <SelectItem value="none">Стандартный</SelectItem>
                                    {steeringWheels?.map((s: any) => (
                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}
            </div>

            {formData.image_url && (
                <div className="col-span-2 pt-4">
                    <div className="aspect-[21/9] rounded-2xl bg-black overflow-hidden border border-zinc-800">
                        <img src={formData.image_url} className="w-full h-full object-contain" alt="Preview" />
                    </div>
                </div>
            )}
          </div>

          <DialogFooter>
            <Button
              disabled={isSaving || !formData.image_url}
              onClick={handleSave}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic"
            >
              {isSaving ? 'Сохранение...' : (editingItem ? 'Обновить вид' : 'Добавить вид')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Tag({ icon, label }: { icon: string, label: string }) {
    return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[9px] font-black text-zinc-400 uppercase tracking-widest italic">
            <span className="material-symbols-outlined text-[14px] text-primary">{icon}</span>
            {label}
        </span>
    );
}
