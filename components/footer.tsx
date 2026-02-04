import { CarFront, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4380c2] rounded-lg flex items-center justify-center text-white">
                <CarFront className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                ФИЛ<span className="text-[#4380c2]">МАШ</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Экспертный импорт автомобилей из Китая, Кореи и ОАЭ. Юридическая гарантия и полная прозрачность сделки.
            </p>
            <a 
              href="https://t.me/philmash" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#4380c2] hover:text-[#cff902] transition-colors font-bold"
            >
              Мы в Telegram <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Навигация</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-white">О компании</a></li>
              <li><a href="#regulations" className="hover:text-white">Утильсбор</a></li>
              <li><a href="#gallery" className="hover:text-white">Каталог</a></li>
              <li><a href="#reviews" className="hover:text-white">Отзывы</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Контакты</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Москва, Пресненская наб., 12</li>
              <li>+7 (999) 000-00-00</li>
              <li>info@philmash.ru</li>
              <li>Пн-Вс: 10:00 - 20:00</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>© 2026 Филмаш. Все права защищены.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
