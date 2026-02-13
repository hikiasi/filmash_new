import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OptionCard = ({ name, price, color, image, active, onClick }: any) => (
  <div onClick={onClick} className={`relative flex flex-col gap-4 rounded-xl border ${active ? 'border-primary bg-primary/5' : 'border-border bg-surface'} p-4 transition-all cursor-pointer hover:border-primary/50`}>
      <div className="flex items-start gap-4">
        {image ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black border border-border bg-cover bg-center" style={{backgroundImage: `url('${image}')`}}></div>
        ) : (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border" style={{backgroundColor: color}}></div>
        )}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-secondary">Название</label>
              <p className="text-sm font-bold text-white">{name}</p>
            </div>
            <div className="w-24 text-right">
              <label className="mb-1 block text-xs font-medium text-secondary">Цена (CNY)</label>
              <p className="text-sm font-bold text-green-400">+{price}</p>
            </div>
          </div>
        </div>
        <div className={`size-5 rounded-full border flex items-center justify-center ${active ? 'border-primary bg-primary' : 'border-slate-600 bg-transparent'}`}>
            {active && <span className="material-symbols-outlined text-white text-xs">check</span>}
        </div>
      </div>
    </div>
)

const PhotoUploader = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImages([...images, url]);
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl bg-surface border border-border overflow-hidden relative group">
                    <img src={img} className="w-full h-full object-cover" />
                    <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-surfaceHover transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-3xl text-secondary">add_photo_alternate</span>
                <span className="text-xs text-secondary font-medium">Добавить фото</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
        </div>
    )
}

