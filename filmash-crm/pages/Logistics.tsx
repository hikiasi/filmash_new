import React, { useState } from 'react';

const KanbanColumn = ({ title, count, color, children }: { title: string, count: number, color: string, children?: React.ReactNode }) => (
  <div className="flex flex-col w-1/5 min-w-[300px] bg-background rounded-xl border border-border overflow-hidden h-full">
    <div className="p-4 bg-surface border-b border-border flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${color}`}></div>
        <h3 className="text-white font-bold text-sm uppercase tracking-wide">{title}</h3>
      </div>
      <span className="bg-surfaceHover text-secondary text-xs font-bold px-2 py-1 rounded">{count}</span>
    </div>
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
      {children}
    </div>
  </div>
);

const KanbanCard = ({ id, title, subtitle, icon, statusColor, image, onClick }: any) => (
  <div onClick={onClick} className="group relative flex flex-col justify-end h-48 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer shadow-lg">
    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${image}")` }}></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
    <div className="relative z-10 p-4">
      <div className="flex justify-between items-start mb-1">
        <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${statusColor ? `text-${statusColor}-400 bg-${statusColor}-400/10` : 'text-blue-400 bg-blue-400/10'}`}>{id}</span>
      </div>
      <h4 className="text-white font-bold text-lg leading-tight mb-1">{title}</h4>
      <div className="flex items-center gap-1 text-secondary text-xs">
        <span className="material-symbols-outlined text-sm">{icon}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  </div>
);

const CarModal = ({ car, onClose }: { car: any, onClose: () => void }) => {
    if (!car) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-surface border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white z-10 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url("${car.image}")` }}></div>
                    <div className="p-8 flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-bold">{car.id}</span>
                                <span className="text-secondary text-sm">В пути: 12 дней</span>
                            </div>
                            <h2 className="text-3xl font-black text-white leading-tight">{car.title}</h2>
                            <p className="text-secondary mt-1">VIN: {car.vin || 'WBA732...'}</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wide border-b border-border pb-2">Статус Логистики</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <div className="w-0.5 h-full bg-green-500/30 min-h-[30px]"></div>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">Покупка совершена</p>
                                        <p className="text-secondary text-xs">20 Окт, 14:00 • Дилер подтвердил</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        <div className="w-0.5 h-full bg-border min-h-[30px]"></div>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">Ожидание в порту</p>
                                        <p className="text-secondary text-xs">Текущий статус • Шанхай</p>
                                    </div>
                                </div>
                                 <div className="flex gap-4 opacity-50">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-border"></div>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">Погрузка на судно</p>
                                        <p className="text-secondary text-xs">Ожидается 28 Окт</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto flex gap-3">
                            <button className="flex-1 py-3 bg-surfaceHover border border-border rounded-lg text-white font-bold hover:bg-border transition-colors">Документы</button>
                            <button className="flex-1 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">Подробнее</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Logistics() {
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const handleCardClick = (car: any) => {
      setSelectedCar(car);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {selectedCar && <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
      
      <header className="flex-none px-6 py-5 border-b border-border bg-background z-10">
        <div className="flex flex-wrap justify-between gap-4 items-end">
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-3xl font-black leading-tight">Доска Логистики</h2>
            <p className="text-secondary text-base">Отслеживание статуса импорта автомобилей на всех этапах.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex h-10 items-center justify-center rounded-lg border border-border px-4 text-white text-sm font-bold hover:bg-surfaceHover transition-colors">
              <span className="material-symbols-outlined mr-2 text-lg">filter_list</span>
              Фильтр
            </button>
            <button className="flex h-10 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 px-4 text-white text-sm font-bold transition-all">
              <span className="material-symbols-outlined mr-2 text-lg">add</span>
              Новая отправка
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex h-full gap-5 min-w-[1500px]">
          <KanbanColumn title="Куплено" count={3} color="bg-blue-500">
            <KanbanCard onClick={() => handleCardClick({id: "#REQ-2024-001", title: "2022 Ford Mustang", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6YBJl96uan8yUQ3j7nCWGYnzqwGUnvFGMeRm_Y3DJjK0vz0yvi2gHrMjaK8MMfWdw8udhGHhKDHt9EXt8kSix0-qEUL7IskfEEJ7-G4-pAarghlZYnSYXSPsYuJneHtpFytQ9trfI1r1-2bsCm5VjnPeWGR9x3Sx01-KEDA76gpdj4K3iLyF6YJrQBVKMq5H43S9-QgVI7DOObKXfwk01x4R4HeOm6c1GTz2H1naCU0pvylEGa6Zl-R3Gtc7lFvQd1nmDrZe04DY"})} id="#REQ-2024-001" title="2022 Ford Mustang" subtitle="Ожидание документов" icon="schedule" image="https://lh3.googleusercontent.com/aida-public/AB6AXuB6YBJl96uan8yUQ3j7nCWGYnzqwGUnvFGMeRm_Y3DJjK0vz0yvi2gHrMjaK8MMfWdw8udhGHhKDHt9EXt8kSix0-qEUL7IskfEEJ7-G4-pAarghlZYnSYXSPsYuJneHtpFytQ9trfI1r1-2bsCm5VjnPeWGR9x3Sx01-KEDA76gpdj4K3iLyF6YJrQBVKMq5H43S9-QgVI7DOObKXfwk01x4R4HeOm6c1GTz2H1naCU0pvylEGa6Zl-R3Gtc7lFvQd1nmDrZe04DY" />
            <KanbanCard onClick={() => handleCardClick({id: "#REQ-2024-005", title: "2023 BMW M3", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMwROYRnNwUCP-lxgKBhZPU3VBJY8nAnb66RTph-Nu6Vq16OeoaMy2DH-3H1k27vdUG-ucnFpk9izNtwVL86bnWiH6WMe5lPCvaEpresBp0wGTHCKA9fthaLEL_Ca2ZjWPxLrlDTi2LIQHEDDL6HKDwPOZ0SYvrFFkBjfWg2YqZB2d65x5NJ4XzO9fxItfXWjnEiFWDlZSaiFimRgI9VUlYw58O6t60FSFbufbREvPgIFUILEuKWHxvmh5uef-_HWkzmbmZsJEMic"})} id="#REQ-2024-005" title="2023 BMW M3" subtitle="Ожидает оплаты" icon="attach_money" image="https://lh3.googleusercontent.com/aida-public/AB6AXuDMwROYRnNwUCP-lxgKBhZPU3VBJY8nAnb66RTph-Nu6Vq16OeoaMy2DH-3H1k27vdUG-ucnFpk9izNtwVL86bnWiH6WMe5lPCvaEpresBp0wGTHCKA9fthaLEL_Ca2ZjWPxLrlDTi2LIQHEDDL6HKDwPOZ0SYvrFFkBjfWg2YqZB2d65x5NJ4XzO9fxItfXWjnEiFWDlZSaiFimRgI9VUlYw58O6t60FSFbufbREvPgIFUILEuKWHxvmh5uef-_HWkzmbmZsJEMic" />
          </KanbanColumn>

          <KanbanColumn title="Экспорт" count={1} color="bg-indigo-500">
             <KanbanCard onClick={() => handleCardClick({id: "#REQ-2023-998", title: "2021 Toyota Hilux", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUYvX-eD2YQPhNxl-APXEisTSInhCAOn-xPRzPElD1uEO3Q6tWlCdu-q3TFitP2bj0Gv60unHscFiwiJkqTgwqXi3BoTyF7VeUOu4Mpv08aICuAZLq2MfqgrQuPk24KS4qjZw85I_VIbZjVdZDxNsA3CWDz2uo1EELMvJzcr_HKAJgeHjRacIQGzmcYLHEFH_zZGQkJUjjD4G4gPyg3kjx_SId6S5BCZmXKgKY578WEVc7N-0bWf3H9r7-1FY2E0rlELk1yf09taI"})} id="#REQ-2023-998" title="2021 Toyota Hilux" subtitle="Судно: Ocean Giant" icon="sailing" statusColor="indigo" image="https://lh3.googleusercontent.com/aida-public/AB6AXuBUYvX-eD2YQPhNxl-APXEisTSInhCAOn-xPRzPElD1uEO3Q6tWlCdu-q3TFitP2bj0Gv60unHscFiwiJkqTgwqXi3BoTyF7VeUOu4Mpv08aICuAZLq2MfqgrQuPk24KS4qjZw85I_VIbZjVdZDxNsA3CWDz2uo1EELMvJzcr_HKAJgeHjRacIQGzmcYLHEFH_zZGQkJUjjD4G4gPyg3kjx_SId6S5BCZmXKgKY578WEVc7N-0bWf3H9r7-1FY2E0rlELk1yf09taI" />
          </KanbanColumn>

          <KanbanColumn title="Таможня" count={2} color="bg-yellow-500">
             <KanbanCard onClick={() => handleCardClick({id: "#REQ-2023-990", title: "2020 LR Defender", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjxTbU0ylsS1DxMttviuarfkG6UIQef0nbKn3Jd4o7KI_iGPtFbfxVv7IWRY1BX1-6cmaIe3MZeDuCaDPiskURAytONhSCVr5FawPJdQwNXQmag7gK3HmgVQQb8tmB8JJvAAOCWxK9_0ybjvpTI_bQ6pz8JSI5AIECh_2JuHW3VL05qJXy7J1I7WsMriHGVV6m90YnpKRk2fpCLsQH2-lYU6juiPcucFPp_rJHniQOKmlhrOP8HNDz7pggI1AUIzBvZfW2v8FzxK0"})} id="#REQ-2023-990" title="2020 LR Defender" subtitle="Задержка оформления" icon="warning" statusColor="yellow" image="https://lh3.googleusercontent.com/aida-public/AB6AXuAjxTbU0ylsS1DxMttviuarfkG6UIQef0nbKn3Jd4o7KI_iGPtFbfxVv7IWRY1BX1-6cmaIe3MZeDuCaDPiskURAytONhSCVr5FawPJdQwNXQmag7gK3HmgVQQb8tmB8JJvAAOCWxK9_0ybjvpTI_bQ6pz8JSI5AIECh_2JuHW3VL05qJXy7J1I7WsMriHGVV6m90YnpKRk2fpCLsQH2-lYU6juiPcucFPp_rJHniQOKmlhrOP8HNDz7pggI1AUIzBvZfW2v8FzxK0" />
          </KanbanColumn>

          <KanbanColumn title="В пути по РФ" count={1} color="bg-purple-500">
            <KanbanCard onClick={() => handleCardClick({id: "#REQ-2024-002", title: "2023 Tesla Model Y", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnWUDr3rfZuUm4DCL16ec-ijLHuGXFynaYzZ-0C9np8kpMgoSgSwOWWvaLeOkWbevxv6SLrhaqoCKWXCZeVT4-5Wfy4E63KAHfa45FDRgDzswqxVCS8LnH06IcpWu30orQwJhGMMLTkoaC0BBNqXgDqm_gxpVPDazoqhgXyYFpVMq-Qdl0-uVufpGuwkhimTCavl5EhAoKuYb6c6Ph2fmKHAXLrzJofNiz0iZBNS9J5ku1XUoNWFxcBRPaf7V29fIQbyi4yiKtQu8"})} id="#REQ-2024-002" title="2023 Tesla Model Y" subtitle="В: Москву" icon="local_shipping" statusColor="purple" image="https://lh3.googleusercontent.com/aida-public/AB6AXuCnWUDr3rfZuUm4DCL16ec-ijLHuGXFynaYzZ-0C9np8kpMgoSgSwOWWvaLeOkWbevxv6SLrhaqoCKWXCZeVT4-5Wfy4E63KAHfa45FDRgDzswqxVCS8LnH06IcpWu30orQwJhGMMLTkoaC0BBNqXgDqm_gxpVPDazoqhgXyYFpVMq-Qdl0-uVufpGuwkhimTCavl5EhAoKuYb6c6Ph2fmKHAXLrzJofNiz0iZBNS9J5ku1XUoNWFxcBRPaf7V29fIQbyi4yiKtQu8" />
          </KanbanColumn>
          
           <KanbanColumn title="Готово к выдаче" count={2} color="bg-green-500">
            <KanbanCard onClick={() => handleCardClick({id: "#REQ-2023-887", title: "2019 Porsche 911", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9VamEq6zbn8QhukewYyz-9B9bxDyj5DAWrVbsFjds57qJT1EX0y9gCNe7SxYzK9_Lcp1Vi4Q2jJZz6bdMFlNWrwHsKtc-Kgwa-6EpQe9BBoTaH6wwYyGInMkSCCkBz-QA4DOzOsxRY0--up5cSZnkAsRvoDt2yccBjTUybLldzowhd4F2ekUbVuNXlqt99eMIHPGnXJNBheUTI0ChzySjuv6o65z_0rmzUMY5lE1OZU1KNcCqeJtI65ccbcmyJPeVB0UQiN6c05A"})} id="#REQ-2023-887" title="2019 Porsche 911" subtitle="Клиент уведомлен" icon="check_circle" statusColor="green" image="https://lh3.googleusercontent.com/aida-public/AB6AXuA9VamEq6zbn8QhukewYyz-9B9bxDyj5DAWrVbsFjds57qJT1EX0y9gCNe7SxYzK9_Lcp1Vi4Q2jJZz6bdMFlNWrwHsKtc-Kgwa-6EpQe9BBoTaH6wwYyGInMkSCCkBz-QA4DOzOsxRY0--up5cSZnkAsRvoDt2yccBjTUybLldzowhd4F2ekUbVuNXlqt99eMIHPGnXJNBheUTI0ChzySjuv6o65z_0rmzUMY5lE1OZU1KNcCqeJtI65ccbcmyJPeVB0UQiN6c05A" />
          </KanbanColumn>
        </div>
      </div>
    </div>
  );
}