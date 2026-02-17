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

const KanbanCard = ({ id, title, subtitle, icon, statusColor, image, onClick }: any) => (
  <div onClick={onClick} className="group relative flex flex-col justify-end h-64 rounded-[2rem] overflow-hidden border border-zinc-900 hover:border-primary/50 transition-all cursor-pointer shadow-xl">
    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
      <ImageOptimized
        src={image}
        alt={title}
        fill
        imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
    <div className="relative z-10 p-6">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-black text-white px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 uppercase tracking-widest">{id}</span>
      </div>
      <h4 className="text-white font-black text-xl italic leading-none mb-2 uppercase tracking-tighter">{title}</h4>
      <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest italic">
        <span className="material-symbols-outlined text-sm text-primary">{icon}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  </div>
);

export default function LogisticsPage() {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [isNewDeliveryOpen, setIsNewDeliveryOpen] = useState(false);
  const [newDelivery, setNewDelivery] = useState({ id: '', title: '', status: '' });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Доска <span className="text-zinc-600">Логистики</span></h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Статус импорта в реальном времени</p>
          </div>
          <div className="flex gap-4">
            <button className="h-14 px-8 bg-zinc-900 text-zinc-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:text-white transition-all italic border border-zinc-800">
               Фильтры
            </button>
            <button
              onClick={() => setIsNewDeliveryOpen(true)}
              className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10"
            >
               Новая поставка
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto p-8">
        <div className="flex h-full gap-8">
          <KanbanColumn title="Куплено" count={3} color="bg-blue-500">
            <KanbanCard onClick={() => setSelectedCar({id: "#FIL-001", title: "Tesla Model X", status: "Ожидание документов", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"})} id="#FIL-001" title="Tesla Model X" subtitle="Ожидание документов" icon="description" image="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80" />
            <KanbanCard onClick={() => setSelectedCar({id: "#FIL-005", title: "BMW i7 M70", status: "Ожидает оплаты", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80"})} id="#FIL-005" title="BMW i7 M70" subtitle="Ожидает оплаты" icon="payments" image="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80" />
          </KanbanColumn>

          <KanbanColumn title="Экспорт" count={1} color="bg-indigo-500">
             <KanbanCard id="#FIL-998" title="Zeekr 001" subtitle="Порт: Шанхай" icon="sailing" image="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80" />
          </KanbanColumn>

          <KanbanColumn title="Таможня" count={2} color="bg-yellow-500">
             <KanbanCard id="#FIL-990" title="Li L9 Ultra" subtitle="Документы поданы" icon="gavel" image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80" />
          </KanbanColumn>

          <KanbanColumn title="В пути по РФ" count={1} color="bg-purple-500">
            <KanbanCard id="#FIL-002" title="Lotus Eletre" subtitle="В: Москва" icon="local_shipping" image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" />
          </KanbanColumn>

           <KanbanColumn title="Готово" count={2} color="bg-green-500">
            <KanbanCard id="#FIL-887" title="Yangwang U8" subtitle="Выдача завтра" icon="verified" image="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80" />
          </KanbanColumn>
        </div>
      </div>

      <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-2xl rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
          {selectedCar && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <ImageOptimized
                  src={selectedCar.image}
                  alt={selectedCar.title}
                  fill
                  imgClassName="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col gap-6">
                <DialogHeader>
                  <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 italic">{selectedCar.id}</div>
                  <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter leading-tight text-white">{selectedCar.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Текущий статус</p>
                    <p className="text-white font-black uppercase italic">{selectedCar.status}</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest italic">Этапы доставки</p>
                     <div className="flex items-center gap-3 text-xs text-primary font-bold">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Покупка завершена</span>
                     </div>
                     <div className="flex items-center gap-3 text-xs text-zinc-400 font-bold animate-pulse">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>Ожидание в порту</span>
                     </div>
                  </div>
                </div>
                <button className="mt-auto h-14 w-full bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all italic shadow-lg shadow-white/5">
                    Подробнее в CRM
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNewDeliveryOpen} onOpenChange={setIsNewDeliveryOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Новая Поставка</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">ID Автомобиля</Label>
              <Input
                value={newDelivery.id}
                onChange={e => setNewDelivery({...newDelivery, id: e.target.value})}
                placeholder="#FIL-000"
                className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white italic"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Модель</Label>
              <Input
                value={newDelivery.title}
                onChange={e => setNewDelivery({...newDelivery, title: e.target.value})}
                placeholder="напр. Zeekr 001"
                className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white italic"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsNewDeliveryOpen(false)}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic"
            >
              Создать карточку
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