export default function TrimEditor() {
  const [activeTab, setActiveTab] = useState('exterior');
  const [selectedExterior, setSelectedExterior] = useState(0);
  const [selectedInterior, setSelectedInterior] = useState(0);
  const [selectedWheels, setSelectedWheels] = useState(0);

  const exteriorColors = [
      { name: "Black Magic", price: 0, color: "#1a1a1a" },
      { name: "Deep Green", price: 10000, color: "#0f3d2e" },
      { name: "Pearl White", price: 2000, color: "#f0f0f0" },
      { name: "Tech Grey", price: 0, color: "#4a4a4a" }
  ];

  const interiorColors = [
      { name: "Black / Orange", price: 0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw3AZ6osUVsrdNpaOEt8Q61CJSjmWrj1Wf8DxdzxzXsvoEdzEq3k1Pa-E2UISdsIodXjvQ6D2p6N8xxtjBaEp4GXvjxVaUD1PNNMDrNs4z3mVQnwlde492wKiVnvKSmLm8s_95k4bWyAdcj4CZxdA39t6lh94CIRWhsViNRwQWoEiiz787CfHsorGc7dEUo28Utcjd6dOzSMrUaJWhyGvfEPNrGsQA_LpJivqbs7936ySJRjxnzBLfeFgzcUa77jD6Yu3zD6czfIk" },
      { name: "White / Grey", price: 5000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFe-IyRewdDPYdYH12pFMmHmSfKtK0nL8prcd55Pt5IbgvtBrT1qM8xE4XBZPVKLojwmCvLJuVVGLRnDDEQX_dqptVUhzTcu4BF6ms5Usqip-8i7AvoEtKPRpqPFW_plGnPROaFgrv2C2ztHTuEp6s0v1WmYpsG4dfl7_TxtcphXtb6rp8oaX-gTkoRENXq3_1hkiAbK5cMtKLnUys0Oo6ABnreOiDZiprsMWKfTT4A45bG5Yo5Sjnx6dmUp2ZJFHPBsfRWa6QKwc" }
  ];

  const wheels = [
      { name: "20\" Standard Aero", price: 0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbljXhEIvpRhV5Xaw3X_Ktarb6qmB123SOHqQEpsU_z0asTWCU4i9UL0pUPPV6J8_Q-Y2mLNKSMdHIw1V6gm-Bh7EY8YPYIVhpkB8e7sb7OQ4kAS_HKIY-mCuZb4xwskEh7Z25Jl9fVOj6lar8RTjx72kzHuNDY-n4vpHmhJq51MF0i1qzm-MQ4VeqWZAo4UqKRPRQza7gR6X-tA8uYSUCoKzdcYsgy4j6L0TZSHmXWp7ImK1oxBIcVfKmDK3SaEK1xoy5vxyky9I" },
      { name: "21\" Sport Black", price: 8000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjxTbU0ylsS1DxMttviuarfkG6UIQef0nbKn3Jd4o7KI_iGPtFbfxVv7IWRY1BX1-6cmaIe3MZeDuCaDPiskURAytONhSCVr5FawPJdQwNXQmag7gK3HmgVQQb8tmB8JJvAAOCWxK9_0ybjvpTI_bQ6pz8JSI5AIECh_2JuHW3VL05qJXy7J1I7WsMriHGVV6m90YnpKRk2fpCLsQH2-lYU6juiPcucFPp_rJHniQOKmlhrOP8HNDz7pggI1AUIzBvZfW2v8FzxK0" }
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10">
      <div className="mx-auto max-w-5xl flex flex-col gap-8">
        <nav className="flex text-sm text-secondary">
          <Link to="/inventory" className="hover:text-white transition-colors">Каталог</Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">Lixiang L7 Ultra</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight text-white">Lixiang L7 Ultra</h1>
            <p className="text-secondary text-base">Конфигурация базовой цены, доступных цветов и опций.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-medium text-green-500">Активно</span>
          </div>
        </div>

        <section className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Ценообразование</h2>
            <div className="flex items-center gap-2 text-xs text-secondary bg-surfaceHover px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">currency_exchange</span>
              <span>1 CNY = 12.85 RUB</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-secondary">Базовая цена (CNY)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-secondary">¥</span>
                <input className="w-full rounded-lg border border-border bg-surfaceHover py-2 pl-8 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary" type="number" defaultValue="329800" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-secondary">Расчетная цена (RUB)</label>
              <div className="relative opacity-75">
                <span className="absolute left-3 top-2.5 text-secondary">₽</span>
                <input className="w-full cursor-not-allowed rounded-lg border border-border bg-border py-2 pl-8 pr-4 text-white font-medium" readOnly type="text" defaultValue="4,237,930" />
              </div>
            </div>
          </div>
        </section>

        <div className="flex border-b border-border">
            {[
                {id: 'exterior', label: 'Экстерьер'},
                {id: 'interior', label: 'Интерьер'},
                {id: 'wheels', label: 'Диски'},
                {id: 'photos', label: 'Фотографии'},
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-white'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {activeTab === 'exterior' && (
            <section className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-white">Цвета Кузова</h2>
                <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Добавить
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {exteriorColors.map((item, i) => (
                    <OptionCard key={i} {...item} active={selectedExterior === i} onClick={() => setSelectedExterior(i)} />
                ))}
            </div>
            </section>
        )}

        {activeTab === 'interior' && (
            <section className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-white">Интерьер Салона</h2>
                <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Добавить
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {interiorColors.map((item, i) => (
                    <OptionCard key={i} {...item} active={selectedInterior === i} onClick={() => setSelectedInterior(i)} />
                ))}
            </div>
            </section>
        )}

        {activeTab === 'wheels' && (
             <section className="flex flex-col gap-4 animate-fade-in">
             <div className="flex items-center justify-between px-2">
                 <h2 className="text-xl font-bold text-white">Диски</h2>
                 <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
                 <span className="material-symbols-outlined text-lg">add</span> Добавить
                 </button>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
                 {wheels.map((item, i) => (
                     <OptionCard key={i} {...item} active={selectedWheels === i} onClick={() => setSelectedWheels(i)} />
                 ))}
             </div>
             </section>
        )}

        {activeTab === 'photos' && (
             <section className="flex flex-col gap-4 animate-fade-in">
             <div className="flex items-center justify-between px-2">
                 <h2 className="text-xl font-bold text-white">Галерея</h2>
             </div>
             <PhotoUploader />
             </section>
        )}
      </div>
    </div>
  );
}