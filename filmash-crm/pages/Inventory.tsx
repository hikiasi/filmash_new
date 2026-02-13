import React from 'react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  const cars = [
    { name: 'Camry', brand: 'Toyota', year: 2024, type: 'Седан', variants: 5, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEE8iPcZye-VSGexE1I0a02r8txfJ9jGze9D6OafCCA6GvhZ3qTk0ZW6hU6b7Jsdrf_kmxOm-wEEVm3tBeeryze8uWdrZyGa8wCf56gq-FYrA2IlwzsTfzyyoPPcL4UnWF9TIyCO0foPJFNginmfRoUHEpA-NnoO3jcHAAQ31MigA4NcqGveDeaalEjrx2pY4uy4bS4z5KERF0uHaGH9mlU-bq2ekY2PpXREWi9tfPQa0oQkgQurG_VPSvqIBpi8s8RqhNKsQAokc' },
    { name: 'F-150', brand: 'Ford', year: 2023, type: 'Пикап', variants: 8, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSBakzqLgrNDijEO11omrkvxNrH4ODXzxdd5KBxY-C4Gd2tVoVcNmmVLVQAbDS-flfNI6a3TSmd962CCPpz_Dv30xOcr0aV-ZO7gc7NsTGPTuoT1llYR1uYuf6dyvZUet-IhN3V1hW769EszrI1jYUotEadmxeeg3HtLSU4fyS7RbgiCHuQ4dAs-YpTOT_tQVlo-8oGbGs8ZrBFsMSKwsJk6cvxyG1cX45O1T0692tZLUI3Gh805hZvogI5tyECHjUt7BG_B4tCmI' },
    { name: 'CR-V', brand: 'Honda', year: 2024, type: 'SUV', variants: 4, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7021bYrFURVkoxdjR9svWyhp5__hld0B7Hnwl-JEDQlHv0tdWW0OfKxKfGD1QKO2YSk4v7Zz4d-pMQ0Kn5RvmSLaH7hE0fYdAA2pDAjLeRgIahUPis8CNwdiIfj9YKS3t3tJQ6CO7Cacoary3cwkqMPpFDoIbXtzM-94kmiVHDFcrxuOK4MUsRhlbcbKAx-TqzRaY3vnqSwFrdGUsTK3fh0Ncl0Xf-KeIHWKdS_bjrNU5RAk7XJ08En4h8OyLuAUZMv5Y0Hystw' },
    { name: 'Model 3', brand: 'Tesla', year: 2024, type: 'Электро', variants: 3, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4oGIutch1kRcDjGoDo77wxQqHxUpXjmkDvA2FqHHXyYpLmme0uMK2neFNqCB_JvK5UqpT0KwcKnwazWkhQwi06Ut-55DF0GMuNRXBNLd0tMiTEiBksZt6Gpjeacqeu91r1skAazT0_UvTvu-9EPK_eD0ECp1w7nqxJFD-1DiA7IbBOkNsHpevwaXXiHITNXK3h01ZIs-54F8iciPum0pRaVYFLw5k2W0WMeLNsmVqAu6vibah4y_6rEa7G2-Ndg-7vlBX2Rj2MCQ' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-2xl font-bold">Управление Каталогом</h2>
            <p className="text-secondary text-sm">Просмотр и редактирование модельного ряда.</p>
          </div>
          <Link to="/inventory/add" className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#bce002] hover:text-black text-white px-6 py-3 font-bold transition-colors shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined">add</span>
            <span>Добавить Авто</span>
          </Link>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-96 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input className="w-full rounded-lg bg-surface border-none py-3 pl-10 pr-4 text-white placeholder-secondary focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Поиск модели, бренда или года..." type="text" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">Все</button>
            <button className="px-4 py-1.5 rounded-full bg-surface text-secondary hover:text-white text-sm font-medium border border-transparent hover:border-border transition-all">Опубликовано</button>
            <button className="px-4 py-1.5 rounded-full bg-surface text-secondary hover:text-white text-sm font-medium border border-transparent hover:border-border transition-all">Черновики</button>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Модель & Бренд</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Год</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Кузов</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Комплектации</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary text-center">Видимость</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cars.map((car, i) => (
                <tr key={i} className="group hover:bg-surface/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-16 bg-surface rounded bg-center bg-cover" style={{ backgroundImage: `url("${car.img}")` }}></div>
                      <div className="flex flex-col">
                        <Link to="/inventory/trim" className="font-bold text-white hover:text-primary">{car.name}</Link>
                        <span className="text-sm text-secondary">{car.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white">{car.year}</td>
                  <td className="p-4"><span className="inline-flex items-center rounded-md bg-surfaceHover px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-border">{car.type}</span></td>
                  <td className="p-4 text-sm text-secondary">{car.variants} вар.</td>
                  <td className="p-4 text-center">
                    <input type="checkbox" defaultChecked className="size-5 rounded border-border bg-surface text-primary" />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to="/inventory/trim" className="p-2 text-secondary hover:text-white hover:bg-surfaceHover rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></Link>
                      <button className="p-2 text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}