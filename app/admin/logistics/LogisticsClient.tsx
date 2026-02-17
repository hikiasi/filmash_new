'use client';

import React, { useState } from 'react';
import ImageOptimized from '@/components/shared/ImageOptimized';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, FileText, Camera, MapPin, ChevronRight, Plus, Trash2 } from 'lucide-react';

const KanbanColumn = ({ title, count, color, children }: { title: string, count: number, color: string, children?: React.ReactNode }) => (
  <div className="flex flex-col w-80 shrink-0 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden h-full shadow-2xl">
    <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/10">
      <div className="flex items-center gap-3">
        <div className={`size-2 rounded-full ${color}`}></div>
        <h3 className="text-white font-black text-[10px] uppercase tracking-widest italic">{title}</h3>
      </div>
      <span className="bg-zinc-900 text-zinc-500 text-[10px] font-black px-3 py-1 rounded-full">{count}</span>
    </div>
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      {children}
    </div>
  </div>
);

const KanbanCard = ({ delivery, onClick }: { delivery: any, onClick: () => void }) => {
    const inquiry = delivery.inquiry;
    const modelName = inquiry ? `${inquiry.trim.model.brand.name} ${inquiry.trim.model.name}` : delivery.car_name;
    const image = inquiry?.configuration_snapshot?.imageUrl || '/placeholder-car.jpg';

    return (
        <div onClick={onClick} className="group relative flex flex-col justify-end h-64 rounded-[2rem] overflow-hidden border border-zinc-900 hover:border-primary/50 transition-all cursor-pointer shadow-xl">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <ImageOptimized
                    src={image}
                    alt={modelName}
                    fill
                    imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="relative z-10 p-6">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black text-white px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 uppercase tracking-widest">
                        {delivery.vin?.slice(-6) || delivery.id.slice(-4)}
                    </span>
                </div>
                <h4 className="text-white font-black text-xl italic leading-none mb-2 uppercase tracking-tighter">{modelName}</h4>
                <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest italic">
                    <MapPin className="size-3 text-primary" />
                    <span>{delivery.current_location || 'Локация не указана'}</span>
                </div>
            </div>
        </div>
    );
};

export default function LogisticsClient({ initialDeliveries, availableInquiries }: any) {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [isNewDeliveryOpen, setIsNewDeliveryOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [newDelivery, setNewDelivery] = useState({
    inquiry_id: 'none',
    car_name: '',
    vin: '',
    status: 'PURCHASED'
  });

  const columns = [
    { title: 'Куплено', status: 'PURCHASED', color: 'bg-blue-500' },
    { title: 'Экспорт', status: 'EXPORT', color: 'bg-indigo-500' },
    { title: 'Таможня', status: 'CUSTOMS', color: 'bg-yellow-500' },
    { title: 'В пути по РФ', status: 'TRANSIT', color: 'bg-purple-500' },
    { title: 'Готово', status: 'DELIVERED', color: 'bg-green-500' },
  ];

  const handleCreateDelivery = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...newDelivery,
        inquiry_id: newDelivery.inquiry_id === 'none' ? null : newDelivery.inquiry_id
      };
      const res = await fetch('/api/admin/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsNewDeliveryOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateDelivery = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/deliveries/${selectedDelivery.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedDelivery),
      });
      if (res.ok) {
        setSelectedDelivery(null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'document' | 'loading' | 'unloading') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('folder', `logistics/${type}`);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.url) {
        if (type === 'document') {
            const docs = selectedDelivery.documents || [];
            setSelectedDelivery({
                ...selectedDelivery,
                documents: [...docs, { name: file.name, url: result.url, type: 'other' }]
            });
        } else if (type === 'loading') {
            const photos = selectedDelivery.loading_photos || [];
            setSelectedDelivery({ ...selectedDelivery, loading_photos: [...photos, result.url] });
        } else if (type === 'unloading') {
            const photos = selectedDelivery.unloading_photos || [];
            setSelectedDelivery({ ...selectedDelivery, unloading_photos: [...photos, result.url] });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-20 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Доска <span className="text-zinc-600">Логистики</span></h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Управление импортом в реальном времени</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsNewDeliveryOpen(true)}
              className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10"
            >
               Новая поставка
            </button>
          </div>
        </div>
      </header>

      <div className="p-8 overflow-x-auto">
        <div className="flex gap-8 min-h-[calc(100vh-200px)]">
          {columns.map(col => {
              const colDeliveries = initialDeliveries.filter((d: any) => d.status === col.status);
              return (
                <KanbanColumn key={col.status} title={col.title} count={colDeliveries.length} color={col.color}>
                    {colDeliveries.map((d: any) => (
                        <KanbanCard key={d.id} delivery={d} onClick={() => setSelectedDelivery(d)} />
                    ))}
                </KanbanColumn>
              );
          })}
        </div>
      </div>

      {/* New Delivery Modal */}
      <Dialog open={isNewDeliveryOpen} onOpenChange={setIsNewDeliveryOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Новая Поставка</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Связать с заявкой</Label>
              <Select value={newDelivery.inquiry_id} onValueChange={v => setNewDelivery({...newDelivery, inquiry_id: v})}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-white italic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                  <SelectItem value="none">Без привязки (вручную)</SelectItem>
                  {availableInquiries.map((inq: any) => (
                    <SelectItem key={inq.id} value={inq.id}>
                        {inq.customer_name} — {inq.trim.model.brand.name} {inq.trim.model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newDelivery.inquiry_id === 'none' && (
                <div className="space-y-2">
                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Название авто</Label>
                    <Input
                        value={newDelivery.car_name}
                        onChange={e => setNewDelivery({...newDelivery, car_name: e.target.value})}
                        placeholder="Zeekr 001"
                        className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-white italic"
                    />
                </div>
            )}

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">VIN Номер</Label>
              <Input
                value={newDelivery.vin}
                onChange={e => setNewDelivery({...newDelivery, vin: e.target.value})}
                placeholder="VIN..."
                className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-white italic"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isSaving}
              onClick={handleCreateDelivery}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic"
            >
              {isSaving ? 'Создание...' : 'Добавить в работу'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detailed Delivery Modal */}
      <Dialog open={!!selectedDelivery} onOpenChange={() => setSelectedDelivery(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-4xl rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
          <DialogTitle className="sr-only">Детали поставки</DialogTitle>
          {selectedDelivery && (
            <div className="flex flex-col h-[80vh]">
              <div className="h-48 bg-zinc-900 relative overflow-hidden shrink-0 border-b border-zinc-800">
                <ImageOptimized
                  src={selectedDelivery.inquiry?.configuration_snapshot?.imageUrl || '/placeholder-car.jpg'}
                  alt="Car"
                  fill
                  imgClassName="object-cover opacity-30"
                />
                <div className="absolute inset-0 p-10 flex items-end justify-between">
                    <div>
                        <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-1 italic">
                            #{selectedDelivery.id.slice(-6)}
                        </div>
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
                            {selectedDelivery.inquiry ? `${selectedDelivery.inquiry.trim.model.brand.name} ${selectedDelivery.inquiry.trim.model.name}` : selectedDelivery.car_name}
                        </h2>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-2 italic">Статус импорта</span>
                        <Select
                            value={selectedDelivery.status}
                            onValueChange={v => setSelectedDelivery({...selectedDelivery, status: v})}
                        >
                            <SelectTrigger className="w-48 bg-primary border-none text-black font-black uppercase italic rounded-xl h-10">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white font-black uppercase italic">
                                {columns.map(c => (
                                    <SelectItem key={c.status} value={c.status}>{c.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">info</span>
                            Инфо & Локация
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[9px] text-zinc-500 font-black uppercase ml-2">VIN Номер</Label>
                                <Input
                                    value={selectedDelivery.vin || ''}
                                    onChange={e => setSelectedDelivery({...selectedDelivery, vin: e.target.value})}
                                    className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] text-zinc-500 font-black uppercase ml-2">Текущая локация</Label>
                                <Input
                                    value={selectedDelivery.current_location || ''}
                                    onChange={e => setSelectedDelivery({...selectedDelivery, current_location: e.target.value})}
                                    placeholder="напр. Порт Шанхай"
                                    className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white italic"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">description</span>
                            Документы
                        </h3>
                        <div className="space-y-3">
                            {selectedDelivery.documents?.map((doc: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 group/doc">
                                    <div className="flex items-center gap-3">
                                        <FileText className="size-4 text-zinc-600" />
                                        <span className="text-[10px] font-black uppercase text-zinc-300 truncate max-w-[200px]">{doc.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a href={doc.url} target="_blank" className="text-[9px] font-black text-primary uppercase italic hover:underline">Открыть</a>
                                        <button
                                            onClick={() => {
                                                const docs = selectedDelivery.documents.filter((_:any,idx:number) => idx !== i);
                                                setSelectedDelivery({...selectedDelivery, documents: docs});
                                            }}
                                            className="size-6 rounded-md bg-zinc-950 flex items-center justify-center text-zinc-700 hover:text-red-500 opacity-0 group-hover/doc:opacity-100 transition-all"
                                        >
                                            <Trash2 className="size-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="relative">
                                <input type="file" onChange={e => handleFileUpload(e, 'document')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <button className="w-full h-12 border-2 border-dashed border-zinc-900 rounded-xl flex items-center justify-center gap-2 text-zinc-600 hover:text-white hover:border-zinc-700 transition-all text-[10px] font-black uppercase">
                                    <Plus className="size-3" /> Прикрепить документ
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                     <section>
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">camera_alt</span>
                            Фото погрузки
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                             {selectedDelivery.loading_photos?.map((p: string, i: number) => (
                                <div key={i} className="aspect-square rounded-lg bg-zinc-900 relative overflow-hidden group/img">
                                    <img src={p} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => {
                                            const photos = selectedDelivery.loading_photos.filter((_:any,idx:number) => idx !== i);
                                            setSelectedDelivery({...selectedDelivery, loading_photos: photos});
                                        }}
                                        className="absolute top-1 right-1 size-5 bg-black/60 rounded flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-all"
                                    >
                                        <Trash2 className="size-3" />
                                    </button>
                                </div>
                             ))}
                             <div className="relative aspect-square">
                                <input type="file" onChange={e => handleFileUpload(e, 'loading')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <div className="w-full h-full border-2 border-dashed border-zinc-900 rounded-lg flex items-center justify-center text-zinc-700 hover:text-zinc-500 transition-all">
                                    <Plus className="size-6" />
                                </div>
                             </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
                            Фото выгрузки / выдачи
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                             {selectedDelivery.unloading_photos?.map((p: string, i: number) => (
                                <div key={i} className="aspect-square rounded-lg bg-zinc-900 relative overflow-hidden group/img">
                                    <img src={p} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => {
                                            const photos = selectedDelivery.unloading_photos.filter((_:any,idx:number) => idx !== i);
                                            setSelectedDelivery({...selectedDelivery, unloading_photos: photos});
                                        }}
                                        className="absolute top-1 right-1 size-5 bg-black/60 rounded flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-all"
                                    >
                                        <Trash2 className="size-3" />
                                    </button>
                                </div>
                             ))}
                             <div className="relative aspect-square">
                                <input type="file" onChange={e => handleFileUpload(e, 'unloading')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <div className="w-full h-full border-2 border-dashed border-zinc-900 rounded-lg flex items-center justify-center text-zinc-700 hover:text-zinc-500 transition-all">
                                    <Plus className="size-6" />
                                </div>
                             </div>
                        </div>
                    </section>
                </div>
              </div>

              <div className="p-10 border-t border-zinc-900 bg-black/50 shrink-0">
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedDelivery(null)}
                        className="flex-1 h-14 rounded-2xl border-zinc-800 text-zinc-500 font-black uppercase italic"
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={isSaving}
                        onClick={handleUpdateDelivery}
                        className="flex-[2] h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black uppercase italic shadow-lg shadow-white/5"
                    >
                        {isSaving ? <Loader2 className="size-5 animate-spin" /> : 'Сохранить изменения'}
                    </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
